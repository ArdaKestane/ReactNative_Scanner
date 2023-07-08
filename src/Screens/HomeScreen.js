import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import I18n from '../I18n';

const HomeScreen = ({componentsData}) => {
  const totalReceipts = componentsData.length;
  const totalAmount = componentsData.reduce(
    (total, c) => total + parseFloat(c.amount || 0),
    0,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{I18n.t('monthlySummary')}</Text>
      <Image
        style={styles.image}
        source={require('../Assets/announcement.png')}
      />

      <View style={styles.amountContainer}>
        <Text style={styles.amountValue}>₺{totalAmount.toFixed(2)}</Text>
        <Text style={styles.amountText}>{I18n.t('spent')}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{I18n.t('withTotalOf')}</Text>
        <Text style={styles.infoValue}>{totalReceipts}</Text>
        <Text style={styles.infoText}>{I18n.t('receipts')}</Text>
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
});

export default HomeScreen;
