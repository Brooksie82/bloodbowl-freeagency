import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Image, TouchableOpacity, View, Text, StyleSheet, Alert, Animated } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/HomeScreen';
import PlayerPoolScreen from './screens/PlayerPoolScreen';
import AddPlayerScreen from './screens/AddPlayerScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import { Player } from './types/Player';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import ThemeSelector from './components/ThemeSelector';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AccountScreen = ({ navigation }: any) => {
  const [themeModalVisible, setThemeModalVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(0));
  const [isAnimating, setIsAnimating] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    if (themeModalVisible) {
      setIsAnimating(true);
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsAnimating(false);
      });
    } else {
      setIsAnimating(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsAnimating(false);
      });
    }
  }, [themeModalVisible, slideAnim]);

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
      {(themeModalVisible || isAnimating) && (
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

const MainTabs = ({ players, handleAddPlayer }: any) => {
  const { theme } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Account') {
            return (
              <Image
                source={require('./assets/icon.png')}
                style={{ width: 24, height: 24, borderRadius: 12, borderWidth: focused ? 2 : 0, borderColor: theme.accent }}
                resizeMode="cover"
              />
            );
          }
          let iconName: string;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Player Pool') {
            iconName = 'users';
          } else if (route.name === 'Add Player') {
            iconName = 'plus';
          } else {
            iconName = 'circle';
          }
          return <FontAwesome name={iconName} size={22} color={color} style={{ marginBottom: -2 }} />;
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 0,
          marginBottom: 4,
        },
        tabBarIconStyle: {
          marginTop: 6,
        },
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.textSecondary,
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 4,
          paddingTop: 4,
          backgroundColor: theme.card,
          borderTopColor: theme.border,
          borderTopWidth: 1,
        },
        animationEnabled: true,
        animationTypeForReplace: 'push',
        animationDuration: 300,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Player Pool">
        {() => <PlayerPoolScreen players={players} />}
      </Tab.Screen>
      <Tab.Screen name="Add Player">
        {() => <AddPlayerScreen onAddPlayer={handleAddPlayer} />}
      </Tab.Screen>
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

const AppContent = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const { theme } = useTheme();

  const handleAddPlayer = (player: Player) => {
    setPlayers((prev) => [...prev, player]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="MainTabs">
          {() => <MainTabs players={players} handleAddPlayer={handleAddPlayer} />}
        </Stack.Screen>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
