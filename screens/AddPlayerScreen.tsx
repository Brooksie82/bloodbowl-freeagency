import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Player } from '../types/Player';
import { colors } from '../styles/colors';

interface AddPlayerScreenProps {
  onAddPlayer: (player: Player) => void;
}

const AddPlayerScreen: React.FC<AddPlayerScreenProps> = ({ onAddPlayer }) => {
  const [name, setName] = useState('');
  const [race, setRace] = useState('');
  const [position, setPosition] = useState('');
  const [level, setLevel] = useState('');
  const [skills, setSkills] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (!name || !race || !position || !level || !skills || !value) return;
    onAddPlayer({ name, race, position, level, skills, value });
    setName('');
    setRace('');
    setPosition('');
    setLevel('');
    setSkills('');
    setValue('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Player</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} placeholderTextColor={colors.text} />
      <TextInput style={styles.input} placeholder="Race" value={race} onChangeText={setRace} placeholderTextColor={colors.text} />
      <TextInput style={styles.input} placeholder="Position" value={position} onChangeText={setPosition} placeholderTextColor={colors.text} />
      <TextInput style={styles.input} placeholder="Level" value={level} onChangeText={setLevel} placeholderTextColor={colors.text} />
      <TextInput style={styles.input} placeholder="Skills" value={skills} onChangeText={setSkills} placeholderTextColor={colors.text} />
      <TextInput style={styles.input} placeholder="Value" value={value} onChangeText={setValue} keyboardType="numeric" placeholderTextColor={colors.text} />
      <Button title="Add Player" onPress={handleSubmit} color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.text,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    padding: 8,
    marginBottom: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.card,
  },
});

export default AddPlayerScreen; 