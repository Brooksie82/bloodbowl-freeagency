import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Modal, Animated } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { FONT_SIZES } from '../styles/typography';
import { PADDING } from '../styles/layout';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { BLOOD_BOWL_RACES, RACE_POSITIONS } from '../types/races';
import { SKILL_CATEGORIES } from '../types/skills';
import { Picker } from '@react-native-picker/picker';

export interface PlayerFilters {
  name: string;
  race: string;
  position: string;
  skills: string[];
  minValue: string;
  maxValue: string;
}

interface PlayerFiltersProps {
  filters: PlayerFilters;
  onFiltersChange: (filters: PlayerFilters) => void;
  isVisible: boolean;
  onToggle: () => void;
}

const PlayerFilters: React.FC<PlayerFiltersProps> = ({
  filters,
  onFiltersChange,
  isVisible,
  onToggle,
}) => {
  const { theme } = useTheme();
  const [skillsModalVisible, setSkillsModalVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(0));
  const [skillsSlideAnim] = useState(new Animated.Value(0));
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSkillsAnimating, setIsSkillsAnimating] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  React.useEffect(() => {
    if (isVisible) {
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
    // Only run when isVisible changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  React.useEffect(() => {
    if (skillsModalVisible) {
      setIsSkillsAnimating(true);
      Animated.timing(skillsSlideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsSkillsAnimating(false);
      });
    } else {
      setIsSkillsAnimating(true);
      Animated.timing(skillsSlideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsSkillsAnimating(false);
      });
    }
  }, [skillsModalVisible, skillsSlideAnim]);

  const updateFilter = (key: keyof PlayerFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      name: '',
      race: '',
      position: '',
      skills: [],
      minValue: '',
      maxValue: '',
    });
  };

  const hasActiveFilters = filters.name || filters.race || filters.position || filters.skills.length > 0 || filters.minValue || filters.maxValue;

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

  const skillsSlideInTransform = {
    transform: [
      {
        translateX: skillsSlideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [400, 0],
        }),
      },
    ],
  };

  // Only render if visible or animating and hasInteracted
  if (!(hasInteracted && (isVisible || isAnimating))) return null;

  return (
    <View style={styles.overlay}>
      <Animated.View style={[styles.sidebar, { backgroundColor: theme.background }, slideInTransform]}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: theme.border }]}>
          <TouchableOpacity onPress={onToggle} style={styles.backButton}>
            <FontAwesome name="arrow-left" size={20} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Filters</Text>
          {hasActiveFilters && (
            <TouchableOpacity onPress={clearFilters} style={styles.clearButton}>
              <FontAwesome name="times" size={16} color={theme.accent} />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Name Filter */}
          <View style={styles.filterSection}>
            <Text style={[styles.filterLabel, { color: theme.text }]}>Player Name</Text>
            <TextInput
              style={[styles.textInput, { 
                backgroundColor: theme.card, 
                borderColor: theme.border, 
                color: theme.text 
              }]}
              placeholder="Search by name..."
              value={filters.name}
              onChangeText={(text) => updateFilter('name', text)}
              placeholderTextColor={theme.textSecondary}
            />
          </View>

          {/* Race Filter */}
          <View style={styles.filterSection}>
            <Text style={[styles.filterLabel, { color: theme.text }]}>Race</Text>
            <View style={[styles.pickerContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <Picker
                selectedValue={filters.race}
                onValueChange={(value) => updateFilter('race', value)}
                style={[styles.picker, { color: theme.text }]}
              >
                <Picker.Item label="All Races" value="" />
                {BLOOD_BOWL_RACES.map((race) => (
                  <Picker.Item key={race} label={race} value={race} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Position Filter */}
          <View style={styles.filterSection}>
            <Text style={[styles.filterLabel, { color: theme.text }]}>Position</Text>
            <View style={[styles.pickerContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <Picker
                selectedValue={filters.position}
                onValueChange={(value) => updateFilter('position', value)}
                style={[styles.picker, { color: theme.text }]}
              >
                <Picker.Item label="All Positions" value="" />
                {(() => {
                  const positions = filters.race && RACE_POSITIONS[filters.race] 
                    ? RACE_POSITIONS[filters.race]
                    : Object.values(RACE_POSITIONS).flat().filter((pos, index, arr) => arr.indexOf(pos) === index);
                  return positions.map((pos) => (
                    <Picker.Item key={pos} label={pos} value={pos} />
                  ));
                })()}
              </Picker>
            </View>
          </View>

          {/* Skills Filter */}
          <View style={styles.filterSection}>
            <Text style={[styles.filterLabel, { color: theme.text }]}>Skills</Text>
            <TouchableOpacity
              style={[styles.skillsButton, { 
                backgroundColor: theme.card, 
                borderColor: theme.border 
              }]}
              onPress={() => setSkillsModalVisible(true)}
            >
              <Text style={[styles.skillsButtonText, { color: filters.skills.length ? theme.text : theme.textSecondary }]}>
                {filters.skills.length > 0 ? `${filters.skills.length} skill(s) selected` : 'Select skills...'}
              </Text>
              <FontAwesome name="chevron-right" size={14} color={theme.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Value Range Filter */}
          <View style={styles.filterSection}>
            <Text style={[styles.filterLabel, { color: theme.text }]}>Value Range</Text>
            <View style={styles.valueRangeContainer}>
              <TextInput
                style={[styles.valueInput, { 
                  backgroundColor: theme.card, 
                  borderColor: theme.border, 
                  color: theme.text 
                }]}
                placeholder="Min"
                value={filters.minValue}
                onChangeText={(text) => updateFilter('minValue', text.replace(/[^0-9]/g, ''))}
                keyboardType="numeric"
                placeholderTextColor={theme.textSecondary}
              />
              <Text style={[styles.valueRangeSeparator, { color: theme.textSecondary }]}>{"-"}</Text>
              <TextInput
                style={[styles.valueInput, { 
                  backgroundColor: theme.card, 
                  borderColor: theme.border, 
                  color: theme.text 
                }]}
                placeholder="Max"
                value={filters.maxValue}
                onChangeText={(text) => updateFilter('maxValue', text.replace(/[^0-9]/g, ''))}
                keyboardType="numeric"
                placeholderTextColor={theme.textSecondary}
              />
            </View>
          </View>

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <View style={[styles.activeFiltersSection, { backgroundColor: theme.card }]}>
              <Text style={[styles.activeFiltersTitle, { color: theme.text }]}>Active Filters</Text>
              <View style={styles.activeFiltersList}>
                {filters.name && (
                  <View style={[styles.activeFilterTag, { backgroundColor: theme.accent }]}>
                    <Text style={[styles.activeFilterText, { color: theme.dominant }]}>{`Name: ${filters.name}`}</Text>
                  </View>
                )}
                {filters.race && (
                  <View style={[styles.activeFilterTag, { backgroundColor: theme.accent }]}>
                    <Text style={[styles.activeFilterText, { color: theme.dominant }]}>{`Race: ${filters.race}`}</Text>
                  </View>
                )}
                {filters.position && (
                  <View style={[styles.activeFilterTag, { backgroundColor: theme.accent }]}>
                    <Text style={[styles.activeFilterText, { color: theme.dominant }]}>{`Position: ${filters.position}`}</Text>
                  </View>
                )}
                {filters.skills.length > 0 && (
                  <View style={[styles.activeFilterTag, { backgroundColor: theme.accent }]}>
                    <Text style={[styles.activeFilterText, { color: theme.dominant }]}>{`Skills: ${filters.skills.length}`}</Text>
                  </View>
                )}
                {(filters.minValue || filters.maxValue) && (
                  <View style={[styles.activeFilterTag, { backgroundColor: theme.accent }]}>
                    <Text style={[styles.activeFilterText, { color: theme.dominant }]}>
                      {`Value: ${filters.minValue || '0'} - ${filters.maxValue || '∞'}`}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}
        </ScrollView>
      </Animated.View>

      {/* Skills Modal */}
      {(skillsModalVisible || isSkillsAnimating) && (
        <View style={styles.overlay}>
          <Animated.View style={[styles.sidebar, { backgroundColor: theme.background }, skillsSlideInTransform]}>
            <View style={[styles.modalHeader, { borderBottomColor: theme.border }]}>
              <TouchableOpacity onPress={() => setSkillsModalVisible(false)} style={styles.modalBackButton}>
                <FontAwesome name="arrow-left" size={20} color={theme.text} />
              </TouchableOpacity>
              <Text style={[styles.modalTitle, { color: theme.text }]}>Select Skills</Text>
            </View>
            <ScrollView style={styles.skillsList}>
              {SKILL_CATEGORIES.map((cat) => (
                <View key={cat.category} style={styles.skillCategory}>
                  <Text style={[styles.skillCategoryTitle, { color: theme.accent }]}>{cat.category}</Text>
                  {cat.skills.map((skill) => (
                    <TouchableOpacity
                      key={skill}
                      style={styles.skillOption}
                      onPress={() => {
                        const newSkills = filters.skills.includes(skill)
                          ? filters.skills.filter(s => s !== skill)
                          : [...filters.skills, skill];
                        updateFilter('skills', newSkills);
                      }}
                    >
                      <View style={[styles.skillCheckbox, { 
                        borderColor: theme.accent, 
                        backgroundColor: theme.card 
                      }]}>
                        {filters.skills.includes(skill) && (
                          <FontAwesome name="check" size={12} color={theme.accent} />
                        )}
                      </View>
                      <Text style={[styles.skillLabel, { color: theme.text }]}>{skill}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </ScrollView>
          </Animated.View>
        </View>
      )}
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
    width: '85%',
    height: '100%',
    boxShadow: '-2px 0 3.84px rgba(0, 0, 0, 0.25)',
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
  clearButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: PADDING.container,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterLabel: {
    fontSize: FONT_SIZES.skillCategoryTitle,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: PADDING.input,
    fontSize: FONT_SIZES.input,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    fontSize: FONT_SIZES.input,
  },
  skillsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 8,
    padding: PADDING.input,
  },
  skillsButtonText: {
    fontSize: FONT_SIZES.input,
  },
  valueRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: PADDING.input,
    fontSize: FONT_SIZES.input,
    textAlign: 'center',
  },
  valueRangeSeparator: {
    fontSize: FONT_SIZES.checkboxLabel,
    marginHorizontal: 12,
  },
  activeFiltersSection: {
    marginTop: 16,
    padding: PADDING.card,
    borderRadius: 8,
  },
  activeFiltersTitle: {
    fontSize: FONT_SIZES.checkboxLabel,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  activeFiltersList: {
    // gap replaced with marginBottom on individual items
  },
  activeFilterTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  activeFilterText: {
    fontSize: 12,
    fontWeight: '500',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: PADDING.container,
    paddingTop: PADDING.modalTop,
    borderBottomWidth: 1,
  },
  modalBackButton: {
    padding: 8,
    marginRight: 16,
  },
  modalTitle: {
    fontSize: FONT_SIZES.modalTitle,
    fontWeight: 'bold',
  },
  skillsList: {
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
  skillOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  skillCheckbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skillLabel: {
    fontSize: FONT_SIZES.checkboxLabel,
  },
});

export default PlayerFilters; 