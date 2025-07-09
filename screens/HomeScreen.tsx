import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { FONT_SIZES } from '../styles/typography';
import { PADDING } from '../styles/layout';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ThemeSelector from '../components/ThemeSelector';

const HomeScreen = () => {
  const { theme } = useTheme();
  const [themeModalVisible, setThemeModalVisible] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Blood Bowl Free Agency</Text>
      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
        Manage your player pool and track free agents
      </Text>
      
      <TouchableOpacity
        style={[styles.themeButton, { backgroundColor: theme.card, borderColor: theme.border }]}
        onPress={() => setThemeModalVisible(true)}
      >
        <FontAwesome name="paint-brush" size={20} color={theme.accent} />
        <Text style={[styles.themeButtonText, { color: theme.text }]}>Customize Theme</Text>
      </TouchableOpacity>

      <Modal visible={themeModalVisible} animationType="slide">
        <ThemeSelector />
        <TouchableOpacity
          style={[styles.closeButton, { backgroundColor: theme.accent }]}
          onPress={() => setThemeModalVisible(false)}
        >
          <Text style={[styles.closeButtonText, { color: theme.dominant }]}>Close</Text>
        </TouchableOpacity>
      </Modal>
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
    gap: 8,
  },
  themeButtonText: {
    fontSize: FONT_SIZES.checkboxLabel,
    fontWeight: '500',
  },
  closeButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: FONT_SIZES.checkboxLabel,
    fontWeight: 'bold',
  },
});

export default HomeScreen; 