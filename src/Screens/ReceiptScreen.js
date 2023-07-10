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

const ComponentScreen = ({
  componentsData,
  onComponentPress,
  onDeleteComponent,
  onAddMockComponent,
}) => {
  const [loading, setLoading] = useState(true);
  const [selectedComponents, setSelectedComponents] = useState([]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 250); // Screen Button
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
    selectedComponents.forEach(component => {
      onDeleteComponent(component);
    });
    setSelectedComponents([]);
  };

  const handleAddComponent = handleAddMockComponent => {
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
      extractedText: 'Mock component',
      type: randomType,
    };

    onAddMockComponent(mockComponent);
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
                <ReceiptCard
                  key={component.id}
                  component={component}
                  onPress={handleComponentPress}
                  onDelete={onDeleteComponent}
                  isSelected={isComponentSelected(component)}
                />
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
            console.log(componentsData); // Refresh button
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
});

export default ComponentScreen;
