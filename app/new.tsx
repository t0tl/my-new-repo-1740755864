import { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function NewNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleSave = () => {
    // Save note logic will be implemented here
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}>
      <TextInput
        style={[
          styles.titleInput,
          {
            color: isDark ? '#ffffff' : '#000000',
            backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
          },
        ]}
        placeholder="Title"
        placeholderTextColor={isDark ? '#888888' : '#999999'}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[
          styles.contentInput,
          {
            color: isDark ? '#ffffff' : '#000000',
            backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
          },
        ]}
        placeholder="Start typing..."
        placeholderTextColor={isDark ? '#888888' : '#999999'}
        value={content}
        onChangeText={setContent}
        multiline
        textAlignVertical="top"
      />
      <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: '#228BE6' }]}
        onPress={handleSave}
      >
        <Ionicons name="checkmark" size={24} color="#ffffff" />
      </TouchableOpacity>
    </View>
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
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  contentInput: {
    flex: 1,
    fontSize: 16,
    padding: 16,
    borderRadius: 12,
    lineHeight: 24,
  },
  saveButton: {
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