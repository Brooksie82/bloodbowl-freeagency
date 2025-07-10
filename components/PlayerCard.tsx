import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Player } from '../types/Player';
import { useTheme } from '../contexts/ThemeContext';
import { FONT_SIZES } from '../styles/typography';
import { PADDING } from '../styles/layout';
import { BUTTON_HEIGHT, BUTTON_BORDER_RADIUS, BUTTON_PADDING_HORIZONTAL, BUTTON_PADDING_VERTICAL } from '../styles/forms';
import BidModal from './BidModal';

interface PlayerCardProps {
  player: Player;
  onBid?: (playerId: string, bidAmount: number) => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, onBid }) => {
  const { theme } = useTheme();
  const [bidModalVisible, setBidModalVisible] = useState(false);

  const handleBid = () => {
    setBidModalVisible(true);
  };

  const handlePlaceBid = (playerId: string, bidAmount: number) => {
    if (onBid) {
      onBid(playerId, bidAmount);
    }
  };

  const getBidButtonText = () => {
    if (player.hasUserBid) {
      return player.userBidAmount ? `Update Bid (${player.userBidAmount})` : 'Update Bid';
    }
    return 'Place Bid';
  };

  const handleCloseModal = () => {
    setBidModalVisible(false);
  };

  return (
    <View style={[styles.playerCard, { backgroundColor: theme.card }]}>
      <View style={styles.header}>
        <Text style={[styles.playerName, { color: theme.accent }]}>{player.name}</Text>
        {player.bidCount !== undefined && player.bidCount > 0 && (
          <View style={[styles.bidCount, { backgroundColor: theme.accent }]}>
            <Text style={[styles.bidCountText, { color: theme.card }]}>{player.bidCount}</Text>
          </View>
        )}
      </View>
      
      <Text style={[styles.text, { color: theme.text }]}>{`Race: ${player.race}`}</Text>
      <Text style={[styles.text, { color: theme.text }]}>{`Position: ${player.position}`}</Text>
      <Text style={[styles.text, { color: theme.text }]}>{`Level: ${player.level}`}</Text>
      <Text style={[styles.text, { color: theme.text }]}>{`Skills: ${player.skills}`}</Text>
      <Text style={[styles.text, { color: theme.text }]}>{`Value: ${player.value}`}</Text>
      
      <TouchableOpacity
        style={[
          styles.bidButton,
          { 
            backgroundColor: player.hasUserBid ? theme.accent : theme.secondary,
            borderColor: theme.accent,
          }
        ]}
        onPress={handleBid}
      >
        <Text style={[styles.bidButtonText, { color: theme.card }]}>
          {getBidButtonText()}
        </Text>
      </TouchableOpacity>

      <BidModal
        visible={bidModalVisible}
        onClose={handleCloseModal}
        onPlaceBid={handlePlaceBid}
        playerName={player.name}
        playerId={player.name} // Using name as ID for now
        existingBid={player.userBidAmount}
        isUpdate={player.hasUserBid}
      />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  playerName: {
    fontWeight: 'bold',
    fontSize: FONT_SIZES.skillCategoryTitle,
    flex: 1,
  },
  bidCount: {
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  bidCountText: {
    fontSize: FONT_SIZES.checkboxLabel,
    fontWeight: 'bold',
  },
  text: {
    fontSize: FONT_SIZES.checkboxLabel,
  },
  bidButton: {
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_BORDER_RADIUS,
    paddingHorizontal: BUTTON_PADDING_HORIZONTAL,
    paddingVertical: BUTTON_PADDING_VERTICAL,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
  },
  bidButtonText: {
    fontSize: FONT_SIZES.checkboxLabel,
    fontWeight: 'bold',
  },
});

export default PlayerCard; 