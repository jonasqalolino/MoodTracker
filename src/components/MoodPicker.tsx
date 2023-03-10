import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { MoodOptionType } from '../types';
import { theme } from '../theme';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const PressableAnimated = Animated.createAnimatedComponent(Pressable);

const moodOptions: MoodOptionType[] = [
  { emoji: '🧑‍💻', description: 'studious' },
  { emoji: '🤔', description: 'pensive' },
  { emoji: '😊', description: 'happy' },
  { emoji: '🥳', description: 'celebratory' },
  { emoji: '😤', description: 'frustrated' },
];

interface MoodPickerProps {
  handleSelectMood: (mood: MoodOptionType) => void;
}

const imageSrc = require('../../assets/butterflies.png');

export const MoodPicker = ({ handleSelectMood }: MoodPickerProps) => {
  const [selectedMood, setSelectedMood] = React.useState<MoodOptionType>();
  const [hasSelected, setHasSelected] = React.useState<boolean>(false);

  const styleButton = useAnimatedStyle(
    () => ({
      opacity: selectedMood ? withTiming(1) : withTiming(0.6),
      transform: [{ scale: selectedMood ? withTiming(1) : withTiming(0.9) }],
    }),
    [selectedMood],
  );

  const handleSelect = useCallback(() => {
    if (selectedMood) {
      handleSelectMood(selectedMood);
      setSelectedMood(undefined);
      setHasSelected(true);
    }
  }, [selectedMood, handleSelectMood]);

  return (
    <View style={styles.container}>
      {hasSelected ? (
        <View>
          <Image source={imageSrc} style={styles.image} />
          <Pressable
            onPress={() => setHasSelected(false)}
            style={styles.button}>
            <Text style={styles.buttonText}>Choose another!</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <Text style={styles.heading}>How are you right now?</Text>
          <View style={styles.moodList}>
            {moodOptions.map(option => (
              <View key={option.emoji}>
                <Pressable
                  onPress={() => setSelectedMood(option)}
                  key={option.emoji}
                  style={[
                    styles.moodItem,
                    option.emoji === selectedMood?.emoji
                      ? styles.selectedMoodItem
                      : undefined,
                  ]}>
                  <Text style={styles.moodText}>{option.emoji}</Text>
                </Pressable>
                <Text style={styles.descriptionText}>
                  {selectedMood?.emoji === option.emoji
                    ? option.description
                    : ' '}
                </Text>
              </View>
            ))}
          </View>
          <PressableAnimated
            style={[styles.button, styleButton]}
            onPress={handleSelect}>
            <Text style={styles.buttonText}>Choose</Text>
          </PressableAnimated>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  moodText: {
    fontSize: 24,
  },
  moodList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodItem: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 5,
  },
  selectedMoodItem: {
    borderWidth: 2,
    backgroundColor: theme.colorPurple,
    borderColor: theme.colorWhite,
  },
  descriptionText: {
    color: theme.colorPurple,
    fontSize: 10,
    textAlign: 'center',
    fontFamily: theme.fontFamilyBold,
  },
  container: {
    borderWidth: 2,
    borderColor: theme.colorPurple,
    margin: 10,
    borderRadius: 10,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: theme.fontFamilyBold,
    color: theme.colorWhite,
  },
  button: {
    backgroundColor: theme.colorPurple,
    width: 150,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: 'center',
    padding: 10,
  },
  buttonText: {
    color: theme.colorWhite,
    textAlign: 'center',
    fontFamily: theme.fontFamilyBold,
  },
  image: {
    alignSelf: 'center',
  },
});
