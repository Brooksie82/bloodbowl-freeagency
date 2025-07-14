import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AdminScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Panel</Text>
      <Text style={styles.message}>This screen is only accessible to Admin Users.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4fffd',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#ed254e',
  },
  message: {
    fontSize: 18,
    color: '#011936',
  },
});

export default AdminScreen; 