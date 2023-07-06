import React from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MainScreen = ({componentsData, onComponentPress, onDeleteComponent}) => {
  const deleteComponent = component => {
    const updatedComponents = componentsData.filter(c => c !== component);
    onDeleteComponent(updatedComponents);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: '#FDF5E6',
        paddingHorizontal: 16,
        paddingVertical: 10,
      }}>
      {componentsData.map((component, index) => (
        <TouchableOpacity
          key={index}
          style={{
            marginVertical: 2.5,
            marginBottom: 10,
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          onPress={() => onComponentPress(component)}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={{uri: component.image}}
              style={{width: 50, height: 50, marginRight: 10, borderRadius: 25}}
            />
            <View>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Date: </Text>
                {component.date}
              </Text>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Amount: </Text>
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
            <Icon name="delete" size={20} color="red" />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default MainScreen;
