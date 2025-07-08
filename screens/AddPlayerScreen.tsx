import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Player } from '../types/Player';
import { colors } from '../styles/colors';
import { Picker } from '@react-native-picker/picker';
import { BLOOD_BOWL_RACES, RACE_POSITIONS } from '../types/races';
import { SKILL_CATEGORIES } from '../types/skills';

interface AddPlayerScreenProps {
  onAddPlayer: (player: Player) => void;
}

const AddPlayerScreen: React.FC<AddPlayerScreenProps> = ({ onAddPlayer }) => {
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

  const handleSkillToggle = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
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
    <View style={styles.container}>
      <Text style={styles.title}>Add Player</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} placeholderTextColor={colors.text} />
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={race}
          onValueChange={setRace}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          {BLOOD_BOWL_RACES.map((r) => (
            <Picker.Item label={r} value={r} key={r} />
          ))}
        </Picker>
      </View>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={position}
          onValueChange={setPosition}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          {positionOptions.map((p) => (
            <Picker.Item label={p} value={p} key={p} />
          ))}
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Level (1-7)"
        value={level}
        onChangeText={handleLevelChange}
        placeholderTextColor={colors.text}
        keyboardType="numeric"
        maxLength={1}
      />
      <TouchableOpacity style={styles.input} onPress={() => setSkillsModalVisible(true)}>
        <Text style={{ color: skills.length ? colors.text : colors.border }}>
          {skills.length ? skills.join(', ') : 'Select Skills'}
        </Text>
      </TouchableOpacity>
      <TextInput style={styles.input} placeholder="Value" value={value} onChangeText={setValue} keyboardType="numeric" placeholderTextColor={colors.text} />
      <Button title="Add Player" onPress={handleSubmit} color={colors.primary} />

      <Modal visible={skillsModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Skills</Text>
          <ScrollView>
            {SKILL_CATEGORIES.map((cat) => (
              <View key={cat.category} style={styles.skillCategory}>
                <Text style={styles.skillCategoryTitle}>{cat.category}</Text>
                {cat.skills.map((skill) => (
                  <TouchableOpacity
                    key={skill}
                    style={styles.checkboxRow}
                    onPress={() => handleSkillToggle(skill)}
                  >
                    <View style={styles.checkbox}>
                      {skills.includes(skill) && <View style={styles.checkboxChecked} />}
                    </View>
                    <Text style={styles.checkboxLabel}>{skill}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </ScrollView>
          <Button title="Done" onPress={() => setSkillsModalVisible(false)} color={colors.primary} />
        </View>
      </Modal>
    </View>
  );
};

const CHECKBOX_SIZE = 22;

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
  pickerWrapper: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    marginBottom: 12,
    backgroundColor: colors.card,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    color: colors.text,
    backgroundColor: colors.card,
  },
  pickerItem: {
    color: colors.text,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    paddingTop: 48,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: colors.text,
    textAlign: 'center',
  },
  skillCategory: {
    marginBottom: 24,
  },
  skillCategoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.primary,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    width: CHECKBOX_SIZE,
    height: CHECKBOX_SIZE,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 4,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
  },
  checkboxChecked: {
    width: CHECKBOX_SIZE - 8,
    height: CHECKBOX_SIZE - 8,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  checkboxLabel: {
    fontSize: 16,
    color: colors.text,
  },
});

export default AddPlayerScreen; 