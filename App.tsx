import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { HomeScreen } from './screens/HomeScreen';
import { EditNoteScreen } from './screens/EditNoteScreen';
import { ThemeProvider } from './context/ThemeContext';
import { NotesProvider } from './context/NotesContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NotesProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#F8F9FA',
              },
              headerShadowVisible: false,
              headerTintColor: '#212529',
              headerTitleStyle: {
                fontWeight: '600',
              },
            }}
          >
            <Stack.Screen 
              name="Home" 
              component={HomeScreen}
              options={{ title: 'My Notes' }}
            />
            <Stack.Screen 
              name="EditNote" 
              component={EditNoteScreen}
              options={{ title: 'Edit Note' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NotesProvider>
    </ThemeProvider>
  );
}