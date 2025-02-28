import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import * as Haptics from 'expo-haptics';

interface NoteCardProps {
  note: {
    id: string;
    title: string;
    content: string;
    timestamp: number;
  };
}

export function NoteCard({ note }: NoteCardProps) {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate('EditNote', { noteId: note.id });
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {note.title || 'Untitled'}
        </Text>
        <Text style={[styles.preview, { color: colors.secondary }]} numberOfLines={2}>
          {note.content}
        </Text>
        <Text style={[styles.date, { color: colors.secondary }]}>
          {new Date(note.timestamp).toLocaleDateString()}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  preview: {
    fontSize: 14,
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
  },
});