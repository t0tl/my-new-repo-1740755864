import React, { useState, useEffect } from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform,
  Pressable,
  Text 
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNotes } from '../context/NotesContext';
import { useTheme } from '../context/ThemeContext';
import * as Haptics from 'expo-haptics';

export function EditNoteScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { notes, addNote, updateNote } = useNotes();
  const noteId = route.params?.noteId;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (noteId) {
      const note = notes.find(n => n.id === noteId);
      if (note) {
        setTitle(note.title);
        setContent(note.content);
      }
    }
  }, [noteId]);

  const handleSave = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (noteId) {
      updateNote(noteId, { title, content });
    } else {
      addNote({ title, content, tags: [] });
    }
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <TextInput
        style={[styles.titleInput, { color: colors.text }]}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        placeholderTextColor={colors.secondary}
      />
      <TextInput
        style={[styles.contentInput, { color: colors.text }]}
        value={content}
        onChangeText={setContent}
        placeholder="Start writing..."
        placeholderTextColor={colors.secondary}
        multiline
        textAlignVertical="top"
      />
      <Pressable
        style={[styles.saveButton, { backgroundColor: colors.primary }]}
        onPress={handleSave}
      >
        <MaterialIcons name="check" size={24} color="white" />
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  contentInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },
  saveButton: {
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