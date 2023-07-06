import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReceiptScreen from './src/Screens/ReceiptScreen';
import CameraScreen from './src/Screens/CameraScreen';
import ComponentDetailScreen from './src/Screens/ComponentDetailScreen';
import HomeScreen from './src/Screens/HomeScreen';
import TextRecognition from 'react-native-text-recognition';
import Icon from 'react-native-vector-icons/Ionicons';

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

  //TODO: CHECK THE SAVING CONDITIONS AFTER REBUILDING THE APP

  const saveComponentsData = async () => {
    try {
      await AsyncStorage.setItem(
        'componentsData',
        JSON.stringify(componentsData)
      );
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

  const handleComponentPress = (component) => {
    setSelectedComponent(component);
  };

  const handleDeleteComponent = (component) => {
    const updatedComponents = componentsData.filter((c) => c !== component);
    setComponentsData(updatedComponents);
    saveComponentsData();
  };

  const handleDocumentScanned = async (image) => {
    setScannedImage(image);

    try {
      const extractedText = await recognizeText(image);
      const extractedTextString = String(extractedText);

      // TODO: EXCLUDE THE CREDIT CARD INFORMATION

      const lastAsteriskIndex = extractedTextString.lastIndexOf('*');

      let amount = null;

      if (lastAsteriskIndex !== -1) {
        const amountText = extractedTextString
          .substring(lastAsteriskIndex + 1)
          .trim();

        amount = parseFloat(amountText.replace(/,/g, '.'));

        if (isNaN(amount)) {
          amount = null;
          console.error('Error: Invalid amount format');
        }
      } else {
        console.error('Error: Asterisk (*) not found');
      }

      const newComponent = {
        image,
        date: new Date().toLocaleDateString(),
        amount,
        extractedText,
      };

      setComponentsData((prevData) => [...prevData, newComponent]);

      saveComponentsData();

      setScannedImage(null);
      setActiveScreen('receipt');
    } catch (error) {
      console.error('Error recognizing text:', error);
    }
  };

  const recognizeText = async (imagePath) => {
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

  return (
    <View style={styles.container}>
      <View style={styles.content}>{renderScreen()}</View>
      {renderComponentDetailScreen()}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveScreen('home')}
        >
          <Icon name="home-outline" size={24} color="#444" />
          <Text style={styles.tabButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveScreen('camera')}
        >
          <Icon name="camera-outline" size={24} color="#444" />
          <Text style={styles.tabButtonText}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveScreen('receipt')}
        >
          <Icon name="receipt-outline" size={24} color="#444" />
          <Text style={styles.tabButtonText}>Receipts</Text>
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
    backgroundColor: '#EEEEEE',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  tabButton: {
    alignItems: 'center',
  },
  tabButtonText: {
    fontSize: 12,
    color: '#444',
    marginTop: 2,
  },
});

export default App;
