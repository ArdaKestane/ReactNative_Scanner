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

const {height} = Dimensions.get('window');

const WelcomeScreen = ({handlePress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../Assets/welcoming.png')}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.header}>
          Organize & save {'\n'}all your receipts
        </Text>
        <Text style={styles.text}>
          Document all your payments and {'\n'}
          receipts easily and simply.{' '}
        </Text>
        <View style={styles.startContainer}>
          <Text style={styles.startText}>Let's start!</Text>
          <TouchableOpacity style={styles.startButton} onPress={handlePress}>
            <View style={styles.startInnerContainer}>
              <Icon
                name="arrow-forward-outline"
                size={24}
                color="grey"
                style={styles.icon}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontFamily: 'Sanchez-Italic',
    textAlign: 'left',
    color: 'black',
  },
  text: {
    fontSize: 15,
    fontFamily: 'Sanchez-Regular',
    marginTop: 20,
    textAlign: 'left',
    color: '#7C7C7C',
  },
  startContainer: {
    flexDirection: 'row',
    marginTop: 50,
    borderWidth: 1,
    borderRadius: 50,
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    backgroundColor: '#F2F2F2',
  },
  startButton: {
    alignSelf: 'flex-end',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startInnerContainer: {
    borderLeftWidth: 1,
    borderRadius: 50,
    height: 50,
    width: 100,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startText: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    fontStyle: 'italic',
    textAlign: 'left',
    color: 'black',
  },
  icon: {
    marginRight: 5,
  },
});

export default WelcomeScreen;
