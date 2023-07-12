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

function App() {
  const [activeScreen, setActiveScreen] = useState('Home');
  const [scannedImage, setScannedImage] = useState(null);
  const [componentsData, setComponentsData] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isWelcomePageShown, setIsWelcomePageShown] = useState(true);

  const handleWelcomePageDismiss = () => {
    setIsWelcomePageShown(false);
  };

  useEffect(() => {
    setActiveScreen('home');
  }, []);

  useEffect(() => {
    // Load components data from storage only at start
    loadComponentsData();
  }, []);

  const loadComponentsData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('componentsData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setComponentsData(parsedData);
      } else {
        setComponentsData([]);
      }
    } catch (error) {
      console.error('Error loading components:', error);
    }
  };

  const saveComponentsData = async data => {
    try {
      await AsyncStorage.setItem('componentsData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving components:', error);
    }
  };

  useEffect(() => {
    // when selectedComponent state variable changes cleanup function
    if (selectedComponent) {
      return () => {
        setSelectedComponent(null);
      };
    }
  }, [selectedComponent]);

  const handleComponentPress = component => {
    setSelectedComponent(component);
  };

  const handleDeleteComponent = async component => {
    const updatedComponents = componentsData.filter(c => c !== component);
    setComponentsData(updatedComponents);
    try {
      await AsyncStorage.setItem(
        'componentsData',
        JSON.stringify(updatedComponents),
      );
    } catch (error) {
      console.error('Error saving components:', error);
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
    setScannedImage(image);

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

      setScannedImage(null);

      setSelectedComponent(newComponent);
      renderEditComponentScreen();
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
        return <HomeScreen componentsData={componentsData} />;
      case 'receipt':
        return renderReceiptScreen();
      case 'camera':
        return <CameraScreen onDocumentScanned={handleDocumentScanned} />;
      case 'edit':
        return (
          <EditComponentScreen
            component={selectedComponent}
            onSave={handleSaveComponent}
            onCancel={() => setActiveScreen('home')}
          />
        );
      default:
        return null;
    }
  };

  const renderEditComponentScreen = () => {
    if (selectedComponent) {
      return (
        <EditComponentScreen
          component={selectedComponent}
          onSave={handleSaveComponent}
          onCancel={() => setSelectedComponent(null)}
        />
      );
    }
    return null;
  };

  const renderReceiptScreen = () => {
    return (
      <ReceiptScreen
        componentsData={componentsData}
        onComponentPress={handleComponentPress}
        onDeleteComponent={handleDeleteComponent}
        onAddMockComponent={handleAddMockComponent}
      />
    );
  };

  const handleSaveComponent = async updatedComponent => {
    let updatedComponents;

    const existingComponentIndex = componentsData.findIndex(
      component => component.id === updatedComponent.id,
    );

    if (existingComponentIndex !== -1) {
      // Update existing component
      updatedComponents = componentsData.map(component => {
        if (component.id === updatedComponent.id) {
          return updatedComponent;
        }
        return component;
      });
    } else {
      // Create new component
      updatedComponents = [...componentsData, updatedComponent];
      setActiveScreen('receipt');
    }

    console.log('updatedComponents', updatedComponents);
    setComponentsData(updatedComponents);
    await saveComponentsData(updatedComponents);
    renderReceiptScreen(); // Wait for saving components to AsyncStorage
  };

  const handleAddMockComponent = mockComponent => {
    const updatedComponents = [...componentsData, mockComponent];
    setComponentsData(updatedComponents);

    try {
      saveComponentsData(updatedComponents);
    } catch (error) {
      console.error('Error saving components:', error);
    }
  };

  return isWelcomePageShown ? (
    <WelcomeScreen handlePress={handleWelcomePageDismiss} />
  ) : (
    <NavigationContainer>
      <View style={styles.container}>
        <StatusBar backgroundColor="#7444A0" />
        <View style={styles.content}>{renderScreen()}</View>
        {renderEditComponentScreen()}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => setActiveScreen('home')}>
            <Icon name="home" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => setActiveScreen('camera')}>
            <Icon name="camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => setActiveScreen('receipt')}>
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

export default App;
