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
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);

const EditComponentScreen = ({component, onSave, onCancel}) => {
  const [editedComponent, setEditedComponent] = useState({...component});
  const [selectedType, setSelectedType] = useState(null);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {
      label: 'Taxi',
      value: 'Taxi',
      icon: () => (
        <Image
          source={require('../Assets/taxi.png')}
          style={styles.dropdownIcon}
        />
      ),
    },
    {
      label: 'Grocery',
      value: 'Grocery',
      icon: () => (
        <Image
          source={require('../Assets/grocery.png')}
          style={styles.dropdownIcon}
        />
      ),
    },
    {
      label: 'Healthcare',
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

  return (
    <Modal animationType="slide" transparent={false} visible={true}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: component.image}}
            style={styles.fullImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.label}>Category:</Text>
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

        <Text style={styles.label}>Amount:</Text>
        <TextInput
          style={styles.input}
          value={editedComponent.amount ? String(editedComponent.amount) : ''}
          onChangeText={value => handleInputChange('amount', value)}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{editedComponent.date}</Text>

        <Text style={styles.label}>Extracted Text:</Text>
        <Text style={styles.value}>{editedComponent.extractedText}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
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
  dropdownIcon: {
    width: 40,
    height: 40,
    marginRight: 8,
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
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
});

export default EditComponentScreen;
