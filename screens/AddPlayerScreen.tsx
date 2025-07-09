import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Player } from '../types/Player';
import { useTheme } from '../contexts/ThemeContext';
import { Picker } from '@react-native-picker/picker';
import { BLOOD_BOWL_RACES, RACE_POSITIONS } from '../types/races';
import SkillsModal from '../components/SkillsModal';
import { FONT_SIZES } from '../styles/typography';
import { PADDING } from '../styles/layout';
import { BUTTON_HEIGHT, BUTTON_BORDER_RADIUS, BUTTON_PADDING_HORIZONTAL, BUTTON_PADDING_VERTICAL } from '../styles/forms';

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

  const positionOptions = useMemo(() => RACE_POSITIONS[race] || [], [race]);

  React.useEffect(() => {
    setPosition(positionOptions[0] || '');
  }, [race]);

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
    <View style={[styles.screen, { backgroundColor: theme.background }]}> 
      <View style={[styles.card, {
        backgroundColor: theme.card,
        shadowColor: theme.dominant,
      }]}> 
        <Text style={[styles.title, { color: theme.accent }]}>Add Player</Text>
        <TextInput 
          style={[styles.input, { backgroundColor: theme.background, borderColor: theme.border, color: theme.text }]} 
          placeholder="Name" 
          value={name} 
          onChangeText={setName} 
          placeholderTextColor={theme.textSecondary} 
        />
        <View style={[styles.pickerWrapper, { backgroundColor: theme.background, borderColor: theme.border }]}> 
          <Picker
            selectedValue={race}
            onValueChange={setRace}
            style={[styles.picker, { color: theme.text }]}
            itemStyle={[styles.pickerItem, { color: theme.text }]}
            dropdownIconColor={theme.accent}
          >
            {BLOOD_BOWL_RACES.map((r) => (
              <Picker.Item key={r} label={r} value={r} />
            ))}
          </Picker>
        </View>
        <View style={[styles.pickerWrapper, { backgroundColor: theme.background, borderColor: theme.border }]}> 
          <Picker
            selectedValue={position}
            onValueChange={setPosition}
            style={[styles.picker, { color: theme.text }]}
            itemStyle={[styles.pickerItem, { color: theme.text }]}
            dropdownIconColor={theme.accent}
          >
            {positionOptions.map((p) => (
              <Picker.Item key={p} label={p} value={p} />
            ))}
          </Picker>
        </View>
        <TextInput
          style={[styles.input, { backgroundColor: theme.background, borderColor: theme.border, color: theme.text }]}
          placeholder="Level (1-7)"
          value={level}
          onChangeText={handleLevelChange}
          placeholderTextColor={theme.textSecondary}
          keyboardType="numeric"
          maxLength={1}
        />
        <TouchableOpacity 
          style={[styles.input, styles.skillsInput, { backgroundColor: theme.background, borderColor: theme.border }]} 
          onPress={() => setSkillsModalVisible(true)}
        >
          <Text style={{ color: skills.length ? theme.text : theme.textSecondary }}>
            {skills.length ? skills.join(', ') : 'Select Skills'}
          </Text>
        </TouchableOpacity>
        <TextInput 
          style={[styles.input, { backgroundColor: theme.background, borderColor: theme.border, color: theme.text }]} 
          placeholder="Value" 
          value={value} 
          onChangeText={setValue} 
          keyboardType="numeric" 
          placeholderTextColor={theme.textSecondary} 
        />
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: theme.accent }]}
          onPress={handleSubmit}
          activeOpacity={0.85}
        >
          <Text style={[styles.addButtonText, { color: theme.card }]}>Add Player</Text>
        </TouchableOpacity>
        <SkillsModal
          visible={skillsModalVisible}
          selectedSkills={skills}
          onSkillsChange={setSkills}
          onClose={() => setSkillsModalVisible(false)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 24,
    padding: 28,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    marginBottom: 24,
    letterSpacing: 1,
  },
  input: {
    width: '100%',
    borderWidth: 1.5,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 18,
    fontSize: FONT_SIZES.input,
    backgroundColor: '#fff',
  },
  skillsInput: {
    justifyContent: 'center',
  },
  pickerWrapper: {
    width: '100%',
    borderWidth: 1.5,
    borderRadius: 16,
    marginBottom: 18,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  picker: {
    width: '100%',
    height: 48,
  },
  pickerItem: {
    fontSize: FONT_SIZES.input,
  },
  addButton: {
    width: '100%',
    height: BUTTON_HEIGHT + 8,
    borderRadius: BUTTON_BORDER_RADIUS * 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonText: {
    fontSize: FONT_SIZES.input,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default AddPlayerScreen; 