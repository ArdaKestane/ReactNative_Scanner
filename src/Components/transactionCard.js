import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import I18n from '../I18n';

const TransactionCard = ({type, amount, maxAmount}) => {
  // Calculate the progress percentage based on the maximum amount
  const progress = (amount / maxAmount) * 100;

  // Ensure the progress doesn't exceed 100% or go below 0%
  const clampedProgress = Math.max(0, Math.min(progress, 100));

  // Limit the displayed amount to the maximum amount with ellipsis
  const displayedAmount =
    amount > maxAmount
      ? `${Math.floor(amount).toString().substring(0, 5).replace('.', '')}...`
      : amount.toFixed(2);

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
      break;
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <Image style={styles.circleImage} source={imageSource} />
      </View>
      <View style={styles.rightColumn}>
        <Text style={styles.title}>{I18n.t(type)}</Text>
        <View style={styles.row}>
          <View style={styles.progressBarContainer}>
            <View
              style={[styles.progressBar, {width: `${clampedProgress}%`}]}
            />
          </View>
          <Text style={styles.amountText}>₺ {displayedAmount}</Text>
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
    paddingRight: 20,
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
    color: 'black',
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
