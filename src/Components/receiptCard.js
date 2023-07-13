import React, {useState} from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import I18n from '../I18n';

import {deleteComponent} from '../redux/action';

const ReceiptCard = ({component, onPress}) => {
  const {type, amount, date} = component;

  const handleDelete = () => {
    onDelete(component.id);
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
    backgroundColor: 'red',
  },
  deleting: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  deleting: state.deleting,
});

const mapDispatchToProps = {
  onDelete: deleteComponent,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptCard);
