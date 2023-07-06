import React from 'react';
import {
  Modal,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const ComponentDetailScreen = ({component, onClose}) => {
  return (
    <Modal animationType="slide" transparent={false} visible={true}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: '#FDF5E6',
          paddingHorizontal: 16,
        }}>
        {component.image && (
          <View style={styles.imageContainer}>
            <Image
              source={{uri: component.image}}
              style={styles.fullImage}
              resizeMode="contain"
            />
          </View>
        )}
        <View style={styles.modalContent}>
          <ScrollView>
            <View style={styles.componentInfo}>
              <Text style={styles.componentName}>{component.name}</Text>
              <Text>Date: {component.date}</Text>
              <Text>Amount: {component.amount}</Text>
              <Text>Extracted Text:</Text>
              <Text>{component.extractedText}</Text>
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: 20,
  },
  fullImage: {
    width: '100%',
    aspectRatio: 1,
  },
  componentInfo: {
    alignItems: 'center',
  },
  componentName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});

export default ComponentDetailScreen;
