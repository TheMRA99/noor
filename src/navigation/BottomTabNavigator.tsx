import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, BookOpen, BookMarked, Users } from 'lucide-react-native';
import { HomeStack }    from './HomeStack';
import { QuranStack }   from './QuranStack';
import { HadithStack }  from './HadithStack';
import { StoriesStack } from './StoriesStack';
import { usePreferencesStore } from '@/store';
import { Colors } from '@/design/tokens';
import { FontFamily } from '@/design/typography';
import { RootTabParamList } from '@/types/navigation';

const Tab = createBottomTabNavigator<RootTabParamList>();

export function BottomTabNavigator() {
  const { darkMode } = usePreferencesStore();
  const dark = darkMode;

  const tabBarBg     = dark ? Colors.darkSurface2  : '#FFFFFF';
  const activeTint   = Colors.accent;
  const inactiveTint = dark ? 'rgba(245,240,225,0.35)' : 'rgba(26,26,26,0.3)';

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor:  tabBarBg,
          borderTopColor:   dark ? Colors.darkBorder : 'rgba(15,76,58,0.1)',
          borderTopWidth:   1,
          height:           60,
          paddingBottom:    8,
        },
        tabBarActiveTintColor:   activeTint,
        tabBarInactiveTintColor: inactiveTint,
        tabBarLabelStyle: {
          fontFamily: FontFamily.body,
          fontSize:   11,
          marginTop:  -2,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="QuranTab"
        component={QuranStack}
        options={{
          tabBarLabel: 'Quran',
          tabBarIcon: ({ color, size }) => <BookOpen size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="HadithTab"
        component={HadithStack}
        options={{
          tabBarLabel: 'Hadith',
          tabBarIcon: ({ color, size }) => <BookMarked size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="StoriesTab"
        component={StoriesStack}
        options={{
          tabBarLabel: 'Stories',
          tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
