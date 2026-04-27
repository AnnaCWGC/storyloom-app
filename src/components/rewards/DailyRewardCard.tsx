import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CalendarCheck, Gem } from 'lucide-react-native';

import { theme } from '@/theme';

type DailyRewardCardProps = {
  amount: number;
  alreadyClaimed: boolean;
  onClaim: () => void;
};

export function DailyRewardCard({
  amount,
  alreadyClaimed,
  onClaim,
}: DailyRewardCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <View style={styles.iconCircle}>
          <CalendarCheck size={22} color={theme.colors.secondary} />
        </View>

        <View style={styles.textContent}>
          <Text style={styles.title}>Daily reward</Text>

          <Text style={styles.subtitle}>
            Come back every day to collect free diamonds.
          </Text>
        </View>
      </View>

      <Pressable
        style={[styles.claimButton, alreadyClaimed && styles.claimedButton]}
        onPress={onClaim}
        disabled={alreadyClaimed}
      >
        <View style={styles.claimContent}>
          {!alreadyClaimed ? (
            <Gem size={14} color={theme.colors.white} fill={theme.colors.white} />
          ) : null}

          <Text style={[styles.claimText, alreadyClaimed && styles.claimedText]}>
            {alreadyClaimed ? 'Claimed' : `+${amount}`}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 104,
    borderRadius: theme.radius.xl,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    padding: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  leftContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: theme.spacing.md,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(244,114,182,0.13)',
    borderWidth: 1,
    borderColor: 'rgba(244,114,182,0.24)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  textContent: {
    flex: 1,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.body,
    fontWeight: '900',
    marginBottom: 3,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.tiny,
    lineHeight: 17,
  },
  claimButton: {
    minWidth: 74,
    height: 42,
    borderRadius: 21,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  claimedButton: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
  },
  claimContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  claimText: {
    color: theme.colors.white,
    fontSize: theme.typography.small,
    fontWeight: '900',
  },
  claimedText: {
    color: theme.colors.textMuted,
  },
});
