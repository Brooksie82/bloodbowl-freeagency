import React from 'react';
import { View, Text, StyleSheet, Button, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { SKILL_CATEGORIES } from '../types/skills';
import { CHECKBOX_SIZE } from '../styles/forms';
import { FONT_SIZES } from '../styles/typography';
import { PADDING } from '../styles/layout';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface SkillsModalProps {
  visible: boolean;
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
  onClose: () => void;
}

const SkillsModal: React.FC<SkillsModalProps> = ({
  visible,
  selectedSkills,
  onSkillsChange,
  onClose,
}) => {
  const { theme } = useTheme();

  const handleSkillToggle = (skill: string) => {
    onSkillsChange(
      selectedSkills.includes(skill)
        ? selectedSkills.filter((s) => s !== skill)
        : [...selectedSkills, skill]
    );
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={[styles.modalContainer, { backgroundColor: theme.background }]}>
        <Text style={[styles.modalTitle, { color: theme.text }]}>Select Skills</Text>
        <ScrollView>
          {SKILL_CATEGORIES.map((cat) => (
            <View key={cat.category} style={styles.skillCategory}>
              <Text style={[styles.skillCategoryTitle, { color: theme.accent }]}>{cat.category}</Text>
              {cat.skills.map((skill) => (
                <TouchableOpacity
                  key={skill}
                  style={styles.checkboxRow}
                  onPress={() => handleSkillToggle(skill)}
                >
                  <View style={[styles.checkbox, { 
                    borderColor: theme.accent, 
                    backgroundColor: theme.card 
                  }]}>
                    {selectedSkills.includes(skill) && (
                      <FontAwesome name="check" size={CHECKBOX_SIZE - 10} color={theme.accent} />
                    )}
                  </View>
                  <Text style={[styles.checkboxLabel, { color: theme.text }]}>{skill}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>
        <Button title="Done" onPress={onClose} color={theme.accent} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: PADDING.modal,
    paddingTop: PADDING.modalTop,
  },
  modalTitle: {
    fontSize: FONT_SIZES.modalTitle,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  skillCategory: {
    marginBottom: 24,
  },
  skillCategoryTitle: {
    fontSize: FONT_SIZES.skillCategoryTitle,
    fontWeight: 'bold',
    marginBottom: 8,
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
    borderRadius: 4,
    marginRight: PADDING.checkbox,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxLabel: {
    fontSize: FONT_SIZES.checkboxLabel,
  },
});

export default SkillsModal; 