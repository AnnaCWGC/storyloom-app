import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Crown, Gem, Infinity, Star, X, Zap } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { theme } from '../../theme';

type VIPPaywallModalProps = {
  visible: boolean;
  isVip: boolean;
  expiresAt?: string | null;
  willRenew?: boolean;
  onClose: () => void;
  onStartVip: () => void | Promise<void>;
};

export function VIPPaywallModal({
  visible,
  isVip,
  expiresAt,
  willRenew,
  onClose,
  onStartVip,
}: VIPPaywallModalProps) {
  const expiresAtLabel = expiresAt
    ? new Intl.DateTimeFormat('en', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(new Date(expiresAt))
    : null;

  const planCaption = isVip
    ? willRenew
      ? 'Renews monthly'
      : expiresAtLabel
        ? `Active until ${expiresAtLabel}`
        : 'Active until expiration'
    : '3 days free, then monthly';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <LinearGradient
          colors={['rgba(39,24,54,0.98)', 'rgba(18,14,26,0.98)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <Pressable style={styles.closeButton} onPress={onClose}>
            <X size={18} color={theme.colors.textSecondary} />
          </Pressable>

          <View style={styles.heroIconWrapper}>
            <LinearGradient
              colors={['rgba(251,191,36,0.36)', 'rgba(168,85,247,0.16)']}
              style={styles.heroIcon}
            >
              <Crown size={38} color="#FBBF24" fill="#FBBF24" />
            </LinearGradient>
          </View>

          <Text style={styles.eyebrow}>STORYLOOM VIP</Text>

          <Text style={styles.title}>Unlock the royal experience</Text>

          <Text style={styles.subtitle}>
            Read without key limits, collect more daily diamonds, and access
            premium story benefits.
          </Text>

          <View style={styles.benefitsWrapper}>
            <View style={styles.benefitRow}>
              <View style={styles.benefitIcon}>
                <Infinity size={18} color="#FBBF24" />
              </View>

              <View style={styles.benefitContent}>
                <Text style={styles.benefitTitle}>Unlimited chapter reads</Text>
                <Text style={styles.benefitText}>
                  Open and re-read chapters without spending keys.
                </Text>
              </View>
            </View>

            <View style={styles.benefitRow}>
              <View style={styles.benefitIcon}>
                <Gem size={18} color="#FBBF24" fill="#FBBF24" />
              </View>

              <View style={styles.benefitContent}>
                <Text style={styles.benefitTitle}>30 diamonds every day</Text>
                <Text style={styles.benefitText}>
                  VIP daily rewards are higher than the regular 12 diamonds.
                </Text>
              </View>
            </View>

            <View style={styles.benefitRow}>
              <View style={styles.benefitIcon}>
                <Star size={18} color="#FBBF24" fill="#FBBF24" />
              </View>

              <View style={styles.benefitContent}>
                <Text style={styles.benefitTitle}>Exclusive VIP stories</Text>
                <Text style={styles.benefitText}>
                  Placeholder for future early chapters and VIP-only scenes.
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.planCard}>
            <View>
              <Text style={styles.planLabel}>Monthly plan</Text>
              <Text style={styles.planPrice}>$7.99</Text>
              <Text style={styles.planCaption}>{planCaption}</Text>
            </View>

            <View style={styles.popularBadge}>
              <Zap size={12} color="#FBBF24" />
              <Text style={styles.popularText}>MOCK</Text>
            </View>
          </View>

          <Pressable
            style={[styles.primaryButton, isVip && styles.activeButton]}
            onPress={isVip ? onClose : onStartVip}
          >
            <Crown
              size={18}
              color={isVip ? '#FBBF24' : '#20110A'}
              fill={isVip ? '#FBBF24' : '#20110A'}
            />

            <Text
              style={[
                styles.primaryButtonText,
                isVip && styles.activeButtonText,
              ]}
            >
              {isVip ? 'VIP is active' : 'Start VIP Trial'}
            </Text>
          </Pressable>

          <Pressable style={styles.secondaryButton} onPress={onClose}>
            <Text style={styles.secondaryButtonText}>Maybe later</Text>
          </Pressable>

          <Text style={styles.disclaimer}>
            Prototype only. Real payments and subscriptions will be connected
            later through the backend/app store flow.
          </Text>
        </LinearGradient>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(5,4,9,0.78)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xxl,
  },
  card: {
    width: '100%',
    maxHeight: '92%',
    borderRadius: theme.radius.xxl,
    borderWidth: 1,
    borderColor: 'rgba(251,191,36,0.28)',
    padding: theme.spacing.xl,
    alignItems: 'center',
    shadowColor: '#FBBF24',
    shadowOpacity: 0.18,
    shadowRadius: 22,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 8,
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  heroIconWrapper: {
    marginBottom: theme.spacing.md,
  },
  heroIcon: {
    width: 86,
    height: 86,
    borderRadius: 43,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(251,191,36,0.42)',
  },
  eyebrow: {
    color: '#FBBF24',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.4,
    marginBottom: theme.spacing.sm,
  },
  title: {
    color: theme.colors.text,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800',
    fontFamily: 'Georgia',
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.small,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  benefitsWrapper: {
    width: '100%',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  benefitRow: {
    minHeight: 72,
    borderRadius: theme.radius.lg,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderWidth: 1,
    borderColor: 'rgba(251,191,36,0.18)',
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  benefitIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(251,191,36,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(251,191,36,0.26)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.small,
    fontWeight: '900',
    marginBottom: 2,
  },
  benefitText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.tiny,
    lineHeight: 17,
  },
  planCard: {
    width: '100%',
    borderRadius: theme.radius.xl,
    backgroundColor: 'rgba(251,191,36,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(251,191,36,0.30)',
    padding: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xl,
  },
  planLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.tiny,
    fontWeight: '800',
  },
  planPrice: {
    color: '#FBBF24',
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '900',
  },
  planCaption: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.tiny,
    fontWeight: '700',
  },
  popularBadge: {
    height: 28,
    borderRadius: 14,
    paddingHorizontal: theme.spacing.sm,
    backgroundColor: 'rgba(251,191,36,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(251,191,36,0.34)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  popularText: {
    color: '#FBBF24',
    fontSize: 10,
    fontWeight: '900',
  },
  primaryButton: {
    width: '100%',
    height: 54,
    borderRadius: theme.radius.pill,
    backgroundColor: '#FBBF24',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  activeButton: {
    backgroundColor: 'rgba(251,191,36,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(251,191,36,0.38)',
  },
  primaryButtonText: {
    color: '#20110A',
    fontSize: theme.typography.body,
    fontWeight: '900',
  },
  activeButtonText: {
    color: '#FBBF24',
  },
  secondaryButton: {
    height: 40,
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  secondaryButtonText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.small,
    fontWeight: '800',
  },
  disclaimer: {
    color: theme.colors.textMuted,
    fontSize: 10,
    lineHeight: 15,
    textAlign: 'center',
  },
});
