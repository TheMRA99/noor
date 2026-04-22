import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export const rtlText: TextStyle = {
  writingDirection: 'rtl',
  textAlign:        'right',
};

export const rtlRow: ViewStyle = {
  flexDirection: 'row-reverse',
};

export function withRtl<T extends TextStyle>(style: T): T {
  return { ...style, ...rtlText };
}
