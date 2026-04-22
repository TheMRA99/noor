import { DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';
import { Colors } from './tokens';

export const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary:    Colors.accent,
    background: Colors.parchment,
    card:       '#FFFFFF',
    text:       Colors.ink,
    border:     'rgba(15,76,58,0.15)',
    notification: Colors.accent,
  },
};

export const NoorDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary:    Colors.accent,
    background: Colors.darkSurface,
    card:       Colors.darkSurface2,
    text:       Colors.parchment,
    border:     Colors.darkBorder,
    notification: Colors.accent,
  },
};
