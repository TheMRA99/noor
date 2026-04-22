import React, { createContext, useContext } from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { Colors, Spacing } from '@/design/tokens';

const SacredContext = createContext(false);

export function useSacredContext() {
  return useContext(SacredContext);
}

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  dark?: boolean;
}

export function SacredFrame({ children, style, dark = false }: Props) {
  return (
    <SacredContext.Provider value={true}>
      <View
        style={[styles.frame, dark && styles.frameDark, style]}
        accessible={false}
      >
        {children}
      </View>
    </SacredContext.Provider>
  );
}

const styles = StyleSheet.create({
  frame: {
    borderLeftWidth: 2,
    borderLeftColor: Colors.accent,
    backgroundColor: Colors.accentFaint,
    paddingVertical:  Spacing.md,
    paddingLeft:      Spacing.md,
    paddingRight:     Spacing.sm,
    borderRadius:     4,
  },
  frameDark: {
    backgroundColor: 'rgba(201,169,97,0.04)',
    borderLeftColor: Colors.accent,
  },
});
