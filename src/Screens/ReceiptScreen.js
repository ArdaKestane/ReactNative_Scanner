import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import I18n from '../I18n';

const ReceiptScreen = ({
  componentsData,
  onComponentPress,
  onDeleteComponent,
  onAddMockComponent,
}) => {
  const [loading, setLoading] = useState(true);
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [loadingComponents, setLoadingComponents] = useState(false);
  const [deletingComponents, setDeletingComponents] = useState([]);
  const [deletingComponentId, setDeletingComponentId] = useState(null);

  useEffect(() => {
    // Simulate loading delay with a timeout
    const delay = setTimeout(() => {
      setLoading(false);
    }, 250); // Simulate a 2-second delay
    return () => clearTimeout(delay);
  }, []);

  const handleComponentPress = component => {
    if (selectedComponents.length > 0) {
      // If there are selected components, toggle the selection of the pressed component
      toggleComponentSelection(component);
    } else {
      // If no selected components, handle regular press
      onComponentPress(component);
    }
  };

  const toggleComponentSelection = component => {
    if (isComponentSelected(component)) {
      // If component is already selected, remove it from the selection
      setSelectedComponents(prevSelectedComponents =>
        prevSelectedComponents.filter(c => c !== component),
      );
    } else {
      // If component is not selected, add it to the selection
      setSelectedComponents(prevSelectedComponents => [
        ...prevSelectedComponents,
        component,
      ]);
    }
  };

  const isComponentSelected = component => {
    return selectedComponents.includes(component);
  };

  const handleDeleteSelectedComponents = () => {
    // Set the deleting status for selected components
    setDeletingComponents(selectedComponents);
    // Delete all selected components
    selectedComponents.forEach(component => {
      simulateServerDelete(component);
    });

    // Clear the selection
    setSelectedComponents([]);
  };

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

      setDeletingComponents(prevDeletingComponents =>
        prevDeletingComponents.filter(c => c !== component),
      );
      setLoadingComponents(false);
      setDeletingComponentId(null);
    }, 250);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : (
          <>
            <View style={styles.componentContainer}>
              {componentsData.map(component => (
                <TouchableOpacity
                  key={component.id}
                  style={styles.componentItem}
                  onPress={() => handleComponentPress(component)}>
                  <View style={styles.componentInfo}>
                    <Image
                      source={{uri: component.image}}
                      style={styles.componentImage}
                    />
                    <View>
                      <Text>
                        <Text style={styles.componentLabel}>
                          {I18n.t('date')}:{' '}
                        </Text>
                        {component.date}
                      </Text>
                      <Text>
                        <Text style={styles.componentLabel}>
                          {I18n.t('amount')}:{' '}
                        </Text>
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
                    disabled={
                      loadingComponents ||
                      deletingComponents.includes(component)
                    }
                    style={styles.deleteButton}>
                    {deletingComponentId === component.id &&
                    loadingComponents ? (
                      <ActivityIndicator size="small" color="black" />
                    ) : (
                      <Icon name="delete" size={30} color="red" />
                    )}
                  </TouchableOpacity>
                  {selectedComponents.includes(component) && (
                    <View style={styles.selectedOverlay} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
            {selectedComponents.length > 0 && (
              <TouchableOpacity
                style={styles.deleteSelectedButton}
                onPress={handleDeleteSelectedComponents}>
                <Text style={styles.deleteSelectedButtonText}>
                  {I18n.t('deleteSelected')}
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.buttons}>
        <Icon
          name="add-circle-outline"
          size={24}
          color="white"
          onPress={onAddMockComponent}
        />
        <Icon
          name="refresh"
          size={24}
          color="white"
          onPress={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
            }, 250); // Simulate a 2-second loading process
          }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingBottom: 60, // Account for the height of the bottom navigation bar
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  componentContainer: {
    marginTop: 15,
  },
  componentItem: {
    marginBottom: 10,
    borderRadius: 25,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E8E2E2',
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
    color: 'black',
  },
  deleteButton: {
    padding: 10,
  },
  buttons: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#F99417',
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
  },
  selectedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 25,
  },
  deleteSelectedButton: {
    marginTop: 10,
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  deleteSelectedButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ReceiptScreen;
