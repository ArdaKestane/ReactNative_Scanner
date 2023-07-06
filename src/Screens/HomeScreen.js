import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Total Receipts:</Text>
        <Text style={styles.infoValue}>{totalReceipts}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Total Amount:</Text>
        <Text style={styles.infoValue}> ₺{totalAmount.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDF5E6',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 18,
    marginRight: 10,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
