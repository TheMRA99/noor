import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Colors, Radius, Spacing } from '@/design/tokens';

export function SkeletonRow() {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1,   duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 700, useNativeDriver: true }),
      ]),
    ).start();
  }, [opacity]);

  return (
    <Animated.View style={[styles.row, { opacity }]}>
      <View style={styles.circle} />
      <View style={styles.lines}>
        <View style={[styles.line, { width: '60%' }]} />
        <View style={[styles.line, { width: '40%' }]} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems:    'center',
    padding:       Spacing.md,
    gap:           Spacing.md,
  },
  circle: {
    width:           40,
    height:          40,
    borderRadius:    20,
    backgroundColor: Colors.accentMuted,
  },
  lines: {
    flex: 1,
    gap:  Spacing.xs,
  },
  line: {
    height:          12,
    backgroundColor: Colors.accentMuted,
    borderRadius:    Radius.sm,
  },
});
