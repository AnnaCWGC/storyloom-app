import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Crown, Gem, Key, X } from 'lucide-react-native';

import { useCountdown } from '../../hooks/useCountdown';
import { theme } from '../../theme';

type NoKeysModalProps = {
  visible: boolean;
  nextKeyAt?: string | null;
  onClose: () => void;
  onGoToRewards: () => void;
};

export function NoKeysModal({
  visible,
  nextKeyAt,
  onClose,
  onGoToRewards,
}: NoKeysModalProps) {
  const countdown = useCountdown(nextKeyAt);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <X size={18} color={theme.colors.textSecondary} />
          </Pressable>

          <LinearGradient
            colors={['rgba(244,114,182,0.30)', 'rgba(168,85,247,0.18)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconHalo}
          >
            <Key size={32} color={theme.colors.white} />
          </LinearGradient>

          <Text style={styles.title}>No keys available</Text>

          <Text style={styles.description}>
            You need 1 key to open a chapter. Re-reading a chapter also uses a
            key.
          </Text>

          <View style={styles.rechargeBox}>
            <View style={styles.rechargeIcon}>
              <Key size={16} color={theme.colors.secondary} />
            </View>

            <View style={styles.rechargeContent}>
              <Text style={styles.rechargeLabel}>Next key</Text>

              <Text style={styles.rechargeValue}>
                {countdown.formatted
                  ? `Available in ${countdown.formatted}`
                  : 'Recharge will start soon'}
              </Text>
            </View>
          </View>

          <View style={styles.vipBox}>
            <View style={styles.vipIcon}>
              <Crown size={16} color="#FBBF24" fill="#FBBF24" />
            </View>

            <View style={styles.vipContent}>
              <Text style={styles.vipTitle}>VIP reads without keys</Text>
              <Text style={styles.vipText}>
                VIP access removes chapter key limits and increases your daily
                diamond reward.
              </Text>
            </View>
          </View>

          <Pressable style={styles.primaryButton} onPress={onGoToRewards}>
            <Gem size={17} color={theme.colors.white} fill={theme.colors.white} />
            <Text style={styles.primaryButtonText}>Go to Rewards</Text>
          </Pressable>

          <Pressable style={styles.secondaryButton} onPress={onClose}>
            <Text style={styles.secondaryButtonText}>Maybe later</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(5,4,9,0.74)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xxl,
  },
  card: {
    width: '100%',
    borderRadius: theme.radius.xxl,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    padding: theme.spacing.xl,
    alignItems: 'center',
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
  },
  iconHalo: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(244,114,182,0.32)',
  },
  title: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: '800',
    fontFamily: theme.fonts.displaySemiBold,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  description: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.small,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  rechargeBox: {
    width: '100%',
    minHeight: 68,
    borderRadius: theme.radius.lg,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  rechargeIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(244,114,182,0.13)',
    borderWidth: 1,
    borderColor: 'rgba(244,114,182,0.26)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  rechargeContent: {
    flex: 1,
  },
  rechargeLabel: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.tiny,
    fontWeight: '800',
    marginBottom: 2,
  },
  rechargeValue: {
    color: theme.colors.text,
    fontSize: theme.typography.small,
    fontWeight: '900',
  },
  vipBox: {
    width: '100%',
    minHeight: 76,
    borderRadius: theme.radius.lg,
    backgroundColor: 'rgba(251,191,36,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(251,191,36,0.30)',
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  vipIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(251,191,36,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(251,191,36,0.26)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  vipContent: {
    flex: 1,
  },
  vipTitle: {
    color: '#FBBF24',
    fontSize: theme.typography.small,
    fontWeight: '900',
    marginBottom: 2,
  },
  vipText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.tiny,
    lineHeight: 17,
  },
  primaryButton: {
    width: '100%',
    height: 54,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  primaryButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.body,
    fontWeight: '900',
  },
  secondaryButton: {
    height: 44,
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.small,
    fontWeight: '800',
  },
});
