import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, ActivityIndicator} from 'react-native';

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
    (total, c) => total + parseFloat(c.amount),
    0,
  );

  const [loadingAmount, setLoadingAmount] = useState(true);
  const [loadingReceipts, setLoadingReceipts] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoadingAmount(false);
    }, 500); // Simulate a 2-second delay

    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    // Simulate loading delay with a timeout
    const delay = setTimeout(() => {
      setLoadingReceipts(false);
    }, 500); // Simulate a 2-second delay

    return () => clearTimeout(delay);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Monthly Summary</Text>
      <Image
        style={styles.image}
        source={require('../Assets/announcement.png')}
      />

      <View style={styles.amountContainer}>
        {loadingAmount ? (
          <ActivityIndicator
            size="small"
            color="black"
            style={styles.loadingIndicator}
          />
        ) : (
          <Text style={styles.amountValue}>₺{totalAmount.toFixed(2)}</Text>
        )}
        <Text style={styles.amountText}>spent</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>With a total of</Text>
        {loadingReceipts ? (
          <ActivityIndicator
            size="small"
            color="black"
            style={styles.loadingIndicator}
          />
        ) : (
          <Text style={styles.infoValue}>{totalReceipts}</Text>
        )}
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
    textAlign: 'center',
    marginBottom: 20,
  },
  amountContainer: {
    flexDirection: 'row',
    marginBottom: 10,
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
  image: {
    width: 200,
    height: 200,
  },
  loadingIndicator: {
    marginLeft: 10,
  },
});

export default HomeScreen;
