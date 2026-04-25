import { StyleSheet, Switch, Text, View } from 'react-native';

import { theme } from '../../theme';

type ProfilePreferenceRowProps = {
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export function ProfilePreferenceRow({
  title,
  description,
  value,
  onValueChange,
}: ProfilePreferenceRowProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          false: 'rgba(255,255,255,0.12)',
          true: 'rgba(244,114,182,0.38)',
        }}
        thumbColor={value ? theme.colors.secondary : theme.colors.textMuted}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 76,
    borderRadius: theme.radius.lg,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  content: {
    flex: 1,
    paddingRight: theme.spacing.md,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.small,
    fontWeight: '900',
    marginBottom: 2,
  },
  description: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.tiny,
    lineHeight: 17,
  },
});
