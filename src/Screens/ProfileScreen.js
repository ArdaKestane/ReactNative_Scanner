import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../Assets/avatar.png')} // Replace with the path to the user's avatar image
          style={styles.avatar}
        />
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
      </View>

      <TouchableOpacity
        style={styles.option}
        onPress={() => console.log('Edit Profile pressed')}>
        <Text style={styles.optionText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => console.log('Change Password pressed')}>
        <Text style={styles.optionText}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => console.log('Notification Settings pressed')}>
        <Text style={styles.optionText}>Notification Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => console.log('Privacy Settings pressed')}>
        <Text style={styles.optionText}>Privacy Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => console.log('View Activity History pressed')}>
        <Text style={styles.optionText}>View Activity History</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => console.log('Support pressed')}>
        <Text style={styles.optionText}>Support</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => console.log('Logout pressed')}>
        <Icon name="logout" size={24} color="black" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FDF5E6',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
    fontStyle: 'italic',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});

export default ProfileScreen;
