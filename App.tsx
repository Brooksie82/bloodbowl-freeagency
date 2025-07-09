import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import PlayerPoolScreen from './screens/PlayerPoolScreen';
import AddPlayerScreen from './screens/AddPlayerScreen';
import { Player } from './types/Player';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

export default function App() {
  const [players, setPlayers] = useState<Player[]>([]);

  const handleAddPlayer = (player: Player) => {
    setPlayers((prev) => [...prev, player]);
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
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
          tabBarActiveTintColor: '#4a90e2',
          tabBarInactiveTintColor: '#888',
          headerShown: false,
          tabBarStyle: {
            height: 60,
            paddingBottom: 4,
            paddingTop: 4,
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Player Pool">
          {() => <PlayerPoolScreen players={players} />}
        </Tab.Screen>
        <Tab.Screen name="Add Player">
          {() => <AddPlayerScreen onAddPlayer={handleAddPlayer} />}
        </Tab.Screen>
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
