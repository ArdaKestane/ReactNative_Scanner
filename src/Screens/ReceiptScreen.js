import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ReceiptScreen = ({
  componentsData,
  onComponentPress,
  onDeleteComponent,
}) => {
  const deleteComponent = component => {
    const updatedComponents = componentsData.filter(c => c !== component);
    onDeleteComponent(updatedComponents);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {componentsData.map((component, index) => (
        <TouchableOpacity
          key={index}
          style={styles.componentContainer}
          onPress={() => onComponentPress(component)}>
          <View style={styles.componentInfo}>
            <Image
              source={{uri: component.image}}
              style={styles.componentImage}
            />
            <View>
              <Text>
                <Text style={styles.componentLabel}>Date: </Text>
                {component.date}
              </Text>
              <Text>
                <Text style={styles.componentLabel}>Amount: </Text>
                {typeof component.amount === 'string'
                  ? component.amount.length <= 10
                    ? component.amount
                    : component.amount.substring(0, 10) + '...'
                  : String(component.amount).length <= 10
                  ? String(component.amount)
                  : String(component.amount).substring(0, 10) + '...'}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => onDeleteComponent(component)}>
            <Icon name="delete" size={30} color="red" />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  componentContainer: {
    marginTop: 15,
    marginVertical: 2.5,
    marginBottom: 10,
    borderRadius: 25,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EEEEEE',
  },
  componentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 75,
  },
  componentImage: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 50,
  },
  componentLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReceiptScreen;
