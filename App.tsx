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
import UserSettingsScreen from './screens/UserSettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
      <Tab.Screen name="Account" component={UserSettingsScreen} />
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
