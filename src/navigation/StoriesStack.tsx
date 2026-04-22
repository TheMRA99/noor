import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StoriesPlaceholderScreen } from '@/screens/stories/StoriesPlaceholderScreen';
import { StoriesStackParamList } from '@/types/navigation';

const Stack = createNativeStackNavigator<StoriesStackParamList>();

export function StoriesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StoriesHome" component={StoriesPlaceholderScreen} />
    </Stack.Navigator>
  );
}
