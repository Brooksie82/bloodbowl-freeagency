import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';
import { FONT_SIZES } from '../styles/typography';
import { PADDING } from '../styles/layout';

const HomeScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Home</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: PADDING.container,
  },
  title: {
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.text,
  },
});

export default HomeScreen; 