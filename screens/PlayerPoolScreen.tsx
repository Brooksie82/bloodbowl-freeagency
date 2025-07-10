import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import PlayerCard from '../components/PlayerCard';
import PlayerFilters, { PlayerFilters as PlayerFiltersType } from '../components/PlayerFilters';
import { Player } from '../types/Player';
import { useTheme } from '../contexts/ThemeContext';
import { FONT_SIZES } from '../styles/typography';
import { PADDING } from '../styles/layout';
import { filterPlayers } from '../utils/playerFilters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface PlayerPoolScreenProps {
  players: Player[];
}

const PlayerPoolScreen: React.FC<PlayerPoolScreenProps> = ({ players }) => {
  const { theme } = useTheme();
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [playersWithBids, setPlayersWithBids] = useState<Player[]>(players);
  const [filters, setFilters] = useState<PlayerFiltersType>({
    name: '',
    race: '',
    position: '',
    skills: [],
    minValue: '',
    maxValue: '',
  });

  // Update players when the prop changes
  React.useEffect(() => {
    setPlayersWithBids(players);
  }, [players]);

  const handleBid = (playerId: string, bidAmount: number) => {
    setPlayersWithBids(prevPlayers => 
      prevPlayers.map(player => 
        player.name === playerId 
          ? {
              ...player,
              bidCount: player.hasUserBid ? player.bidCount : (player.bidCount || 0) + 1,
              hasUserBid: true,
              userBidAmount: bidAmount,
            }
          : player
      )
    );
  };

  // Filter players based on current filters
  const filteredPlayers = useMemo(() => {
    return filterPlayers(playersWithBids, filters);
  }, [playersWithBids, filters]);

  const hasActiveFilters = Boolean(filters.name || filters.race || filters.position || filters.skills.length > 0 || filters.minValue || filters.maxValue);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <Text style={[styles.title, { color: theme.text }]}>Player Pool</Text>
        <TouchableOpacity
          style={[styles.filterButton, { backgroundColor: theme.card, borderColor: theme.border }]}
          onPress={() => setFiltersVisible(true)}
        >
          <FontAwesome 
            name="filter" 
            size={18} 
            color={hasActiveFilters ? theme.accent : theme.text} 
          />
          {hasActiveFilters && (
            <View style={[styles.filterBadge, { backgroundColor: theme.accent }]}>
              <Text style={[styles.filterBadgeText, { color: theme.dominant }]}>
                {(() => {
                  const count = (filters.name ? 1 : 0) + 
                               (filters.race ? 1 : 0) + 
                               (filters.position ? 1 : 0) + 
                               (filters.skills.length > 0 ? 1 : 0) + 
                               ((filters.minValue || filters.maxValue) ? 1 : 0);
                  return String(count);
                })()}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      
      {/* Filter Status */}
      {hasActiveFilters && (
        <View style={[styles.filterStatus, { backgroundColor: theme.card }]}>
          <Text style={[styles.filterStatusText, { color: theme.textSecondary }]}>
            {`Showing ${filteredPlayers.length} of ${playersWithBids.length} players`}
          </Text>
        </View>
      )}

      {/* Player List */}
      {playersWithBids.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyStateText, { color: theme.textSecondary }]}>
            No players added yet.
          </Text>
        </View>
      ) : filteredPlayers.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyStateText, { color: theme.textSecondary }]}>
            No players match your filters.
          </Text>
          <Text style={[styles.emptyStateSubtext, { color: theme.textSecondary }]}>
            Try adjusting your search criteria.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredPlayers}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item }) => <PlayerCard player={item} onBid={handleBid} />}
          contentContainerStyle={styles.playerList}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Filters Sidebar */}
      <PlayerFilters
        filters={filters}
        onFiltersChange={setFilters}
        isVisible={filtersVisible}
        onToggle={() => setFiltersVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: PADDING.container,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    position: 'relative',
  },
  filterBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  filterStatus: {
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  filterStatusText: {
    fontSize: FONT_SIZES.checkboxLabel,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: PADDING.container,
  },
  emptyStateText: {
    fontSize: FONT_SIZES.skillCategoryTitle,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: FONT_SIZES.checkboxLabel,
    textAlign: 'center',
  },
  playerList: {
    paddingBottom: 16,
  },
});

export default PlayerPoolScreen; 