import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '@/theme';

type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
  onPressAction?: () => void;
};

export function SectionHeader({
  title,
  actionLabel = 'View all',
  onPressAction,
}: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <Pressable onPress={onPressAction} hitSlop={10}>
        <Text style={styles.action}>{actionLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '800',
    fontFamily: theme.fonts.displaySemiBold,
  },
  action: {
    color: theme.colors.secondary,
    fontSize: theme.typography.small,
    fontWeight: '800',
  },
});
