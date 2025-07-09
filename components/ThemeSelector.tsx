import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { FONT_SIZES } from '../styles/typography';
import { PADDING } from '../styles/layout';
import { themes } from '../styles/colors';

const ThemeSelector: React.FC = () => {
  const { currentTheme, theme, setTheme, availableThemes } = useTheme();

  const themeNames = {
    default: 'Default',
    dark: 'Dark',
    classic: 'Classic',
  };

  const handleThemeChange = (themeName: string) => {
    setTheme(themeName);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Choose Theme</Text>
      <ScrollView style={styles.themeList}>
        {availableThemes.map((themeName) => (
          <TouchableOpacity
            key={themeName}
            style={[
              styles.themeOption,
              {
                backgroundColor: theme.card,
                borderColor: currentTheme === themeName ? theme.accent : theme.border,
                borderWidth: currentTheme === themeName ? 2 : 1,
              },
            ]}
            onPress={() => handleThemeChange(themeName)}
          >
            <View style={styles.themeInfo}>
              <Text style={[styles.themeName, { color: theme.text }]}>
                {themeNames[themeName as keyof typeof themeNames] || themeName}
              </Text>
              <View style={styles.colorPreview}>
                <View
                  style={[
                    styles.colorSwatch,
                    { backgroundColor: themes[themeName].dominant },
                  ]}
                />
                <View
                  style={[
                    styles.colorSwatch,
                    { backgroundColor: themes[themeName].secondary },
                  ]}
                />
                <View
                  style={[
                    styles.colorSwatch,
                    { backgroundColor: themes[themeName].accent },
                  ]}
                />
              </View>
            </View>
            {currentTheme === themeName && (
              <FontAwesome name="check" size={20} color={theme.accent} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: PADDING.container,
  },
  title: {
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  themeList: {
    flex: 1,
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: PADDING.card,
    marginBottom: 12,
    borderRadius: 8,
  },
  themeInfo: {
    flex: 1,
  },
  themeName: {
    fontSize: FONT_SIZES.skillCategoryTitle,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  colorPreview: {
    flexDirection: 'row',
    gap: 8,
  },
  colorSwatch: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default ThemeSelector; 