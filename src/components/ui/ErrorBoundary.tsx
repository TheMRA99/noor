import React, { Component, ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing } from '@/design/tokens';
import { FontFamily } from '@/design/typography';

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          <TouchableOpacity
            style={styles.retry}
            onPress={() => this.setState({ hasError: false })}
          >
            <Text style={styles.retryText}>Try again</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    padding: Spacing.xl,
  },
  title: {
    fontFamily: FontFamily.body,
    fontSize:   16,
    color:      Colors.inkMuted,
    marginBottom: Spacing.md,
  },
  retry: {
    paddingHorizontal: Spacing.lg,
    paddingVertical:   Spacing.sm,
    backgroundColor:   Colors.accent,
    borderRadius:      8,
  },
  retryText: {
    fontFamily: FontFamily.bodyMed,
    fontSize:   14,
    color:      Colors.ink,
  },
});
