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
import I18n from '../I18n';

const ReceiptCard = ({component, image, onPress, onDelete, isSelected}) => {
  const {type, amount, date} = component;
  const [deleting, setDeleting] = useState(false);

  const handleDelete = () => {
    setDeleting(true);
    setTimeout(() => {
      onDelete(component);
    }, 250); // Delay before calling onDelete
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
        <Text style={styles.heading}>
          {I18n.t('date')}: <Text style={styles.value}>{date}</Text>
        </Text>
        <Text style={styles.heading}>
          {I18n.t('amount')}:{' '}
          <Text style={styles.value}>
            {amount !== undefined && amount !== null
              ? amount.toString().length <= 10
                ? amount.toString()
                : amount.toString().substring(0, 10) + '...'
              : I18n.t('notAvailable')}
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    flexDirection: 'row',
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
  heading: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Ruda-ExtraBold',
  },
  value: {
    fontFamily: 'Ruda-Regular',
  },
  deleteButton: {
    borderRadius: 5,
    padding: 5,
  },
  selectedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 50,
  },
});

export default ReceiptCard;
