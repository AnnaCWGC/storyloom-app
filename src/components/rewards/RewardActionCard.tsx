import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ChevronRight, Gem } from 'lucide-react-native';

import { theme } from '../../theme';

type RewardActionCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  amount: number;
  onPress: () => void;
};

export function RewardActionCard({
  icon,
  title,
  description,
  amount,
  onPress,
}: RewardActionCardProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.iconCircle}>{icon}</View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={styles.rewardPill}>
        <Gem size={12} color={theme.colors.secondary} fill={theme.colors.secondary} />
        <Text style={styles.rewardText}>+{amount}</Text>
      </View>

      <ChevronRight size={18} color={theme.colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 82,
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
    width: 44,
    height: 44,
    borderRadius: 22,
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
    marginBottom: 3,
  },
  description: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.tiny,
    lineHeight: 17,
  },
  rewardPill: {
    height: 28,
    borderRadius: 14,
    paddingHorizontal: theme.spacing.sm,
    backgroundColor: 'rgba(244,114,182,0.13)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginRight: theme.spacing.sm,
  },
  rewardText: {
    color: theme.colors.text,
    fontSize: 11,
    fontWeight: '900',
  },
});
