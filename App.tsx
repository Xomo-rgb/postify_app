import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PostProvider } from './src/context/PostContext';
import HomeScreen from './src/screens/HomeScreen';
import CreatePostScreen from './src/screens/CreatePostScreen';
import EditPostScreen from './src/screens/EditPostScreen';
import { RootStackParamList } from './src/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <PostProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: '#f7f6f3' },
              headerTintColor: '#c8a96e',
              headerTitleStyle: { fontWeight: '700', color: '#1a1a1a' },
              headerShadowVisible: false,
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{ title: 'Create Post' }} />
            <Stack.Screen name="EditPost" component={EditPostScreen} options={{ title: 'Edit Post' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PostProvider>
    </SafeAreaProvider>
  );
}
