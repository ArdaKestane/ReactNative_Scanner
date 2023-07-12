import React, {useEffect, useState} from 'react';
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
import ReceiptCard from '../Components/receiptCard';
import {SwipeListView} from 'react-native-swipe-list-view';

const ReceiptScreen = ({
  componentsData,
  onComponentPress,
  onDeleteComponent,
  onAddMockComponent,
}) => {
  const [loading, setLoading] = useState(true);
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 250);
    return () => clearTimeout(delay);
  }, []);

  const handleComponentPress = component => {
    if (selectedComponents.length > 0) {
      toggleComponentSelection(component);
    } else {
      onComponentPress(component);
    }
  };

  const toggleComponentSelection = component => {
    if (isComponentSelected(component)) {
      setSelectedComponents(prevSelectedComponents =>
        prevSelectedComponents.filter(c => c !== component),
      );
    } else {
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
    setDeleting(true);

    const delay = setTimeout(() => {
      selectedComponents.forEach(component => {
        onDeleteComponent(component);
      });
      setSelectedComponents([]);
      setDeleting(false);
    }, 250);

    return () => clearTimeout(delay);
  };

  const handleAddComponent = () => {
    const minAmount = 10;
    const maxAmount = 50;
    const randomAmount = (
      Math.random() * (maxAmount - minAmount) +
      minAmount
    ).toFixed(2);

    const componentTypes = ['Taxi', 'Grocery', 'Healthcare'];
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

    onAddMockComponent(mockComponent);
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
      onPress={() => handleComponentPress(item)}
      onDelete={onDeleteComponent}
      isSelected={isComponentSelected(item)}
      deleting={deleting && isComponentSelected(item)}
    />
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDeleteComponent(data.item)}>
        <Icon name="delete" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : (
          <>
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
            />
            {selectedComponents.length > 0 && (
              <TouchableOpacity
                style={styles.deleteSelectedButton}
                onPress={handleDeleteSelectedComponents}>
                {deleting ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.deleteSelectedButtonText}>
                    {I18n.t('deleteSelected')}
                  </Text>
                )}
              </TouchableOpacity>
            )}
          </>
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
