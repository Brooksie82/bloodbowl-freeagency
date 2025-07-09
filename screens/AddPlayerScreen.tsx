import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { Player } from '../types/Player';
import { useTheme } from '../contexts/ThemeContext';
import { Picker } from '@react-native-picker/picker';
import { BLOOD_BOWL_RACES, RACE_POSITIONS } from '../types/races';
import SkillsModal from '../components/SkillsModal';
import { FONT_SIZES } from '../styles/typography';
import { PADDING } from '../styles/layout';

interface AddPlayerScreenProps {
  onAddPlayer: (player: Player) => void;
}

const AddPlayerScreen: React.FC<AddPlayerScreenProps> = ({ onAddPlayer }) => {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [race, setRace] = useState(BLOOD_BOWL_RACES[0]);
  const [position, setPosition] = useState(RACE_POSITIONS[BLOOD_BOWL_RACES[0]][0]);
  const [level, setLevel] = useState('1');
  const [skills, setSkills] = useState<string[]>([]);
  const [value, setValue] = useState('');
  const [skillsModalVisible, setSkillsModalVisible] = useState(false);

  // Update position options when race changes
  const positionOptions = useMemo(() => RACE_POSITIONS[race] || [], [race]);

  // When race changes, reset position to first available
  React.useEffect(() => {
    setPosition(positionOptions[0] || '');
  }, [race]);

  // Only allow level 1-7
  const handleLevelChange = (text: string) => {
    let numeric = text.replace(/[^0-9]/g, '');
    if (numeric.length > 0) {
      let num = Math.max(1, Math.min(7, parseInt(numeric, 10)));
      setLevel(num.toString());
    } else {
      setLevel('');
    }
  };

  const handleSubmit = () => {
    if (!name || !race || !position || !level || !value) return;
    onAddPlayer({ name, race, position, level, skills: skills.join(', '), value });
    setName('');
    setRace(BLOOD_BOWL_RACES[0]);
    setPosition(RACE_POSITIONS[BLOOD_BOWL_RACES[0]][0]);
    setLevel('1');
    setSkills([]);
    setValue('');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Add Player</Text>
      <TextInput 
        style={[styles.input, { 
          backgroundColor: theme.card, 
          borderColor: theme.border, 
          color: theme.text 
        }]} 
        placeholder="Name" 
        value={name} 
        onChangeText={setName} 
        placeholderTextColor={theme.textSecondary} 
      />
      <View style={[styles.pickerWrapper, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Picker
          selectedValue={race}
          onValueChange={setRace}
          style={[styles.picker, { color: theme.text }]}
          itemStyle={[styles.pickerItem, { color: theme.text }]}
        >
          {BLOOD_BOWL_RACES.map((r) => (
            <Picker.Item label={r} value={r} key={r} />
          ))}
        </Picker>
      </View>
      <View style={[styles.pickerWrapper, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Picker
          selectedValue={position}
          onValueChange={setPosition}
          style={[styles.picker, { color: theme.text }]}
          itemStyle={[styles.pickerItem, { color: theme.text }]}
        >
          {positionOptions.map((p) => (
            <Picker.Item label={p} value={p} key={p} />
          ))}
        </Picker>
      </View>
      <TextInput
        style={[styles.input, { 
          backgroundColor: theme.card, 
          borderColor: theme.border, 
          color: theme.text 
        }]}
        placeholder="Level (1-7)"
        value={level}
        onChangeText={handleLevelChange}
        placeholderTextColor={theme.textSecondary}
        keyboardType="numeric"
        maxLength={1}
      />
      <TouchableOpacity 
        style={[styles.input, { 
          backgroundColor: theme.card, 
          borderColor: theme.border 
        }]} 
        onPress={() => setSkillsModalVisible(true)}
      >
        <Text style={{ color: skills.length ? theme.text : theme.textSecondary }}>
          {skills.length ? skills.join(', ') : 'Select Skills'}
        </Text>
      </TouchableOpacity>
      <TextInput 
        style={[styles.input, { 
          backgroundColor: theme.card, 
          borderColor: theme.border, 
          color: theme.text 
        }]} 
        placeholder="Value" 
        value={value} 
        onChangeText={setValue} 
        keyboardType="numeric" 
        placeholderTextColor={theme.textSecondary} 
      />
      <Button title="Add Player" onPress={handleSubmit} color={theme.accent} />

      <SkillsModal
        visible={skillsModalVisible}
        selectedSkills={skills}
        onSkillsChange={setSkills}
        onClose={() => setSkillsModalVisible(false)}
      />
    </View>
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
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 6,
    padding: PADDING.input,
    marginBottom: 12,
    fontSize: FONT_SIZES.input,
  },
  pickerWrapper: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 12,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
  },
  pickerItem: {
    fontSize: FONT_SIZES.input,
  },
});

export default AddPlayerScreen; 