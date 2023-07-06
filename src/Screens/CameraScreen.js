import React, {useEffect} from 'react';
import {View} from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';
// import RNTextDetector from 'rn-text-detector';

const CameraScreen = ({onDocumentScanned}) => {
  const scanDocument = async () => {
    try {
      const {scannedImages} = await DocumentScanner.scanDocument();

      if (scannedImages.length > 0) {
        const image = scannedImages[0];
        // const extractedText = await extractTextFromImage(image);
        const extractedText = ''; // Temporarily set extractedText as an empty string
        onDocumentScanned(image, extractedText);
      }
    } catch (error) {
      console.log('Error scanning document:', error);
    }
  };

  // const extractTextFromImage = async (imagePath) => {
  //   try {
  //     const textRecognition = await RNTextDetector.detectFromUri(imagePath);
  //     return textRecognition.map((item) => item.text).join(' ');
  //   } catch (error) {
  //     console.log('Error extracting text from image:', error);
  //     return '';
  //   }
  // };

  useEffect(() => {
    scanDocument();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#FDF5E6'}}>
      {/* Add your camera screen content here */}
    </View>
  );
};

export default CameraScreen;
