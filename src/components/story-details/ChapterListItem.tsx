import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ChevronRight, Crown, Key } from 'lucide-react-native';

import { theme } from '../../theme';

type ChapterListItemProps = {
  index: number;
  title: string;
  accessLabel: string;
  accessType: 'vip' | 'key';
  isLoading?: boolean;
  onPress?: () => void;
};

export function ChapterListItem({
  index,
  title,
  accessLabel,
  accessType,
  isLoading = false,
  onPress,
}: ChapterListItemProps) {
  const isVip = accessType === 'vip';

  return (
    <Pressable
      style={[styles.container, isLoading && styles.loadingContainer]}
      onPress={onPress}
      disabled={isLoading}
    >
      <View style={styles.numberBadge}>
        <Text style={styles.number}>{index + 1}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.labelRow}>
          <Text style={styles.label}>Chapter {index + 1}</Text>

          <View style={[styles.accessBadge, isVip && styles.vipBadge]}>
            {isVip ? (
              <Crown size={10} color={theme.colors.secondary} />
            ) : (
              <Key size={10} color={theme.colors.secondary} />
            )}

            <Text style={styles.accessText}>{accessLabel}</Text>
          </View>
        </View>

        <Text style={styles.title}>{title}</Text>
      </View>

      <Text style={styles.rightText}>{isLoading ? '...' : ''}</Text>

      {!isLoading ? (
        <ChevronRight size={20} color={theme.colors.secondary} />
      ) : null}
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
  loadingContainer: {
    opacity: 0.64,
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
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: 2,
  },
  label: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.tiny,
    fontWeight: '700',
  },
  accessBadge: {
    height: 22,
    borderRadius: 11,
    paddingHorizontal: theme.spacing.sm,
    backgroundColor: 'rgba(244,114,182,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(244,114,182,0.30)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  vipBadge: {
    backgroundColor: 'rgba(251,191,36,0.12)',
    borderColor: 'rgba(251,191,36,0.30)',
  },
  accessText: {
    color: theme.colors.secondary,
    fontSize: 10,
    fontWeight: '900',
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.body,
    fontWeight: '800',
  },
  rightText: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.small,
    fontWeight: '900',
  },
});
