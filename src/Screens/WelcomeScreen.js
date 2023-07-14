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
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import I18n from '../I18n';
import {useDispatch} from 'react-redux';
import {
  setActiveScreen,
  setWelcomePageShown,
  setGlobalUsername,
} from '../redux/action';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {height} = Dimensions.get('window');

let marginTop = 50; // Default marginTop value for English text

if (I18n.defaultLocale === 'tr') {
  marginTop = 30;
}

const WelcomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchRegistrationData();
  }, []);

  const fetchRegistrationData = async () => {
    try {
      const data = await AsyncStorage.getItem('registrationData');
      if (data) {
        const parsedData = JSON.parse(data);
        console.log('Registration data:', parsedData);
      }
    } catch (error) {
      console.log('Error retrieving registration data:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const data = await AsyncStorage.getItem('registrationData');
      if (data) {
        const parsedData = JSON.parse(data);
        const matchingUser = parsedData.find(
          user => user.username === username && user.password === password,
        );
        if (matchingUser) {
          dispatch(setWelcomePageShown(true));
          dispatch(setGlobalUsername(matchingUser.username));
          console.log(matchingUser.username, 'logged in successfully');
        } else {
          Alert.alert('Invalid credentials');
        }
      }
    } catch (error) {
      console.log('Error retrieving registration data:', error);
    }
  };

  useEffect(() => {
    dispatch(setWelcomePageShown());
  }, [dispatch]);

  const [rememberMe, setRememberMe] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const saveRegistrationData = async () => {
    const userData = {
      username,
      password,
      email,
    };

    try {
      const data = await AsyncStorage.getItem('registrationData');
      let parsedData = [];

      if (data) {
        parsedData = JSON.parse(data);
        if (!Array.isArray(parsedData)) {
          parsedData = [];
        }
      }

      parsedData.push(userData);

      await AsyncStorage.setItem(
        'registrationData',
        JSON.stringify(parsedData),
      );
      console.log('Registration data saved successfully');
    } catch (error) {
      console.log('Error saving registration data:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const renderLoginForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.formGroup}>
        <Icon name="person" size={20} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.formGroup}>
        <Icon name="lock-closed" size={20} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.passwordVisibilityIcon}
          onPress={togglePasswordVisibility}>
          <Icon
            name={showPassword ? 'eye-off' : 'eye'}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );

  const renderRegisterForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.formGroup}>
        <Icon name="person" size={20} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.formGroup}>
        <Icon name="lock-closed" size={20} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.formGroup}>
        <Icon name="mail" size={20} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
        />
      </View>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={saveRegistrationData}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'position' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 70}>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          <Image
            style={styles.background}
            source={require('../Assets/bg.png')}
          />
          <View style={styles.contentContainer}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require('../Assets/welcoming.png')}
              />
            </View>
            {isLogin ? renderLoginForm() : renderRegisterForm()}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.loginTabButton}
                onPress={() => setIsLogin(true)}>
                <Text
                  style={isLogin ? styles.activeButtonText : styles.buttonText}>
                  Login
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.registerTabButton}
                onPress={() => setIsLogin(false)}>
                <Text
                  style={
                    !isLogin ? styles.activeButtonText : styles.buttonText
                  }>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  imageContainer: {
    aspectRatio: 1,
    width: '70%',
    overflow: 'hidden',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  formContainer: {
    marginTop: 20,
    width: '100%',
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
  passwordVisibilityIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
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
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  loginTabButton: {
    paddingHorizontal: 20,
    flex: 1,
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
    flex: 1,
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
