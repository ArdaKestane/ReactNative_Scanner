import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  LogBox,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import I18n from '../I18n';
import ReceiptCard from '../Components/receiptCard';
import {SwipeListView} from 'react-native-swipe-list-view';
import EditComponentScreen from './EditComponentScreen';
import {useSelector, useDispatch} from 'react-redux';
import {
  deleteComponent,
  addComponent,
  setSelectedComponent,
  saveComponent,
} from '../redux/action';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality',
]);

const ReceiptScreen = () => {
  const [loading, setLoading] = useState(true);
  const [updatedComponent, setUpdatedComponent] = useState(null);

  const dispatch = useDispatch();
  const selectedComponent = useSelector(state => state.selectedComponent);
  const componentsData = useSelector(state => state.componentsData);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 250);
    return () => clearTimeout(delay);
  }, []);

  const renderEditComponentScreen = () => {
    if (selectedComponent) {
      return (
        <EditComponentScreen
          component={selectedComponent}
          onSave={handleSaveComponent}
          onCancel={() => dispatch(setSelectedComponent(null))}
        />
      );
    }
    return null;
  };

  const handleSaveComponent = component => {
    dispatch(saveComponent(component));
  };

  useEffect(() => {
    if (updatedComponent) {
      dispatch(saveComponent(updatedComponent));
      setUpdatedComponent(null);

      // Update the component in AsyncStorage
      AsyncStorage.getItem('componentsData')
        .then(data => {
          if (data) {
            const storedComponents = JSON.parse(data);
            const updatedComponents = storedComponents.map(component => {
              if (component.id === updatedComponent.id) {
                return updatedComponent;
              }
              return component;
            });
            AsyncStorage.setItem(
              'componentsData',
              JSON.stringify(updatedComponents),
            )
              .then(() => {
                console.log('Component updated in AsyncStorage.');
              })
              .catch(error => {
                console.log('Error updating component in AsyncStorage:', error);
              });
          }
        })
        .catch(error => {
          console.log('Error retrieving components from AsyncStorage:', error);
        });
    }
  }, [updatedComponent, dispatch]);

  const handleAddComponent = () => {
    const minAmount = 10;
    const maxAmount = 50;
    const componentTypes = ['Taxi', 'Grocery', 'Healthcare'];

    const mockComponents = [];

    const randomAmount = (
      Math.random() * (maxAmount - minAmount) +
      minAmount
    ).toFixed(2);

    const randomType =
      componentTypes[Math.floor(Math.random() * componentTypes.length)];

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const mockComponent = {
      id: Date.now().toString(),
      date: formattedDate,
      image: `https://picsum.photos/200?random=${Date.now()}`,
      amount: randomAmount,
      extractedText: I18n.t('mockComponent'),
      type: randomType,
    };

    mockComponents.push(mockComponent);

    dispatch(addComponent(...mockComponents));

    AsyncStorage.setItem(
      'componentsData',
      JSON.stringify([...componentsData, ...mockComponents]),
    )
      .then(() => {
        console.log('Components saved to AsyncStorage.');
      })
      .catch(error => {
        console.log('Error saving components to AsyncStorage:', error);
      });
  };

  const handleCardPress = item => {
    dispatch(setSelectedComponent(item));
    renderEditComponentScreen(item);
  };

  const renderItem = ({item}) => (
    <ReceiptCard
      key={item.id}
      component={item}
      image={
        item.type === 'Taxi'
          ? require('../Assets/taxi.png')
          : item.type === 'Grocery'
          ? require('../Assets/grocery.png')
          : item.type === 'Healthcare'
          ? require('../Assets/healthcare.png')
          : null
      }
      onPress={() => handleCardPress(item)}
    />
  );

  const handleDeleteComponent = async componentId => {
    try {
      dispatch(deleteComponent(componentId));

      const storedComponents = await AsyncStorage.getItem('componentsData');
      if (storedComponents) {
        const updatedComponents = JSON.parse(storedComponents).filter(
          component => component.id !== componentId,
        );
        await AsyncStorage.setItem(
          'componentsData',
          JSON.stringify(updatedComponents),
        );
        console.log('Component removed from AsyncStorage.');
      }
    } catch (error) {
      console.log('Error deleting component:', error);
    }
  };

  const renderHiddenItem = data => (
    <TouchableOpacity
      style={styles.rowBack}
      onPress={() => handleDeleteComponent(data.item.id)}>
      <View style={styles.rowBack}>
        <Icon name="delete" size={24} color="white" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : (
          <SwipeListView
            data={componentsData}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-75}
            disableRightSwipe
            keyExtractor={item => item.id}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            closeOnRowPress={true}
          />
        )}
      </ScrollView>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddComponent}>
          <Icon name="add-circle-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
            }, 250);
            // Refresh button
          }}>
          <Icon name="refresh" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {renderEditComponentScreen()}
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
    marginVertical: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingBottom: 60,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  componentContainer: {
    marginTop: 15,
  },

  buttons: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  addButton: {
    backgroundColor: '#F99417',
    borderRadius: 50,
    padding: 10,
    marginRight: 10,
  },
  refreshButton: {
    backgroundColor: '#7444A0',
    borderRadius: 50,
    padding: 10,
  },
  rowBack: {
    paddingRight: 15,
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderRadius: 20,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ReceiptScreen;
