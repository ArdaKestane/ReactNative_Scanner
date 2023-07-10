import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import I18n from '../I18n';
import TransactionCard from '../Components/transactionCard';

const HomeScreen = ({componentsData}) => {
  const totalReceipts = componentsData.length;
  const totalAmount = componentsData.reduce(
    (total, c) => total + parseFloat(c.amount || 0),
    0,
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.imageHeader} source={require('../Assets/top.png')} />
      <View style={styles.infoContainer}>
        <Text style={styles.heading}>Hi, Arda Kestane</Text>

        <View style={styles.amountContainer}>
          <Text style={styles.amountValue}>₺{totalAmount.toFixed(2)}</Text>
          <Text style={styles.amountText}>{I18n.t('spent')}</Text>
        </View>
        <View style={styles.receiptContainer}>
          <Text style={styles.infoText}>{I18n.t('withTotalOf')}</Text>
          <Text style={styles.infoValue}>{totalReceipts}</Text>
          <Text style={styles.infoText}>{I18n.t('receipts')}</Text>
        </View>
      </View>
      <View style={styles.transactionContainer}>
        <View style={styles.transactionHeaders}>
          <Text style={styles.heading}>Transactions</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <TransactionCard type="Taxi" amount={200} total={200} />
        <TransactionCard type="Grocery" amount={100} total={200} />
        <TransactionCard type="Healthcare" amount={25} total={200} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F9F9F9',
  },
  imageHeader: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },

  infoContainer: {
    padding: 20,
    justifyContent: 'space-between',
    height: 200,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 24,
    color: 'black',
    fontFamily: 'Ruda-Bold',
  },
  amountContainer: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountValue: {
    fontSize: 24,
    color: 'black',
    fontFamily: 'Ruda-Bold',
  },
  amountText: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Ruda-Regular',
  },
  receiptContainer: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  infoText: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Ruda-Regular',
  },
  infoValue: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Ruda-Bold',
  },
  transactionContainer: {},
  transactionHeaders: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeAll: {
    fontSize: 16,
    color: '#9C8FE6',
    fontFamily: 'Ruda-Black',
  },
});

export default HomeScreen;
