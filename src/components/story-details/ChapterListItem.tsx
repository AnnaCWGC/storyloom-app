import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ChevronRight, Lock } from 'lucide-react-native';

import { theme } from '../../theme';

type ChapterListItemProps = {
  index: number;
  title: string;
  isLocked?: boolean;
  onPress?: () => void;
};

export function ChapterListItem({
  index,
  title,
  isLocked = false,
  onPress,
}: ChapterListItemProps) {
  return (
    <Pressable
      style={[styles.container, isLocked && styles.lockedContainer]}
      onPress={onPress}
      disabled={isLocked}
    >
      <View style={styles.numberBadge}>
        <Text style={styles.number}>{index + 1}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Chapter {index + 1}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>

      {isLocked ? (
        <Lock size={18} color={theme.colors.textMuted} />
      ) : (
        <ChevronRight size={20} color={theme.colors.secondary} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 72,
    borderRadius: theme.radius.lg,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  lockedContainer: {
    opacity: 0.56,
  },
  numberBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(216,106,205,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(216,106,205,0.34)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  number: {
    color: theme.colors.secondary,
    fontSize: theme.typography.small,
    fontWeight: '900',
  },
  content: {
    flex: 1,
  },
  label: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.tiny,
    fontWeight: '700',
    marginBottom: 2,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.body,
    fontWeight: '800',
  },
});
