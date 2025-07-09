import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import PlayerCard from '../components/PlayerCard';
import { Player } from '../types/Player';
import { colors } from '../styles/colors';
import { FONT_SIZES } from '../styles/typography';
import { PADDING } from '../styles/layout';

interface PlayerPoolScreenProps {
  players: Player[];
}

const PlayerPoolScreen: React.FC<PlayerPoolScreenProps> = ({ players }) => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Player Pool</Text>
    {players.length === 0 ? (
      <Text style={styles.text}>No players added yet.</Text>
    ) : (
      <FlatList
        data={players}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => <PlayerCard player={item} />}
      />
    )}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: PADDING.container,
  },
  title: {
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.text,
  },
  text: {
    color: colors.text,
  },
});

export default PlayerPoolScreen; 