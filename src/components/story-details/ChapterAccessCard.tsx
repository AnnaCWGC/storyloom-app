import { StyleSheet, Text, View } from 'react-native';
import { Crown, Infinity, Key, Sparkles } from 'lucide-react-native';

import { useCountdown } from '../../hooks/useCountdown';
import { theme } from '../../theme';

type ChapterAccessCardProps = {
  keys: number;
  maxKeys: number;
  isVip: boolean;
  nextKeyAt?: string | null;
};

export function ChapterAccessCard({
  keys,
  maxKeys,
  isVip,
  nextKeyAt,
}: ChapterAccessCardProps) {
  const countdown = useCountdown(nextKeyAt);

  return (
    <View style={[styles.container, isVip && styles.vipContainer]}>
      <View style={[styles.iconCircle, isVip && styles.vipIconCircle]}>
        {isVip ? (
          <Infinity size={22} color="#FBBF24" />
        ) : (
          <Key size={22} color={theme.colors.secondary} />
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, isVip && styles.vipTitle]}>
            {isVip ? 'VIP chapter access' : 'Chapter access'}
          </Text>

          {isVip ? (
            <Crown size={15} color="#FBBF24" fill="#FBBF24" />
          ) : null}
        </View>

        <Text style={styles.description}>
          {isVip
            ? 'You can read unlimited chapters without spending keys.'
            : `${keys}/${maxKeys} keys available. Each chapter entry uses 1 key.`}
        </Text>

        {!isVip && keys < maxKeys ? (
          <Text style={styles.rechargeText}>
            {countdown.formatted
              ? `Next key in ${countdown.formatted}`
              : 'Key recharge will start soon'}
          </Text>
        ) : null}
      </View>

      {isVip ? (
        <View style={styles.vipBadge}>
          <Sparkles size={12} color="#FBBF24" />
          <Text style={styles.vipBadgeText}>VIP</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 92,
    borderRadius: theme.radius.xl,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    padding: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  vipContainer: {
    backgroundColor: 'rgba(251,191,36,0.10)',
    borderColor: 'rgba(251,191,36,0.34)',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(244,114,182,0.13)',
    borderWidth: 1,
    borderColor: 'rgba(244,114,182,0.26)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  vipIconCircle: {
    backgroundColor: 'rgba(251,191,36,0.12)',
    borderColor: 'rgba(251,191,36,0.30)',
  },
  content: {
    flex: 1,
    paddingRight: theme.spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginBottom: 3,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.body,
    fontWeight: '900',
  },
  vipTitle: {
    color: '#FBBF24',
  },
  description: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.tiny,
    lineHeight: 17,
  },
  rechargeText: {
    color: theme.colors.secondary,
    fontSize: theme.typography.tiny,
    fontWeight: '800',
    marginTop: theme.spacing.xs,
  },
  vipBadge: {
    height: 26,
    borderRadius: 13,
    paddingHorizontal: theme.spacing.sm,
    backgroundColor: 'rgba(251,191,36,0.13)',
    borderWidth: 1,
    borderColor: 'rgba(251,191,36,0.34)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  vipBadgeText: {
    color: '#FBBF24',
    fontSize: 9,
    fontWeight: '900',
  },
});
