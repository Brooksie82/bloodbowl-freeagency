import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { FONT_SIZES } from '../styles/typography';

const Logo = ({ size = 'large' }: { size?: 'small' | 'medium' | 'large' }) => {
  const { theme } = useTheme();
  
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { container: 120, logo: 80, text: 16, subtitle: 12 };
      case 'medium':
        return { container: 200, logo: 120, text: 24, subtitle: 16 };
      case 'large':
      default:
        return { container: 300, logo: 180, text: 32, subtitle: 20 };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <View style={[styles.container, { width: sizeStyles.container, height: sizeStyles.container }]}>
      {/* Background circle */}
      <View style={[styles.backgroundCircle, { backgroundColor: theme.card, borderColor: theme.border }]}>
        {/* Football helmet silhouette */}
        <View style={[styles.helmet, { backgroundColor: theme.accent }]}>
          {/* Helmet face mask */}
          <View style={[styles.faceMask, { backgroundColor: theme.textSecondary }]} />
          {/* Helmet stripe */}
          <View style={[styles.helmetStripe, { backgroundColor: '#f6e05e' }]} />
        </View>
        
        {/* Dollar sign symbol */}
        <View style={[styles.dollarCircle, { backgroundColor: theme.accent }]}>
          <Text style={[styles.dollarSign, { color: theme.background }]}>$</Text>
        </View>
        
        {/* "FA" text */}
        <Text style={[styles.faText, { color: theme.text, fontSize: sizeStyles.text * 0.4 }]}>FA</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 150,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  helmet: {
    width: 120,
    height: 80,
    borderRadius: 60,
    position: 'absolute',
    top: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  faceMask: {
    width: 100,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    top: 15,
    opacity: 0.8,
  },
  helmetStripe: {
    width: 120,
    height: 4,
    position: 'absolute',
    top: 35,
    opacity: 0.8,
  },
  dollarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 40,
  },
  dollarSign: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  faText: {
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 20,
  },
});

export default Logo; 