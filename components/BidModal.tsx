import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { FONT_SIZES } from '../styles/typography';
import { PADDING } from '../styles/layout';
import { BUTTON_HEIGHT, BUTTON_BORDER_RADIUS, BUTTON_PADDING_HORIZONTAL, BUTTON_PADDING_VERTICAL } from '../styles/forms';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface BidModalProps {
  visible: boolean;
  onClose: () => void;
  onPlaceBid: (playerId: string, bidAmount: number) => void;
  playerName: string;
  playerId: string;
  existingBid?: number;
  isUpdate?: boolean;
}

const BidModal: React.FC<BidModalProps> = ({
  visible,
  onClose,
  onPlaceBid,
  playerName,
  playerId,
  existingBid,
  isUpdate = false,
}) => {
  const { theme } = useTheme();
  const [bidAmount, setBidAmount] = useState(existingBid ? existingBid.toString() : '');

  const handlePlaceBid = () => {
    const amount = parseFloat(bidAmount);
    
    if (isNaN(amount) || amount < 0) {
      Alert.alert('Invalid Bid', 'Please enter a valid bid amount (minimum 0).');
      return;
    }

    onPlaceBid(playerId, amount);
    setBidAmount('');
    onClose();
  };

  const handleCancel = () => {
    setBidAmount(existingBid ? existingBid.toString() : '');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleCancel}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={[styles.modalContainer, { backgroundColor: theme.background }]}>
          <View style={[styles.header, { borderBottomColor: theme.border }]}>
            <Text style={[styles.title, { color: theme.text }]}>
              {isUpdate ? 'Update Bid' : 'Place Bid'}
            </Text>
            <TouchableOpacity onPress={handleCancel} style={styles.closeButton}>
              <FontAwesome name="times" size={20} color={theme.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <Text style={[styles.playerName, { color: theme.accent }]}>
              {playerName}
            </Text>
            
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: theme.text }]}>
                Maximum Bid
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                    color: theme.text,
                  },
                ]}
                value={bidAmount}
                onChangeText={setBidAmount}
                placeholder={isUpdate ? "Update bid amount" : "Enter bid amount"}
                placeholderTextColor={theme.textSecondary}
                keyboardType="numeric"
                autoFocus
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.cancelButton,
                  { borderColor: theme.border },
                ]}
                onPress={handleCancel}
              >
                <Text style={[styles.buttonText, { color: theme.text }]}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  styles.placeBidButton,
                  { backgroundColor: theme.accent },
                ]}
                onPress={handlePlaceBid}
              >
                <Text style={[styles.buttonText, { color: theme.card }]}>
                  {isUpdate ? 'Update Bid' : 'Place Bid'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxWidth: 400,
    borderRadius: 12,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: PADDING.container,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: FONT_SIZES.modalTitle,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  content: {
    padding: PADDING.container,
  },
  playerName: {
    fontSize: FONT_SIZES.skillCategoryTitle,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: FONT_SIZES.checkboxLabel,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    height: BUTTON_HEIGHT,
    borderWidth: 1,
    borderRadius: BUTTON_BORDER_RADIUS,
    paddingHorizontal: BUTTON_PADDING_HORIZONTAL,
    fontSize: FONT_SIZES.checkboxLabel,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_BORDER_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  cancelButton: {
    backgroundColor: 'transparent',
  },
  placeBidButton: {
    borderWidth: 0,
  },
  buttonText: {
    fontSize: FONT_SIZES.checkboxLabel,
    fontWeight: 'bold',
  },
});

export default BidModal; 