import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  useColorScheme,
} from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  FadeInRight,
  FadeOutLeft,
} from 'react-native-reanimated';

type Note = {
  id: string;
  title: string;
  content: string;
  date: string;
};

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const colorScheme = useColorScheme();

  const isDark = colorScheme === 'dark';

  const renderNote = useCallback(({ item }: { item: Note }) => (
    <Animated.View
      entering={FadeInRight}
      exiting={FadeOutLeft}
      style={[
        styles.noteCard,
        {
          backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
        },
      ]}
    >
      <Link href={`/note/${item.id}`} asChild>
        <TouchableOpacity style={styles.noteContent}>
          <Text
            style={[
              styles.noteTitle,
              { color: isDark ? '#ffffff' : '#000000' },
            ]}
          >
            {item.title}
          </Text>
          <Text
            style={[
              styles.notePreview,
              { color: isDark ? '#cccccc' : '#666666' },
            ]}
            numberOfLines={2}
          >
            {item.content}
          </Text>
          <Text
            style={[
              styles.noteDate,
              { color: isDark ? '#888888' : '#999999' },
            ]}
          >
            {item.date}
          </Text>
        </TouchableOpacity>
      </Link>
    </Animated.View>
  ), [isDark]);

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}>
      <FlatList
        data={notes}
        renderItem={renderNote}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.notesList}
      />
      <Link href="/new" asChild>
        <TouchableOpacity
          style={[
            styles.fab,
            { backgroundColor: '#228BE6' },
          ]}
        >
          <Ionicons name="add" size={24} color="#ffffff" />
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notesList: {
    padding: 16,
  },
  noteCard: {
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  noteContent: {
    padding: 16,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  notePreview: {
    fontSize: 14,
    marginBottom: 8,
  },
  noteDate: {
    fontSize: 12,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});