import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const HomeScreen = ({ componentsData }) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const filteredReceipts = componentsData.filter((c) => {
    const receiptDateParts = c.date.split('.');
    const receiptDate = new Date(
      parseInt(receiptDateParts[2]),
      parseInt(receiptDateParts[1]) - 1,
      parseInt(receiptDateParts[0])
    );
    return receiptDate > thirtyDaysAgo;
  });

  const totalReceipts = filteredReceipts.length;
  const totalAmount = filteredReceipts.reduce((total, c) => total + c.amount, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Monthly Summary</Text>
      <Image
        source={require('../Assets/announcment.png')}
        style={styles.image}
      />
      <View style={styles.amountContainer}>
        <Text style={styles.amountValue}>₺{totalAmount.toFixed(2)}</Text>
        <Text style={styles.amountText}>spent</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>With total of</Text>
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
    marginBottom: 20,
    color: 'black'
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
  },
  amountValue: {
    fontSize: 36,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'baseline', // Align items on the baseline
  },
  infoText: {
    fontSize: 12,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 2,
    color: '#7F7F86' // Reduce the marginBottom
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
  }
});

export default HomeScreen;
