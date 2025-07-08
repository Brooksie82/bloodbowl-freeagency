import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Player } from '../types/Player';
import { colors } from '../styles/colors';

const PlayerCard: React.FC<{ player: Player }> = ({ player }) => (
  <View style={styles.playerCard}>
    <Text style={styles.playerName}>{player.name}</Text>
    <Text style={styles.text}>Race: {player.race}</Text>
    <Text style={styles.text}>Position: {player.position}</Text>
    <Text style={styles.text}>Level: {player.level}</Text>
    <Text style={styles.text}>Skills: {player.skills}</Text>
    <Text style={styles.text}>Value: {player.value}</Text>
  </View>
);

const styles = StyleSheet.create({
  playerCard: {
    backgroundColor: colors.card,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  playerName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
    color: colors.primary,
  },
  text: {
    color: colors.text,
  },
});

export default PlayerCard; 