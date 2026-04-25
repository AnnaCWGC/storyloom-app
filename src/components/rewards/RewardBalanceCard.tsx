import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Gem, Key, Sparkles } from 'lucide-react-native';

import { theme } from '../../theme';

type RewardBalanceCardProps = {
  diamonds: number;
  keys: number;
};

export function RewardBalanceCard({ diamonds, keys }: RewardBalanceCardProps) {
  return (
    <LinearGradient
      colors={['rgba(244,114,182,0.28)', 'rgba(168,85,247,0.22)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.label}>Your balance</Text>

        <View style={styles.balanceRow}>
          <View style={styles.balanceItem}>
            <View style={styles.iconCircle}>
              <Gem size={24} color={theme.colors.white} fill={theme.colors.secondary} />
            </View>

            <View>
              <Text style={styles.value}>{diamonds}</Text>
              <Text style={styles.caption}>diamonds</Text>
            </View>
          </View>

          <View style={styles.balanceItem}>
            <View style={styles.iconCircle}>
              <Key size={24} color={theme.colors.white} />
            </View>

            <View>
              <Text style={styles.value}>{keys}</Text>
              <Text style={styles.caption}>keys</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.sparkleBadge}>
        <Sparkles size={16} color={theme.colors.secondary} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 154,
    borderRadius: theme.radius.xxl,
    padding: theme.spacing.xl,
    borderWidth: 1,
    borderColor: 'rgba(244,114,182,0.30)',
    marginBottom: theme.spacing.xxl,
    overflow: 'hidden',
  },
  balanceRow: {
    flexDirection: 'row',
    gap: theme.spacing.xl,
    marginTop: theme.spacing.md,
  },
  balanceItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(15,13,22,0.38)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.lg,
  },
  content: {
    flex: 1,
  },
  label: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.small,
    fontWeight: '700',
  },
  value: {
    color: theme.colors.text,
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '900',
  },
  caption: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.small,
    fontWeight: '700',
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
});
