import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ReceiptScreen = ({
  componentsData,
  onComponentPress,
  onDeleteComponent,
}) => {
  const [loadingComponents, setLoadingComponents] = useState(false);
  const [deletingComponentId, setDeletingComponentId] = useState(null);

  const simulateServerDelete = component => {
    setDeletingComponentId(component.id);
    setLoadingComponents(true);

    // Simulate server delete request delay with a timeout
    setTimeout(() => {
      // Simulated success response from server
      const success = true;

      if (success) {
        // If delete is successful, call the onDeleteComponent function
        onDeleteComponent(component);
      } else {
        // Handle error scenario if delete fails
        console.error('Error deleting component');
      }

      setLoadingComponents(false);
      setDeletingComponentId(null);
    }, 2000); // Simulate a 2-second delay
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {componentsData.map(component => (
        <TouchableOpacity
          key={component.id}
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
          <TouchableOpacity
            onPress={() => simulateServerDelete(component)}
            disabled={loadingComponents || deletingComponentId === component.id}
            style={styles.deleteButton}>
            {deletingComponentId === component.id && loadingComponents ? (
              <ActivityIndicator size="small" color="gray" />
            ) : (
              <Icon name="delete" size={30} color="red" />
            )}
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
  deleteButton: {
    padding: 10,
  },
});

export default ReceiptScreen;
