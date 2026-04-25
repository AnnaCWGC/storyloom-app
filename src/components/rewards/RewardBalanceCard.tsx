import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Crown, Gem, Infinity, Key, Sparkles } from 'lucide-react-native';

import { useCountdown } from '../../hooks/useCountdown';
import { theme } from '../../theme';

type RewardBalanceCardProps = {
  diamonds: number;
  keys: number;
  isVip: boolean;
  maxKeys: number;
  nextKeyAt?: string | null;
};

export function RewardBalanceCard({
  diamonds,
  keys,
  isVip,
  maxKeys,
  nextKeyAt,
}: RewardBalanceCardProps) {
  const countdown = useCountdown(nextKeyAt);

  return (
    <LinearGradient
      colors={['rgba(244,114,182,0.28)', 'rgba(168,85,247,0.22)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.sparkleBadge}>
        <Sparkles size={16} color={theme.colors.secondary} />
      </View>

      <Text style={styles.label}>Your balance</Text>

      <View style={styles.walletRow}>
        <View style={styles.walletItem}>
          <View style={styles.iconCircle}>
            <Gem size={24} color={theme.colors.white} fill={theme.colors.secondary} />
          </View>

          <View>
            <Text style={styles.value}>{diamonds}</Text>
            <Text style={styles.caption}>diamonds</Text>
          </View>
        </View>

        <View style={[styles.walletItem, isVip && styles.vipWalletItem]}>
          <View style={[styles.iconCircle, isVip && styles.vipIconCircle]}>
            {isVip ? (
              <Infinity size={24} color="#FBBF24" />
            ) : (
              <Key size={24} color={theme.colors.white} />
            )}
          </View>

          <View>
            <View style={styles.keyValueRow}>
              <Text style={[styles.value, isVip && styles.vipValue]}>
                {isVip ? '∞' : keys}
              </Text>

              {isVip ? (
                <Crown size={15} color="#FBBF24" fill="#FBBF24" />
              ) : null}
            </View>

            <Text style={[styles.caption, isVip && styles.vipCaption]}>
              {isVip ? 'VIP keys' : `keys / ${maxKeys}`}
            </Text>
          </View>
        </View>
      </View>

      {!isVip && keys < maxKeys ? (
        <Text style={styles.rechargeText}>
          {countdown.formatted
            ? `Next key in ${countdown.formatted}`
            : 'Key recharge will start soon'}
        </Text>
      ) : null}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 174,
    borderRadius: theme.radius.xxl,
    padding: theme.spacing.xl,
    borderWidth: 1,
    borderColor: 'rgba(244,114,182,0.30)',
    marginBottom: theme.spacing.xxl,
    overflow: 'hidden',
  },
  sparkleBadge: {
    position: 'absolute',
    top: theme.spacing.lg,
    right: theme.spacing.lg,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(15,13,22,0.42)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.small,
    fontWeight: '700',
    marginBottom: theme.spacing.lg,
  },
  walletRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  walletItem: {
    flex: 1,
    minHeight: 82,
    borderRadius: theme.radius.xl,
    backgroundColor: 'rgba(15,13,22,0.34)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  vipWalletItem: {
    backgroundColor: 'rgba(251,191,36,0.12)',
    borderColor: 'rgba(251,191,36,0.42)',
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(244,114,182,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  vipIconCircle: {
    backgroundColor: 'rgba(251,191,36,0.14)',
  },
  keyValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  value: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: '900',
  },
  vipValue: {
    color: '#FBBF24',
  },
  caption: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.tiny,
    fontWeight: '700',
  },
  vipCaption: {
    color: '#FBBF24',
  },
  rechargeText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.tiny,
    fontWeight: '700',
    marginTop: theme.spacing.md,
  },
});
