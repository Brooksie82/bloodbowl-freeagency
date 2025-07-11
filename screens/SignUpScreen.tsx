import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [coachName, setCoachName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateEmail = (email: string) => {
    // Simple email regex
    return /^\S+@\S+\.\S+$/.test(email);
  };

  const handleSignUp = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return;
    }
    // Store user locally
    try {
      await AsyncStorage.setItem('user', JSON.stringify({ email, coachName, password }));
      Alert.alert('Success', 'Account created! Please log in.');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', 'Failed to save user.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.linkContainer}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
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

export default SignUpScreen; 