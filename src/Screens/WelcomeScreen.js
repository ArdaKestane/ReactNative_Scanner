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
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import I18n from '../I18n';
import {useDispatch} from 'react-redux';
import {setWelcomePageShown, setGlobalUsername} from '../redux/action';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      <Text style={styles.loginHeader}>Login</Text>
      <View style={styles.formGroup}>
        <Icon name="text-outline" size={20} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.formGroup}>
        <Icon name="lock-closed-outline" size={20} style={styles.inputIcon} />
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
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={22}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.registerGroup}>
        <Text style={styles.newText}>New around here?</Text>
        <TouchableOpacity onPress={() => setIsLogin(false)}>
          <Text style={styles.registerScreenButton}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderRegisterForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.loginHeader}>Register</Text>
      <View style={styles.formGroup}>
        <Icon name="text-outline" size={20} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.formGroup}>
        <Icon name="lock-closed-outline" size={20} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.formGroup}>
        <Icon name="mail-outline" size={20} style={styles.inputIcon} />
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
      <View style={styles.loginGroup}>
        <Text style={styles.newText}>Joined us before?</Text>
        <TouchableOpacity onPress={() => setIsLogin(true)}>
          <Text style={styles.registerScreenButton}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'IOS' ? 'position' : null}
        keyboardVerticalOffset={Platform.OS === 'IOS' ? 50 : 70}>
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
    marginTop: 0,
    width: '100%',
  },
  formGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  loginHeader: {
    fontSize: 32,
    fontFamily: 'NunitoSans_7pt_SemiExpanded-ExtraBold',
    color: 'black',
    marginLeft: 10,
    marginBottom: 20,
  },
  newText: {
    fontSize: 14,
    fontFamily: 'Ruda-Regular',
    color: 'black',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
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
    marginHorizontal: 20,
    marginTop: 10,
  },
  loginButtonText: {
    fontSize: 16,
    fontFamily: 'NunitoSans_7pt-BoldItalic',
    color: 'black',
  },
  registerGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    gap: 5,
  },
  loginGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    gap: 5,
  },
  registerScreenButton: {
    fontSize: 16,
    fontFamily: 'NunitoSans_7pt_Condensed-ExtraBoldItalic',
    color: 'black',
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
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  registerButtonText: {
    fontSize: 16,
    fontFamily: 'NunitoSans_7pt-BoldItalic',
    color: 'white',
  },
});

export default WelcomeScreen;
