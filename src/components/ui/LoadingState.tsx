import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { theme } from '@/theme';

type LoadingStateProps = {
  message?: string;
};

export function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={theme.colors.secondary} size="large" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 220,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
  },
  text: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.small,
    fontWeight: '700',
  },
});
