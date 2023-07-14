import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import I18n from '../I18n';
import TransactionCard from '../Components/transactionCard';
import {useSelector, useDispatch} from 'react-redux';
import {setActiveScreen} from '../redux/action';
import {setUsername} from '../redux/action';

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [totalReceipts, setTotalReceipts] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [taxiAmount, setTaxiAmount] = useState(0);
  const [groceryAmount, setGroceryAmount] = useState(0);
  const [healthcareAmount, setHealthcareAmount] = useState(0);
  const componentsData = useSelector(state => state.componentsData);

  const dispatch = useDispatch();
  const username = useSelector(state => state.username);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
      setTotalReceipts(componentsData.length);

      const filteredTotalAmount = componentsData.reduce(
        (total, component) => total + parseFloat(component.amount || 0),
        0,
      );
      setTotalAmount(filteredTotalAmount);

      const filteredTaxiAmount = componentsData
        .filter(component => component.type === 'Taxi')
        .reduce(
          (total, component) => total + parseFloat(component.amount || 0),
          0,
        );
      setTaxiAmount(filteredTaxiAmount);

      const filteredGroceryAmount = componentsData
        .filter(component => component.type === 'Grocery')
        .reduce(
          (total, component) => total + parseFloat(component.amount || 0),
          0,
        );
      setGroceryAmount(filteredGroceryAmount);

      const filteredHealthcareAmount = componentsData
        .filter(component => component.type === 'Healthcare')
        .reduce(
          (total, component) => total + parseFloat(component.amount || 0),
          0,
        );
      setHealthcareAmount(filteredHealthcareAmount);
    }, 250);

    return () => clearTimeout(delay);
  }, [componentsData]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.imageHeader} source={require('../Assets/top.png')} />
      <View style={styles.infoContainer}>
        <Text style={styles.heading}>
          {I18n.t('greeting', {name: username})}
        </Text>

        <View style={styles.amountContainer}>
          {loading ? (
            <ActivityIndicator size="small" color="black" />
          ) : (
            <Text style={styles.amountValue}>₺{totalAmount.toFixed(2)}</Text>
          )}
          <Text style={styles.amountText}>{I18n.t('spent')}</Text>
        </View>
        <View style={styles.receiptContainer}>
          {loading ? (
            <ActivityIndicator size="small" color="black" />
          ) : (
            <>
              <Text style={styles.infoText}>
                {I18n.t('with', {totalReceipts})}
              </Text>
              <Text style={styles.infoValue}>{totalReceipts}</Text>
              <Text style={styles.infoText}>{I18n.t('receipts')}</Text>
            </>
          )}
        </View>
      </View>
      <View style={styles.transactionContainer}>
        <View style={styles.transactionHeaders}>
          <Text style={styles.heading}>{I18n.t('transactions')}</Text>
          <TouchableOpacity
            onPress={() => dispatch(setActiveScreen('receipt'))}>
            <Text style={styles.seeAll}>{I18n.t('seeAll')}</Text>
          </TouchableOpacity>
        </View>
        <TransactionCard type="Taxi" amount={taxiAmount} maxAmount={200} />
        <TransactionCard
          type="Grocery"
          amount={groceryAmount}
          maxAmount={200}
        />
        <TransactionCard
          type="Healthcare"
          amount={healthcareAmount}
          maxAmount={200}
        />
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
