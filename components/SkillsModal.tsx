import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Modal, TouchableOpacity, ScrollView, Animated } from 'react-native';
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
  const [slideAnim] = useState(new Animated.Value(0));
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (visible) {
      setHasInteracted(true);
      setIsAnimating(true);
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsAnimating(false);
      });
    } else if (hasInteracted) {
      setIsAnimating(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsAnimating(false);
      });
    }
    // Only run when visible changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      // Remove skill if already selected
      onSkillsChange(selectedSkills.filter((s) => s !== skill));
    } else {
      // Add skill only if under the 6-skill limit
      if (selectedSkills.length < 6) {
        onSkillsChange([...selectedSkills, skill]);
      }
    }
  };

  const slideInTransform = {
    transform: [
      {
        translateX: slideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [400, 0],
        }),
      },
    ],
  };

  // Only render if visible or animating and hasInteracted
  if (!(hasInteracted && (visible || isAnimating))) return null;

  return (
    <View style={styles.overlay}>
      <Animated.View style={[styles.sidebar, { backgroundColor: theme.background }, slideInTransform]}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: theme.border }]}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <FontAwesome name="arrow-left" size={20} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Select Skills</Text>
          <Text style={[styles.skillCount, { color: selectedSkills.length >= 6 ? theme.error : theme.textSecondary }]}>
            {selectedSkills.length}/6
          </Text>
        </View>

        {/* Skills Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {SKILL_CATEGORIES.map((cat) => (
            <View key={cat.category} style={styles.skillCategory}>
              <Text style={[styles.skillCategoryTitle, { color: theme.accent }]}>{cat.category}</Text>
              {cat.skills.map((skill) => {
                const isSelected = selectedSkills.includes(skill);
                const isDisabled = !isSelected && selectedSkills.length >= 6;
                
                return (
                  <TouchableOpacity
                    key={skill}
                    style={[styles.checkboxRow, isDisabled && styles.disabledRow]}
                    onPress={() => handleSkillToggle(skill)}
                    disabled={isDisabled}
                  >
                    <View style={[styles.checkbox, { 
                      borderColor: isDisabled ? theme.border : theme.accent, 
                      backgroundColor: theme.card 
                    }]}>
                      {isSelected && (
                        <FontAwesome name="check" size={CHECKBOX_SIZE - 10} color={theme.accent} />
                      )}
                    </View>
                    <Text style={[styles.checkboxLabel, { 
                      color: isDisabled ? theme.textSecondary : theme.text 
                    }]}>{skill}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%', // changed from '85%'
    height: '100%',
    // Remove boxShadow and borderRadius for full screen
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: PADDING.container,
    paddingTop: PADDING.modalTop,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: FONT_SIZES.modalTitle,
    fontWeight: 'bold',
    flex: 1,
  },
  skillCount: {
    fontSize: FONT_SIZES.modalTitle,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: PADDING.container,
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
  disabledRow: {
    opacity: 0.5,
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