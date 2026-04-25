import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../../theme';

type InfoPillProps = {
  icon?: ReactNode;
  label: string;
  value: string;
};

export function InfoPill({ icon, label, value }: InfoPillProps) {
  return (
    <View style={styles.container}>
      {icon ? <View style={styles.icon}>{icon}</View> : null}

      <View>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: 94,
    minHeight: 58,
    borderRadius: theme.radius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  icon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(244, 114, 182, 0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    color: theme.colors.text,
    fontSize: theme.typography.small,
    fontWeight: '800',
  },
  label: {
    color: theme.colors.textMuted,
    fontSize: 10,
    fontWeight: '700',
    marginTop: 1,
  },
});
