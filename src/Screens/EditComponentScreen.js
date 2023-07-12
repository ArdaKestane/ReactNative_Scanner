import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import I18n from '../I18n';

const EditComponentScreen = ({component, onSave, onCancel}) => {
  const [editedComponent, setEditedComponent] = useState({...component});
  const [selectedType, setSelectedType] = useState(null);
  const [imageModalVisible, setImageModalVisible] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {
      label: I18n.t('taxi'),
      value: 'Taxi',
      icon: () => (
        <Image
          source={require('../Assets/taxi.png')}
          style={styles.dropdownIcon}
        />
      ),
    },
    {
      label: I18n.t('grocery'),
      value: 'Grocery',
      icon: () => (
        <Image
          source={require('../Assets/grocery.png')}
          style={styles.dropdownIcon}
        />
      ),
    },
    {
      label: I18n.t('healthcare'),
      value: 'Healthcare',
      icon: () => (
        <Image
          source={require('../Assets/healthcare.png')}
          style={styles.dropdownIcon}
        />
      ),
    },
  ]);

  useEffect(() => {
    if (component.type) {
      setValue(component.type);
      setSelectedType(component.type);
    }
  }, [component.type]);

  const handleInputChange = (field, value) => {
    setEditedComponent(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    const updatedComponent = {
      ...editedComponent,
      type: selectedType,
    };

    await onSave(updatedComponent);
    onCancel();
  };

  const handleImagePress = () => {
    setImageModalVisible(true);
  };

  const handleImageModalClose = () => {
    setImageModalVisible(false);
  };

  return (
    <Modal animationType="slide" transparent={false} visible={true}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={handleImagePress}>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: component.image}}
              style={styles.fullImage}
              resizeMode="contain"
            />
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.label}>{I18n.t('category')}:</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={val => {
            setValue(val);
            setSelectedType(val);
          }}
          setItems={setItems}
          style={styles.dropdown}
          containerStyle={styles.dropdownContainer}
          dropDownStyle={styles.dropdown}
          itemStyle={styles.dropdownItem}
        />

        <Text style={styles.label}>{I18n.t('amount')}:</Text>
        <TextInput
          style={styles.input}
          value={editedComponent.amount ? String(editedComponent.amount) : ''}
          onChangeText={value => handleInputChange('amount', value)}
          keyboardType="numeric"
        />
        <Text style={styles.label}>{I18n.t('date')}:</Text>
        <Text style={styles.value}>{editedComponent.date}</Text>
        <Text style={styles.label}>{I18n.t('extractedText')}:</Text>
        <ScrollView style={styles.textInputContainer}>
          <TextInput
            editable={false}
            multiline={true}
            numberOfLines={3}
            style={styles.textInput}>
            {editedComponent.extractedText}
          </TextInput>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onCancel}>
            <Text style={styles.buttonText}>{I18n.t('cancel')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>{I18n.t('save')}</Text>
          </TouchableOpacity>
        </View>
        {imageModalVisible && (
          <Modal animationType="fade" transparent={true} visible={true}>
            <TouchableWithoutFeedback onPress={handleImageModalClose}>
              <View style={styles.imageModalContainer}>
                <Image
                  source={{uri: component.image}}
                  style={styles.fullImageModal}
                  resizeMode="contain"
                />
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Ruda-Black',
    marginBottom: 8,
  },
  value: {
    fontSize: 14,
    fontFamily: 'Ruda-Regular',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    fontFamily: 'Ruda-Regular',
  },
  dropdownContainer: {
    height: 40,
    marginBottom: 25,
    alignSelf: 'stretch',
  },
  dropdown: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#fafafa',
    marginTop: 4,
  },
  dropdownItem: {
    justifyContent: 'flex-start',
    fontFamily: 'Ruda-Bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#7444A0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Ruda-ExtraBold',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  fullImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    alignSelf: 'center',
  },
  textInputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 16,
  },
  textInput: {
    padding: 8,
    fontFamily: 'Ruda-Regular',
  },
  imageModalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  fullImageModal: {
    width: '75%',
    height: '75%',
    alignSelf: 'center',
  },
  dropdownIcon: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
});

export default EditComponentScreen;
