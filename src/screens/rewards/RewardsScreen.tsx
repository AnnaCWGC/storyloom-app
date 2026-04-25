import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { BookOpen, Clapperboard, Gift, Share2 } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { ErrorState } from '../../components/ui/ErrorState';
import { LoadingState } from '../../components/ui/LoadingState';
import { RewardBalanceCard } from '../../components/rewards/RewardBalanceCard';
import { DailyRewardCard } from '../../components/rewards/DailyRewardCard';
import { DiamondPackCard } from '../../components/rewards/DiamondPackCard';
import { RewardActionCard } from '../../components/rewards/RewardActionCard';
import { theme } from '../../theme';
import { useRewards } from '../../hooks/useRewards';

export function RewardsScreen() {
  const insets = useSafeAreaInsets();

  const {
    diamonds,
    dailyClaimed,
    lastRewardMessage,
    diamondPacks,
    rewardActions,
    loading,
    error,
    claimDailyReward,
    claimActionReward,
    claimDiamondPack,
  } = useRewards();

  if (loading) {
    return (
      <ScreenContainer>
        <LoadingState message="Loading rewards..." />
      </ScreenContainer>
    );
  }

  if (error) {
    return (
      <ScreenContainer>
        <View style={styles.stateWrapper}>
          <ErrorState message={error} />
        </View>
      </ScreenContainer>
    );
  }

  const iconsByActionId = {
    'bonus-scene': <Clapperboard size={20} color={theme.colors.secondary} />,
    'finish-chapter': <BookOpen size={20} color={theme.colors.secondary} />,
    'invite-friend': <Share2 size={20} color={theme.colors.secondary} />,
  };

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + 12,
            paddingBottom: insets.bottom + 140,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Rewards</Text>

        <Text style={styles.subtitle}>
          Collect diamonds, unlock premium choices and keep your stories moving.
        </Text>

        <RewardBalanceCard diamonds={diamonds} />

        {lastRewardMessage ? (
          <View style={styles.messagePill}>
            <Text style={styles.messageText}>{lastRewardMessage}</Text>
          </View>
        ) : null}

        <DailyRewardCard
          amount={20}
          alreadyClaimed={dailyClaimed}
          onClaim={claimDailyReward}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Earn more</Text>
          <Text style={styles.sectionCaption}>mock actions</Text>
        </View>

        {rewardActions.map(action => (
          <RewardActionCard
            key={action.id}
            icon={
              iconsByActionId[action.id as keyof typeof iconsByActionId] ?? (
                <Gift size={20} color={theme.colors.secondary} />
              )
            }
            title={action.title}
            description={action.description}
            amount={action.amount}
            onPress={() => claimActionReward(action.id)}
          />
        ))}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Diamond packs</Text>
          <Text style={styles.sectionCaption}>local mock</Text>
        </View>

        <View style={styles.packsGrid}>
          {diamondPacks.map(pack => (
            <DiamondPackCard
              key={pack.id}
              title={pack.title}
              amount={pack.amount}
              priceLabel={pack.priceLabel}
              badge={pack.badge}
              onPress={() => claimDiamondPack(pack.id)}
            />
          ))}
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Gift size={18} color={theme.colors.secondary} />
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Prototype economy</Text>

            <Text style={styles.infoText}>
              These rewards are stored locally with Redux Persist. Later, this
              screen can connect to purchases, ads, daily streaks and backend
              validation.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingHorizontal: theme.spacing.xxl,
  },
  stateWrapper: {
    flex: 1,
    padding: theme.spacing.xxl,
    justifyContent: 'center',
  },
  title: {
    color: theme.colors.text,
    fontSize: 34,
    fontWeight: '800',
    fontFamily: theme.fonts.displaySemiBold,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.small,
    lineHeight: 20,
    marginBottom: theme.spacing.xxl,
  },
  messagePill: {
    borderRadius: theme.radius.pill,
    backgroundColor: 'rgba(244,114,182,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(244,114,182,0.30)',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  messageText: {
    color: theme.colors.secondary,
    fontSize: theme.typography.small,
    fontWeight: '800',
    textAlign: 'center',
  },
  sectionHeader: {
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '800',
    fontFamily: theme.fonts.displaySemiBold,
  },
  sectionCaption: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.tiny,
    fontWeight: '800',
  },
  packsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xxl,
  },
  infoCard: {
    borderRadius: theme.radius.xl,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    padding: theme.spacing.lg,
    flexDirection: 'row',
  },
  infoIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(244,114,182,0.13)',
    borderWidth: 1,
    borderColor: 'rgba(244,114,182,0.24)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.small,
    fontWeight: '900',
    marginBottom: theme.spacing.xs,
  },
  infoText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.tiny,
    lineHeight: 18,
  },
});
