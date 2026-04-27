import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Crown, Infinity, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { theme } from '@/theme';

type VipSubscriptionCardProps = {
  isVip: boolean;
  onPress: () => void;
};

export function VipSubscriptionCard({
  isVip,
  onPress,
}: VipSubscriptionCardProps) {
  return (
    <LinearGradient
      colors={
        isVip
          ? ['rgba(251,191,36,0.26)', 'rgba(168,85,247,0.18)']
          : ['rgba(255,255,255,0.06)', 'rgba(255,255,255,0.035)']
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, isVip && styles.activeContainer]}
    >
      <View style={styles.header}>
        <View style={[styles.iconCircle, isVip && styles.activeIconCircle]}>
          <Crown
            size={24}
            color={isVip ? '#FBBF24' : theme.colors.secondary}
            fill={isVip ? '#FBBF24' : 'transparent'}
          />
        </View>

        <View style={styles.titleBlock}>
          <Text style={styles.title}>Storyloom VIP</Text>
          <Text style={styles.subtitle}>
            {isVip ? 'VIP access active' : 'Unlock unlimited chapter access'}
          </Text>
        </View>

        {isVip ? (
          <View style={styles.activeBadge}>
            <Sparkles size={12} color="#FBBF24" />
            <Text style={styles.activeBadgeText}>ACTIVE</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.benefits}>
        <View style={styles.benefitRow}>
          <Infinity size={16} color="#FBBF24" />
          <Text style={styles.benefitText}>Unlimited chapter reads</Text>
        </View>

        <View style={styles.benefitRow}>
          <Sparkles size={16} color="#FBBF24" />
          <Text style={styles.benefitText}>30 daily diamonds instead of 12</Text>
        </View>
      </View>

      <Pressable
        style={[styles.button, isVip && styles.cancelButton]}
        onPress={onPress}
      >
        <Text style={[styles.buttonText, isVip && styles.cancelButtonText]}>
          {isVip ? 'Manage VIP' : 'View VIP Benefits'}
        </Text>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.radius.xxl,
    padding: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    marginBottom: theme.spacing.xxl,
  },
  activeContainer: {
    borderColor: 'rgba(251,191,36,0.42)',
    shadowColor: '#FBBF24',
    shadowOpacity: 0.22,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(244,114,182,0.13)',
    borderWidth: 1,
    borderColor: 'rgba(244,114,182,0.24)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  activeIconCircle: {
    backgroundColor: 'rgba(251,191,36,0.12)',
    borderColor: 'rgba(251,191,36,0.32)',
  },
  titleBlock: {
    flex: 1,
  },
  title: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '900',
    fontFamily: 'Georgia',
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.tiny,
    lineHeight: 17,
    marginTop: 2,
  },
  activeBadge: {
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
  activeBadgeText: {
    color: '#FBBF24',
    fontSize: 9,
    fontWeight: '900',
  },
  benefits: {
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  benefitText: {
    color: theme.colors.text,
    fontSize: theme.typography.small,
    fontWeight: '700',
  },
  button: {
    height: 46,
    borderRadius: theme.radius.pill,
    backgroundColor: '#FBBF24',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(251,191,36,0.30)',
  },
  buttonText: {
    color: '#20110A',
    fontSize: theme.typography.small,
    fontWeight: '900',
  },
  cancelButtonText: {
    color: '#FBBF24',
  },
});
