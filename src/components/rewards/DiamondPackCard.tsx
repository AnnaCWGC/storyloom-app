import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Gem } from 'lucide-react-native';

import { theme } from '@/theme';

type DiamondPackCardProps = {
  title: string;
  amount: number;
  priceLabel: string;
  badge?: string;
  onPress: () => void;
};

export function DiamondPackCard({
  title,
  amount,
  priceLabel,
  badge,
  onPress,
}: DiamondPackCardProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {badge ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      ) : null}

      <View style={styles.iconCircle}>
        <Gem size={26} color={theme.colors.secondary} fill={theme.colors.secondary} />
      </View>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.amount}>+{amount}</Text>

      <Text style={styles.caption}>diamonds</Text>

      <View style={styles.pricePill}>
        <Text style={styles.priceText}>{priceLabel}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '48%',
    minHeight: 186,
    borderRadius: theme.radius.xl,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    padding: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  badge: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
    height: 24,
    borderRadius: 12,
    paddingHorizontal: theme.spacing.sm,
    backgroundColor: 'rgba(244,114,182,0.20)',
    borderWidth: 1,
    borderColor: 'rgba(244,114,182,0.42)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: theme.colors.secondary,
    fontSize: 9,
    fontWeight: '900',
  },
  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(244,114,182,0.13)',
    borderWidth: 1,
    borderColor: 'rgba(244,114,182,0.24)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.small,
    fontWeight: '900',
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  amount: {
    color: theme.colors.text,
    fontSize: 26,
    lineHeight: 30,
    fontWeight: '900',
  },
  caption: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.tiny,
    fontWeight: '700',
    marginBottom: theme.spacing.md,
  },
  pricePill: {
    height: 34,
    minWidth: 94,
    borderRadius: 17,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  priceText: {
    color: theme.colors.white,
    fontSize: theme.typography.tiny,
    fontWeight: '900',
  },
});
