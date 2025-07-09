import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import PlayerCard from '../components/PlayerCard';
import { Player } from '../types/Player';
import { useTheme } from '../contexts/ThemeContext';
import { FONT_SIZES } from '../styles/typography';
import { PADDING } from '../styles/layout';

interface PlayerPoolScreenProps {
  players: Player[];
}

const PlayerPoolScreen: React.FC<PlayerPoolScreenProps> = ({ players }) => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Player Pool</Text>
      {players.length === 0 ? (
        <Text style={[styles.text, { color: theme.textSecondary }]}>No players added yet.</Text>
      ) : (
        <FlatList
          data={players}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item }) => <PlayerCard player={item} />}
        />
      )}
    </SafeAreaView>
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
  },
  text: {
    fontSize: FONT_SIZES.checkboxLabel,
  },
});

export default PlayerPoolScreen; 