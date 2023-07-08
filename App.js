import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReceiptScreen from './src/Screens/ReceiptScreen';
import CameraScreen from './src/Screens/CameraScreen';
import ComponentDetailScreen from './src/Screens/ComponentDetailScreen';
import HomeScreen from './src/Screens/HomeScreen';
import TextRecognition from 'react-native-text-recognition';
import Icon from 'react-native-vector-icons/Ionicons';
import I18n from './src/I18n';

const App = () => {
  const [activeScreen, setActiveScreen] = useState('receipt');
  const [scannedImage, setScannedImage] = useState(null);
  const [componentsData, setComponentsData] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);

  useEffect(() => {
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

  const handleDocumentScanned = async image => {
    setScannedImage(image);

    try {
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
        } else if (
          /\d/.test(extractedTextString.charAt(lastAsteriskIndex + 1))
        ) {
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

      const newComponent = {
        id: Date.now().toString(),
        image,
        date: new Date().toLocaleDateString(),
        amount,
        extractedText,
      };

      const updatedComponents = [...componentsData, newComponent];
      setComponentsData(updatedComponents);

      try {
        await AsyncStorage.setItem(
          'componentsData',
          JSON.stringify(updatedComponents),
        );
      } catch (error) {
        console.error('Error saving components:', error);
      }

      setScannedImage(null);
      setActiveScreen('receipt');
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
        return (
          <ReceiptScreen
            componentsData={componentsData}
            onComponentPress={handleComponentPress}
            onDeleteComponent={handleDeleteComponent}
            onAddMockComponent={handleAddMockComponent} // Pass the function as a prop
          />
        );
      case 'camera':
        return <CameraScreen onDocumentScanned={handleDocumentScanned} />;
      default:
        return null;
    }
  };

  const renderComponentDetailScreen = () => {
    if (selectedComponent) {
      return (
        <ComponentDetailScreen
          component={selectedComponent}
          onClose={() => setSelectedComponent(null)}
        />
      );
    }
    return null;
  };

  const handleAddMockComponent = () => {
    const minAmount = 10;
    const maxAmount = 50;
    const randomAmount = (
      Math.random() * (maxAmount - minAmount) +
      minAmount
    ).toFixed(2);

    const mockComponent = {
      id: Date.now().toString(),
      image: `https://picsum.photos/200?random=${Date.now()}`,
      date: '2023-07-08',
      amount: randomAmount,
      extractedText: 'Mock component',
    };

    const updatedComponents = [...componentsData, mockComponent];
    setComponentsData(updatedComponents);

    try {
      saveComponentsData(updatedComponents);
    } catch (error) {
      console.error('Error saving components:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>{renderScreen()}</View>
      {renderComponentDetailScreen()}

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveScreen('home')}>
          <Icon name="home" size={24} color="white" />
          <Text style={styles.tabButtonText}>{I18n.t('home')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveScreen('camera')}>
          <Icon name="camera" size={24} color="white" />
          <Text style={styles.tabButtonText}>{I18n.t('camera')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveScreen('receipt')}>
          <Icon name="receipt" size={24} color="white" />
          <Text style={styles.tabButtonText}>{I18n.t('receipts')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
