import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import I18n from '../I18n';

const {height} = Dimensions.get('window');

let marginTop = 50; // Default marginTop value for English text

if (I18n.defaultLocale === 'tr') {
  marginTop = 30;
}

const WelcomeScreen = ({handlePress}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.background} source={require('../Assets/bg.png')} />
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../Assets/welcoming.png')}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.header}>{I18n.t('organizeSave')}</Text>
        <Text style={styles.text}>{I18n.t('documentPayments')}</Text>
        <View style={styles.startContainer}>
          <Text style={styles.startText}>{I18n.t('letsStart')}</Text>
          <TouchableOpacity style={styles.startButton} onPress={handlePress}>
            <View style={styles.startInnerContainer}>
              <Icon name="arrow-forward-outline" style={styles.icon} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageContainer: {
    position: 'absolute',
    top: 20,
    aspectRatio: 1,
    width: '70%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  contentContainer: {
    position: 'absolute',
    top: height * 0.45,
    width: '100%',
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
    fontSize: 38,
    fontFamily: 'Ruda-ExtraBold',
    textAlign: 'left',
    color: 'black',
  },
  text: {
    fontSize: 15,
    fontFamily: 'Ruda-Regular',
    marginTop: 20,
    textAlign: 'left',
    color: '#7C7C7C',
  },
  startContainer: {
    flexDirection: 'row',
    marginTop: marginTop,
    borderWidth: 1,
    borderRadius: 50,
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    backgroundColor: 'white',
  },
  startButton: {
    alignSelf: 'flex-end',
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startInnerContainer: {
    borderWidth: 1,
    borderRadius: 50,
    height: 58,
    width: 100,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFD0',
  },
  startText: {
    fontSize: 18,
    fontFamily: 'Ruda-Bold',
    textAlign: 'left',
    color: 'black',
  },
  icon: {
    marginRight: 5,
    fontSize: 24,
    color: 'black',
  },
});

export default WelcomeScreen;
