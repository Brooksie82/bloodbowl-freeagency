import React from 'react';
import { View, Text, StyleSheet, Button, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '../styles/colors';
import { SKILL_CATEGORIES } from '../types/skills';
import { CHECKBOX_SIZE } from '../styles/forms';
import { FONT_SIZES } from '../styles/typography';
import { PADDING } from '../styles/layout';

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
  const handleSkillToggle = (skill: string) => {
    onSkillsChange(
      selectedSkills.includes(skill)
        ? selectedSkills.filter((s) => s !== skill)
        : [...selectedSkills, skill]
    );
  };

  return (
    <Modal visible={visible} animationType="slide">
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
                    {selectedSkills.includes(skill) && <View style={styles.checkboxChecked} />}
                  </View>
                  <Text style={styles.checkboxLabel}>{skill}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>
        <Button title="Done" onPress={onClose} color={colors.primary} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
    padding: PADDING.modal,
    paddingTop: PADDING.modalTop,
  },
  modalTitle: {
    fontSize: FONT_SIZES.modalTitle,
    fontWeight: 'bold',
    marginBottom: 24,
    color: colors.text,
    textAlign: 'center',
  },
  skillCategory: {
    marginBottom: 24,
  },
  skillCategoryTitle: {
    fontSize: FONT_SIZES.skillCategoryTitle,
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
    marginRight: PADDING.checkbox,
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
    fontSize: FONT_SIZES.checkboxLabel,
    color: colors.text,
  },
});

export default SkillsModal; 