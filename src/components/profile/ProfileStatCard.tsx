import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { theme } from '@/theme';

type ProfileStatCardProps = {
  icon: ReactNode;
  value: string | number;
  label: string;
};

export function ProfileStatCard({ icon, value, label }: ProfileStatCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>{icon}</View>

      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 112,
    borderRadius: theme.radius.xl,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    padding: theme.spacing.md,
    justifyContent: 'center',
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(244,114,182,0.13)',
    borderWidth: 1,
    borderColor: 'rgba(244,114,182,0.24)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  value: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: '900',
  },
  label: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.tiny,
    fontWeight: '700',
    marginTop: 2,
  },
});
