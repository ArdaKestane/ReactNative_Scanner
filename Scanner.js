import React, {useState, useEffect} from 'react';
import {Image, StyleSheet} from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';

const DocumentScannerTest = () => {
  const [scannedImage, setScannedImage] = useState(null);

  const scanDocument = async () => {
    try {
      const {scannedImages} = await DocumentScanner.scanDocument();

      if (scannedImages.length > 0) {
        setScannedImage(scannedImages[0].path);
      }
    } catch (error) {
      console.log('Error scanning document:', error);
    }
  };

  useEffect(() => {
    scanDocument();
  }, []);

  return (
    <Image
      resizeMode="contain"
      style={styles.image}
      source={scannedImage ? {uri: scannedImage} : null}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});

export default DocumentScannerTest;
