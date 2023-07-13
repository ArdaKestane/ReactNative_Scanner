import React, {useState, useEffect} from 'react';
import {View, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReceiptScreen from './src/Screens/ReceiptScreen';
import CameraScreen from './src/Screens/CameraScreen';
import HomeScreen from './src/Screens/HomeScreen';
import WelcomeScreen from './src/Screens/WelcomeScreen';
import TextRecognition from 'react-native-text-recognition';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import EditComponentScreen from './src/Screens/EditComponentScreen';
import {useSelector, useDispatch, Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './src/redux/reducer';
import {
  setComponentsData,
  setActiveScreen,
  setSelectedComponent,
  setWelcomePageShown,
  setScannedImage,
} from './src/redux/action';

const store = createStore(reducer);

function App() {
  const dispatch = useDispatch();
  const activeScreen = useSelector(state => state.activeScreen);
  const isWelcomePageShown = useSelector(state => state.isWelcomePageShown);
  const selectedComponent = useSelector(state => state.selectedComponent);

  useEffect(() => {
    loadComponentsData();
  }, []);

  const loadComponentsData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('componentsData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        dispatch(setComponentsData(parsedData));
      } else {
        dispatch(setComponentsData([]));
      }
    } catch (error) {
      console.error('Error loading components:', error);
    }
  };

  const amountAlgorithm = async image => {
    const extractedText = await recognizeText(image);
    const extractedTextString = String(extractedText);

    const lastAsteriskIndex = extractedTextString.lastIndexOf('*');

    let amount = null;

    if (lastAsteriskIndex !== -1) {
      const characterBeforeAsterisk = extractedTextString.charAt(
        lastAsteriskIndex - 1,
      );

      if (characterBeforeAsterisk === '*') {
        console.log('credit card');
      } else if (/\d/.test(extractedTextString.charAt(lastAsteriskIndex + 1))) {
        const previousAsteriskIndex = extractedTextString.lastIndexOf(
          '*',
          lastAsteriskIndex - 1,
        );

        if (previousAsteriskIndex !== -1) {
          const amountText = extractedTextString
            .substring(previousAsteriskIndex + 1, lastAsteriskIndex)
            .trim();

          amount = parseFloat(amountText.replace(/,/g, '.'));

          if (isNaN(amount)) {
            amount = null;
            console.error('Error: Invalid amount format');
          }
        } else {
          console.log('Error: Previous asterisk (*) not found');
        }
      } else {
        const amountText = extractedTextString
          .substring(lastAsteriskIndex + 1)
          .trim();

        amount = parseFloat(amountText.replace(/,/g, '.'));

        if (isNaN(amount)) {
          amount = null;
          console.error('Error: Invalid amount format');
        }
      }
    } else {
      console.log('Error: Asterisk (*) not found');
    }

    return [amount, extractedText];
  };

  const handleDocumentScanned = async image => {
    dispatch(setScannedImage(image));

    const [amount, extractedText] = await amountAlgorithm(image);

    const componentTypes = ['Taxi', 'Grocery', 'Healthcare'];
    const randomType =
      componentTypes[Math.floor(Math.random() * componentTypes.length)];

    try {
      const newComponent = {
        id: Date.now().toString(),
        image,
        date: new Date().toLocaleDateString(),
        amount,
        extractedText,
        type: randomType,
      };

      dispatch(setScannedImage(null));

      dispatch(setSelectedComponent(newComponent));
      renderEditComponentScreen();
      dispatch(setActiveScreen('receipt'));
    } catch (error) {
      console.error('Error recognizing text:', error);
    }
  };

  const recognizeText = async imagePath => {
    const result = await TextRecognition.recognize(imagePath, {
      visionIgnoreThreshold: 0.5,
    });
    return result;
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen />;
      case 'receipt':
        return renderReceiptScreen();
      case 'camera':
        return <CameraScreen onDocumentScanned={handleDocumentScanned} />;
      default:
        return null;
    }
  };

  const renderEditComponentScreen = () => {
    if (selectedComponent) {
      return <EditComponentScreen />;
    }
    return null;
  };

  const renderReceiptScreen = () => {
    return <ReceiptScreen />;
  };

  return !isWelcomePageShown ? (
    <WelcomeScreen />
  ) : (
    <NavigationContainer>
      <View style={styles.container}>
        <StatusBar backgroundColor="#7444A0" />
        <View style={styles.content}>{renderScreen()}</View>
        {renderEditComponentScreen()}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => dispatch(setActiveScreen('home'))}>
            <Icon name="home" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => dispatch(setActiveScreen('camera'))}>
            <Icon name="camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => dispatch(setActiveScreen('receipt'))}>
            <Icon name="receipt" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#7444A0',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  tabButton: {
    alignItems: 'center',
  },
  tabButtonText: {
    fontSize: 12,
    color: 'white',
    marginTop: 2,
  },
});

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
