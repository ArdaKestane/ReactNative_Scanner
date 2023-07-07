import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Lottie from 'lottie-react-native';

const HomeScreen = ({componentsData}) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const filteredReceipts = componentsData.filter(c => {
    const receiptDateParts = c.date.split('-');
    const receiptDate = new Date(
      parseInt(receiptDateParts[0]),
      parseInt(receiptDateParts[1]) - 1,
      parseInt(receiptDateParts[2]),
    );
    return receiptDate > thirtyDaysAgo;
  });

  const totalReceipts = filteredReceipts.length;
  const totalAmount = filteredReceipts.reduce(
    (total, c) => total + c.amount,
    0,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Monthly Summary</Text>
      <Lottie
        style={styles.animation}
        source={require('../Assets/announcment.json')}
        autoPlay
        loop
      />
      <View style={styles.amountContainer}>
        <Text style={styles.amountValue}>₺{totalAmount.toFixed(2)}</Text>
        <Text style={styles.amountText}>spent</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>With a total of</Text>
        <Text style={styles.infoValue}>{totalReceipts}</Text>
        <Text style={styles.infoText}>receipts</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 25,
    color: 'black',
  },
  amountContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 18,
    marginLeft: 10,
    marginBottom: 8,
    color: 'black',
  },
  amountValue: {
    fontSize: 36,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'black',
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'baseline',
  },
  infoText: {
    fontSize: 12,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 2,
    color: '#7F7F86',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  animation: {
    width: 200,
    height: 200,
  },
  mockComponentContainer: {
    marginTop: 20,
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  mockComponentText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mockComponent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mockComponentImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  mockComponentLabel: {
    fontSize: 16,
    color: 'black',
  },
});

export default HomeScreen;
