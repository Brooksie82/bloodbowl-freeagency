import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Player } from '../types/Player';
import { useTheme } from '../contexts/ThemeContext';
import { FONT_SIZES } from '../styles/typography';
import { PADDING } from '../styles/layout';

const PlayerCard: React.FC<{ player: Player }> = ({ player }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.playerCard, { backgroundColor: theme.card }]}>
      <Text style={[styles.playerName, { color: theme.accent }]}>{player.name}</Text>
      <Text style={[styles.text, { color: theme.text }]}>Race: {player.race}</Text>
      <Text style={[styles.text, { color: theme.text }]}>Position: {player.position}</Text>
      <Text style={[styles.text, { color: theme.text }]}>Level: {player.level}</Text>
      <Text style={[styles.text, { color: theme.text }]}>Skills: {player.skills}</Text>
      <Text style={[styles.text, { color: theme.text }]}>Value: {player.value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  playerCard: {
    padding: PADDING.card,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 16,
  },
  playerName: {
    fontWeight: 'bold',
    fontSize: FONT_SIZES.skillCategoryTitle,
    marginBottom: 4,
  },
  text: {
    fontSize: FONT_SIZES.checkboxLabel,
  },
});

export default PlayerCard; 