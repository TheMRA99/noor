import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HadithPlaceholderScreen } from '@/screens/hadith/HadithPlaceholderScreen';
import { HadithStackParamList } from '@/types/navigation';

const Stack = createNativeStackNavigator<HadithStackParamList>();

export function HadithStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HadithHome" component={HadithPlaceholderScreen} />
    </Stack.Navigator>
  );
}
