import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import PlayerPoolScreen from './screens/PlayerPoolScreen';
import AddPlayerScreen from './screens/AddPlayerScreen';
import { Player } from './types/Player';

const Tab = createBottomTabNavigator();

export default function App() {
  const [players, setPlayers] = useState<Player[]>([]);

  const handleAddPlayer = (player: Player) => {
    setPlayers((prev) => [...prev, player]);
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
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
