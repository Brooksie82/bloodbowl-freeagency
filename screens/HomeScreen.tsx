import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { FONT_SIZES } from '../styles/typography';
import { PADDING } from '../styles/layout';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ThemeSelector from '../components/ThemeSelector';

const HomeScreen = () => {
  const { theme } = useTheme();
  // Remove the themeButton TouchableOpacity and the themeModalVisible, slideAnim, isAnimating, and all modal/sidebar logic.
  // Only keep the main title, subtitle, and layout for HomeScreen.

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Blood Bowl Free Agency</Text>
      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
        Manage your player pool and track free agents
      </Text>
      
      {/* Theme Modal with Slide Animation */}
      {/* The theme picker button and modal are removed from the Home screen. */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: PADDING.container,
  },

  title: {
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FONT_SIZES.skillCategoryTitle,
    marginBottom: 32,
    textAlign: 'center',
  },
  themeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: PADDING.card,
    borderRadius: 8,
    borderWidth: 1,
  },
  themeButtonText: {
    fontSize: FONT_SIZES.checkboxLabel,
    fontWeight: '500',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '85%',
    height: '100%',
    boxShadow: '-2px 0 3.84px rgba(0, 0, 0, 0.25)',
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: PADDING.container,
    paddingTop: PADDING.modalTop,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: FONT_SIZES.modalTitle,
    fontWeight: 'bold',
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default HomeScreen; 