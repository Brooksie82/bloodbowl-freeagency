import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserRole, User } from '../types/User';

const LoginScreen = ({ navigation }: any) => {
  const [coachName, setCoachName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Mock login always successful
    try {
      // Randomly assign a role for testing
      const roles = [UserRole.User, UserRole.AdminUser];
      const randomRole = roles[Math.floor(Math.random() * roles.length)];
      const user: User = {
        id: coachName,
        username: coachName,
        role: randomRole,
      };
      await AsyncStorage.setItem('session', JSON.stringify(user));
      navigation.navigate('MainTabs');
    } catch (e) {
      Alert.alert('Error', 'Failed to save session.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Coach Name"
        value={coachName}
        onChangeText={setCoachName}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.linkContainer}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f4fffd',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#011936',
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 48,
    backgroundColor: '#ed254e',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkContainer: {
    marginTop: 8,
  },
  linkText: {
    color: '#4a90e2',
    fontSize: 16,
  },
});

export default LoginScreen; 