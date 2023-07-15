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
          Alert.alert(
            'Invalid credentials',
            'Please check your username and password.',
            [{text: 'OK'}],
          );
        }
      }
    } catch (error) {
      console.log('Error retrieving registration data:', error);
    }
  };

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
      setIsLogin(true);
    } catch (error) {
      console.log('Error saving registration data:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const renderLoginForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.loginHeader}>{I18n.t('login')}</Text>
      <View style={styles.formGroup}>
        <Icon name="text-outline" size={20} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder={I18n.t('username')}
          onChangeText={setUsername}
          placeholderTextColor="grey"
        />
      </View>
      <View style={styles.formGroup}>
        <Icon name="lock-closed-outline" size={20} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder={I18n.t('password')}
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
          placeholderTextColor="grey"
        />
        <TouchableOpacity
          style={styles.passwordVisibilityIcon}
          onPress={togglePasswordVisibility}>
          <Icon
            style={styles.inputIcon}
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={22}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>{I18n.t('login')}</Text>
      </TouchableOpacity>
      <View style={styles.registerGroup}>
        <Text style={styles.newText}>{I18n.t('newAroundHere')}</Text>
        <TouchableOpacity onPress={() => setIsLogin(false)}>
          <Text style={styles.registerScreenButton}>{I18n.t('register')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderRegisterForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.loginHeader}>{I18n.t('register')}</Text>
      <View style={styles.formGroup}>
        <Icon name="text-outline" size={20} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder={I18n.t('username')}
          onChangeText={setUsername}
          placeholderTextColor="grey"
        />
      </View>
      <View style={styles.formGroup}>
        <Icon name="lock-closed-outline" size={20} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder={I18n.t('password')}
          onChangeText={setPassword}
          placeholderTextColor="grey"
        />
      </View>
      <View style={styles.formGroup}>
        <Icon name="mail-outline" size={20} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder={I18n.t('email')}
          onChangeText={setEmail}
          placeholderTextColor="grey"
        />
      </View>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={saveRegistrationData}>
        <Text style={styles.registerButtonText}>{I18n.t('register')}</Text>
      </TouchableOpacity>
      <View style={styles.loginGroup}>
        <Text style={styles.newText}>{I18n.t('joinedUsBefore')}</Text>
        <TouchableOpacity onPress={() => setIsLogin(true)}>
          <Text style={styles.registerScreenButton}>{I18n.t('login')}</Text>
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
    color: 'black',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    color: 'black',
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
  registerScreenButton: {
    fontSize: 16,
    fontFamily: 'NunitoSans_7pt_Condensed-ExtraBoldItalic',
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
