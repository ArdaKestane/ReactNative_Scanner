import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const TransactionCard = ({type, amount, total}) => {
  // Calculate the progress percentage
  const progress = (amount / total) * 100;

  // Define the image source based on the transaction type
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
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <Image style={styles.circleImage} source={imageSource} />
      </View>
      <View style={styles.rightColumn}>
        <Text style={styles.title}>{type}</Text>
        <View style={styles.row}>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, {width: `${progress}%`}]} />
          </View>
          <Text style={styles.amountText}>
            $ {amount.toFixed(2)} / $ {total.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 50,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarContainer: {
    flex: 1,
    height: 10,
    backgroundColor: '#EDEDED',
    borderRadius: 5,
    marginRight: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  amountText: {
    fontSize: 16,
    color: 'black',
  },
});

export default TransactionCard;