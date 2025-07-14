import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../contexts/ThemeContext';
import ThemeSelector from '../components/ThemeSelector';
import { useUser } from '../contexts/UserContext';
import { UserRole } from '../types/User';

const UserSettingsScreen = ({ navigation }: any) => {
  const [themeModalVisible, setThemeModalVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(0));
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const { theme } = useTheme();
  const { user } = useUser();

  useEffect(() => {
    if (themeModalVisible) {
      setHasInteracted(true);
      setIsAnimating(true);
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsAnimating(false);
      });
    } else if (hasInteracted) {
      setIsAnimating(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsAnimating(false);
      });
    }
    // Only run when themeModalVisible changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeModalVisible]);

  const slideInTransform = {
    transform: [
      {
        translateX: slideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [400, 0],
        }),
      },
    ],
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('session');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.accountContainer}>
      <Text style={styles.accountTitle}>Account Settings</Text>
      {user && (
        <Text style={{ fontSize: 18, color: theme.textSecondary, marginBottom: 16 }}>
          Role: {user.role}
        </Text>
      )}
      <TouchableOpacity style={styles.accountItem} onPress={handleLogout}>
        <Text style={styles.accountItemText}>Log Out</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.accountItem, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}
        onPress={() => setThemeModalVisible(true)}
      >
        <FontAwesome name="paint-brush" size={20} color={theme.accent} />
        <Text style={[styles.accountItemText, { color: theme.text, marginLeft: 8 }]}>Customize Theme</Text>
      </TouchableOpacity>
      {(hasInteracted && (themeModalVisible || isAnimating)) && (
        <View style={styles.overlay}>
          <Animated.View style={[styles.sidebar, { backgroundColor: theme.background }, slideInTransform]}>
            <View style={[styles.header, { borderBottomColor: theme.border }]}>
              <TouchableOpacity onPress={() => setThemeModalVisible(false)} style={styles.backButton}>
                <FontAwesome name="arrow-left" size={20} color={theme.text} />
              </TouchableOpacity>
              <Text style={[styles.headerTitle, { color: theme.text }]}>Theme Settings</Text>
            </View>
            <View style={styles.content}>
              <ThemeSelector />
            </View>
          </Animated.View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  accountContainer: {
    flex: 1,
    backgroundColor: '#f4fffd',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#011936',
  },
  accountItem: {
    width: '100%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  accountItemText: {
    fontSize: 18,
    color: '#ed254e',
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  sidebar: {
    width: '80%',
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    borderLeftWidth: 1,
    borderLeftColor: '#e0e0e0',
    padding: 20,
    boxShadow: '-2px 0 3.84px rgba(0, 0, 0, 0.25)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserSettingsScreen; 