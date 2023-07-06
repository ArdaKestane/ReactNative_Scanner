import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainScreen from './src/Screens/MainScreen';
import CameraScreen from './src/Screens/CameraScreen';
import ProfileScreen from './src/Screens/ProfileScreen';
import ComponentDetailScreen from './src/Screens/ComponentDetailScreen';
import TextRecognition from 'react-native-text-recognition';

const App = () => {
  const [activeScreen, setActiveScreen] = useState('main');
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
      console.log('Error loading components:', error);
    }
  };

  const saveComponentsData = async () => {
    try {
      await AsyncStorage.setItem(
        'componentsData',
        JSON.stringify(componentsData),
      );
    } catch (error) {
      console.log('Error saving components:', error);
    }
  };

  useEffect(() => {
    saveComponentsData();
  }, [componentsData]);

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

  const handleDeleteComponent = component => {
    const updatedComponents = componentsData.filter(c => c !== component);
    setComponentsData(updatedComponents);
    saveComponentsData();
  };

  const handleDocumentScanned = async image => {
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
          console.log('Error: Invalid amount format');
        }
      } else {
        console.log('Error: Asterisk (*) not found');
      }

      const newComponent = {
        image,
        date: new Date().toLocaleDateString(),
        amount,
        extractedText,
      };

      setComponentsData(prevData => [...prevData, newComponent]);

      setScannedImage(null);
      setActiveScreen('main');
    } catch (error) {
      console.log('Error recognizing text:', error);
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
      case 'main':
        return (
          <MainScreen
            componentsData={componentsData}
            onComponentPress={handleComponentPress}
            onDeleteComponent={handleDeleteComponent}
          />
        );
      case 'camera':
        return <CameraScreen onDocumentScanned={handleDocumentScanned} />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return null;
    }
  };

  return (
    <View style={{flex: 1}}>
      {selectedComponent && (
        <ComponentDetailScreen
          component={selectedComponent}
          onClose={() => setSelectedComponent(null)}
        />
      )}
      <View style={{flex: 1}}>{renderScreen()}</View>
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => setActiveScreen('main')}>
          <Text>Main</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveScreen('camera')}>
          <Text>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveScreen('profile')}>
          <Text>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f2f2f2',
  },
});

export default App;
