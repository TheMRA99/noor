import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { Colors, Radius, Spacing } from '@/design/tokens';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  dark?: boolean;
}

export function NoorCard({ children, style, onPress, dark = false }: Props) {
  const cardStyle = [styles.card, dark && styles.cardDark, style];

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={cardStyle} activeOpacity={0.85}>
        {children}
      </TouchableOpacity>
    );
  }
  return <View style={cardStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius:    Radius.lg,
    padding:         Spacing.md,
    shadowColor:     '#000',
    shadowOffset:    { width: 0, height: 2 },
    shadowOpacity:   0.06,
    shadowRadius:    8,
    elevation:       2,
  },
  cardDark: {
    backgroundColor: Colors.darkSurface2,
    shadowOpacity:   0.2,
  },
});
