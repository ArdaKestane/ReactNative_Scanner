import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import I18n from '../I18n';
import {useDispatch} from 'react-redux';
import {setWelcomePageShown} from '../redux/action';
import CheckBox from '@react-native-community/checkbox';
import RNFS from 'react-native-fs';

const {height} = Dimensions.get('window');

let marginTop = 50; // Default marginTop value for English text

if (I18n.defaultLocale === 'tr') {
  marginTop = 30;
}

const WelcomeScreen = ({handlePress}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setWelcomePageShown());
  }, [dispatch]);

  const [rememberMe, setRememberMe] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const renderLoginForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.formGroup}>
        <Icon name="person" size={20} style={styles.inputIcon} />
        <TextInput style={styles.input} placeholder="Username" />
      </View>
      <View style={styles.formGroup}>
        <Icon name="lock-closed" size={20} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
        />
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={rememberMe}
          onValueChange={setRememberMe}
          style={styles.checkbox}
        />
        <Text style={styles.checkboxLabel}>Remember me</Text>
      </View>
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );

  const renderRegisterForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.formGroup}>
        <Icon name="person" size={20} style={styles.inputIcon} />
        <TextInput style={styles.input} placeholder="Username" />
      </View>
      <View style={styles.formGroup}>
        <Icon name="lock-closed" size={20} style={styles.inputIcon} />
        <TextInput style={styles.input} placeholder="Password" />
      </View>
      <View style={styles.formGroup}>
        <Icon name="mail" size={20} style={styles.inputIcon} />
        <TextInput style={styles.input} placeholder="Email" />
      </View>
      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );

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
        {isLogin ? renderLoginForm() : renderRegisterForm()}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginTabButton}
          onPress={() => setIsLogin(true)}>
          <Text style={isLogin ? styles.activeButtonText : styles.buttonText}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerTabButton}
          onPress={() => setIsLogin(false)}>
          <Text style={!isLogin ? styles.activeButtonText : styles.buttonText}>
            Register
          </Text>
        </TouchableOpacity>
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
    top: height * 0.42,
    width: '100%',
    paddingHorizontal: 20,
  },
  formContainer: {
    marginTop: 20,
  },
  formGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    borderColor: 'grey',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 5,
  },
  checkboxLabel: {
    fontSize: 14,
    fontFamily: 'Ruda-Regular',
    color: 'black',
  },
  loginButton: {
    height: 40,
    backgroundColor: '#F1D4E5',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    fontSize: 16,
    fontFamily: 'Ruda-ExtraBold',
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    position: 'absolute',
    top: height * 0.82,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  loginTabButton: {
    paddingHorizontal: 20,
    width: '50%',
    paddingVertical: 10,
    backgroundColor: '#F2EAD3',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerTabButton: {
    paddingHorizontal: 20,
    width: '50%',
    height: 55,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 10,
    backgroundColor: '#DFD7BF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Ruda-Regular',
    color: 'black',
  },
  activeButtonText: {
    fontSize: 16,
    fontFamily: 'Ruda-Black',
    color: 'black',
  },
  registerButton: {
    height: 40,
    backgroundColor: '#9C8FE6',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButtonText: {
    fontSize: 16,
    fontFamily: 'Ruda-ExtraBold',
    color: 'white',
  },
});

export default WelcomeScreen;
