import React, {useEffect} from 'react';
import {View} from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';

const CameraScreen = ({onDocumentScanned}) => {
  const scanDocument = async () => {
    try {
      const {scannedImages} = await DocumentScanner.scanDocument();

      if (scannedImages.length > 0) {
        const image = scannedImages[0];
        const extractedText = '';
        onDocumentScanned(image, extractedText);
      }
    } catch (error) {
      console.log('Error scanning document:', error);
    }
  };

  useEffect(() => {
    scanDocument();
  }, []);

  return <View style={{flex: 1, backgroundColor: '#EEEEEE'}}></View>;
};

export default CameraScreen;
