import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ReceiptCard = ({component, onPress, onDelete, isSelected}) => {
  const {type, amount, date, image} = component;
  const [deleting, setDeleting] = useState(false);

  const handleDelete = () => {
    setDeleting(true);
    onDelete(component);
  };

  let imageSource;
  switch (type) {
    case 'Taxi':
      imageSource = require('../Assets/taxi.png');
      break;
    case 'Grocery':
      imageSource = require('../Assets/grocery.png');
      break;
    case 'Healthcare':
      imageSource = require('../Assets/healthcare.png');
      break;
    default:
      break;
  }

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(component)}>
      <View style={styles.leftColumn}>
        <Image style={styles.circleImage} source={imageSource} />
      </View>
      <View style={styles.rightColumn}>
        <Text style={styles.title}>Tarih: {date}</Text>
        <Text style={styles.title}>
          Tutar:{' '}
          {amount.length <= 10 ? amount : amount.substring(0, 10) + '...'}
        </Text>
      </View>
      {deleting ? (
        <View style={styles.deleteButton}>
          <ActivityIndicator size="small" color="black" />
        </View>
      ) : (
        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
          <Icon name="delete" size={30} color="red" />
        </TouchableOpacity>
      )}
      {isSelected && <View style={styles.selectedOverlay} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    margin: 5,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
  },

  leftColumn: {
    marginRight: 10,
  },
  rightColumn: {
    flex: 1,
  },
  circleImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  deleteButton: {
    borderRadius: 5,
    padding: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 50,
  },
});

export default ReceiptCard;
