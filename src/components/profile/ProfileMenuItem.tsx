import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

import { theme } from '../../theme';

type ProfileMenuItemProps = {
  icon: ReactNode;
  title: string;
  description?: string;
  rightText?: string;
  onPress?: () => void;
};

export function ProfileMenuItem({
  icon,
  title,
  description,
  rightText,
  onPress,
}: ProfileMenuItemProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.iconCircle}>{icon}</View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        {description ? (
          <Text style={styles.description}>{description}</Text>
        ) : null}
      </View>

      {rightText ? <Text style={styles.rightText}>{rightText}</Text> : null}

      <ChevronRight size={18} color={theme.colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 74,
    borderRadius: theme.radius.lg,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(244,114,182,0.13)',
    borderWidth: 1,
    borderColor: 'rgba(244,114,182,0.24)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  content: {
    flex: 1,
    paddingRight: theme.spacing.sm,
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
  rightText: {
    color: theme.colors.secondary,
    fontSize: theme.typography.tiny,
    fontWeight: '900',
    marginRight: theme.spacing.sm,
  },
});
