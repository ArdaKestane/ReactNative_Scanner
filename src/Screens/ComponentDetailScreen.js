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
import I18n from '../I18n';

const ComponentDetailScreen = ({component, onClose}) => {
  return (
    <Modal animationType="slide" transparent={false} visible={true}>
      <ScrollView contentContainerStyle={styles.container}>
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
              <View style={styles.wrapper}>
                <Text style={styles.header}>{I18n.t('date')}:</Text>
                <Text style={styles.content}>{component.date}</Text>
              </View>

              <View style={styles.wrapper}>
                <Text style={styles.header}>{I18n.t('amount')}:</Text>
                <Text style={styles.content}>{component.amount}</Text>
              </View>

              <Text style={styles.header}>{I18n.t('extractedText')}:</Text>
              <View style={styles.extractView}>
                <Text>{component.extractedText}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>{I18n.t('close')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FDF5E6',
    paddingHorizontal: 16,
  },
  wrapper: {
    flexDirection: 'row',
    gap: 10,
  },
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
  header: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  content: {
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#F99417',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 20,
  },
  closeButtonText: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'white',
  },
  extractView: {
    marginTop: 10,
    padding: 10,
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default ComponentDetailScreen;
