import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { NoteCard } from '../components/NoteCard';
import { SearchBar } from '../components/SearchBar';
import { useNotes } from '../context/NotesContext';
import { useTheme } from '../context/ThemeContext';
import * as Haptics from 'expo-haptics';

export function HomeScreen() {
  const { notes } = useNotes();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddNote = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('EditNote', { noteId: null });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      <FlatList
        data={filteredNotes}
        renderItem={({ item }) => <NoteCard note={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.notesList}
      />
      <Pressable
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={handleAddNote}
      >
        <MaterialIcons name="add" size={24} color="white" />
      </Pressable>
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
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});