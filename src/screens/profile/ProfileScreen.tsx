import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  Bell,
  BookOpen,
  Gem,
  Heart,
  Infinity,
  Key,
  Library,
  LogOut,
  Moon,
  Settings,
  Sparkles,
  User,
  Zap,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { ProfileStatCard } from '@/components/profile/ProfileStatCard';
import { ProfileMenuItem } from '@/components/profile/ProfileMenuItem';
import { ProfilePreferenceRow } from '@/components/profile/ProfilePreferenceRow';
import { theme } from '@/theme';
import { useLogout } from '@/domains/auth';
import { useLibrary } from '@/domains/library';
import { useProfilePreferences } from '@/domains/profile';
import { useAppSelector } from '@/store/hooks';
import { AppTabParamList } from '@/navigation/navigation.types';

type ProfileScreenProps = BottomTabScreenProps<AppTabParamList, 'Profile'>;

export function ProfileScreen({ navigation }: ProfileScreenProps) {
  const insets = useSafeAreaInsets();
  const {
    loading: logoutLoading,
    logout: handleLogout,
  } = useLogout();

  const user = useAppSelector(state => state.user);
  const progressByStory = useAppSelector(
    state => state.storyProgress.progressByStory,
  );
  const { favoriteStoryIds } = useLibrary();
  const {
    preferences,
    setNotificationsEnabled,
    setMatureContentEnabled,
    setReduceMotionEnabled,
  } = useProfilePreferences();

  const storiesInProgress = Object.keys(progressByStory).length;
  const favoriteCount = favoriteStoryIds.length;

  function goToTab(tabName: keyof AppTabParamList) {
    navigation.navigate(tabName);
  }

  if (!user) {
    return (
      <ScreenContainer>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No user loaded.</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + 12,
            paddingBottom: insets.bottom + 170,
          },
        ]}
        scrollIndicatorInsets={{ bottom: insets.bottom + 120 }}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={['rgba(244,114,182,0.22)', 'rgba(168,85,247,0.12)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.profileCard}
        >
          <View style={styles.profileTopRow}>
            {user.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarFallback}>
                <User size={32} color={theme.colors.text} />
              </View>
            )}

            <View style={styles.profileInfo}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.username}>Storyloom reader</Text>
            </View>

            <View style={styles.settingsCircle}>
              <Settings size={20} color={theme.colors.secondary} />
            </View>
          </View>

          <View style={styles.profileWalletRow}>
            <View style={styles.profileWalletItem}>
              <Gem
                size={18}
                color={theme.colors.secondary}
                fill={theme.colors.secondary}
              />
              <View>
                <Text style={styles.profileWalletValue}>{user.diamonds}</Text>
                <Text style={styles.profileWalletLabel}>diamonds</Text>
              </View>
            </View>

            <View
              style={[
                styles.profileWalletItem,
                user.isVip && styles.profileVipWalletItem,
              ]}
            >
              {user.isVip ? (
                <Infinity size={18} color="#FBBF24" />
              ) : (
                <Key size={18} color={theme.colors.secondary} />
              )}

              <View>
                <Text
                  style={[
                    styles.profileWalletValue,
                    user.isVip && styles.profileVipValue,
                  ]}
                >
                  {user.isVip ? '∞' : user.keys}
                </Text>
                <Text
                  style={[
                    styles.profileWalletLabel,
                    user.isVip && styles.profileVipLabel,
                  ]}
                >
                  {user.isVip ? 'VIP keys' : 'keys'}
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.statsRow}>
          <ProfileStatCard
            icon={<BookOpen size={18} color={theme.colors.secondary} />}
            value={storiesInProgress}
            label="In progress"
          />

          <ProfileStatCard
            icon={<Heart size={18} color={theme.colors.secondary} />}
            value={favoriteCount}
            label="Favorites"
          />

          <ProfileStatCard
            icon={<Sparkles size={18} color={theme.colors.secondary} />}
            value="MVP"
            label="Account"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick access</Text>

          <ProfileMenuItem
            icon={<Library size={20} color={theme.colors.secondary} />}
            title="My library"
            description="Continue stories and view your favorites."
            rightText={`${storiesInProgress + favoriteCount}`}
            onPress={() => goToTab('Library')}
          />

          <ProfileMenuItem
            icon={<Gem size={20} color={theme.colors.secondary} />}
            title="Rewards"
            description="Collect diamonds, keys and daily bonuses."
            rightText={`${user.diamonds} / ${user.isVip ? 'VIP' : user.keys}`}
            onPress={() => goToTab('Rewards')}
          />

          <ProfileMenuItem
            icon={<Zap size={20} color={theme.colors.secondary} />}
            title="Reading activity"
            description="Mock area for future streaks and achievements."
            rightText="Soon"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <ProfilePreferenceRow
            title="Notifications"
            description="Get reminders about new chapters and rewards."
            value={preferences.notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />

          <ProfilePreferenceRow
            title="Mature content"
            description="Allow stories with darker or mature themes."
            value={preferences.matureContentEnabled}
            onValueChange={setMatureContentEnabled}
          />

          <ProfilePreferenceRow
            title="Reduce motion"
            description="Limit animations and visual transitions."
            value={preferences.reduceMotionEnabled}
            onValueChange={setReduceMotionEnabled}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          <ProfileMenuItem
            icon={<Moon size={20} color={theme.colors.secondary} />}
            title="Theme"
            description="Dark romantic theme enabled."
            rightText="Dark"
          />

          <ProfileMenuItem
            icon={<Bell size={20} color={theme.colors.secondary} />}
            title="App notifications"
            description="Managed locally for this prototype."
            rightText={preferences.notificationsEnabled ? 'On' : 'Off'}
          />
        </View>

        <Pressable
          style={[styles.logoutButton, logoutLoading && styles.disabledButton]}
          onPress={handleLogout}
          disabled={logoutLoading}
        >
          <LogOut size={20} color={theme.colors.secondary} />
          <Text style={styles.logoutText}>
            {logoutLoading ? 'Saindo...' : 'Sair da conta'}
          </Text>
        </Pressable>
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
  profileCard: {
    borderRadius: theme.radius.xxl,
    padding: theme.spacing.xl,
    borderWidth: 1,
    borderColor: 'rgba(244,114,182,0.28)',
    marginBottom: theme.spacing.xxl,
  },
  profileTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  avatar: {
    width: 74,
    height: 74,
    borderRadius: 37,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.20)',
    marginRight: theme.spacing.md,
  },
  avatarFallback: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: 'rgba(15,13,22,0.42)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: '900',
    fontFamily: theme.fonts.displaySemiBold,
  },
  username: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.small,
    fontWeight: '700',
    marginTop: 2,
  },
  settingsCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(15,13,22,0.40)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileWalletRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  profileWalletItem: {
    flex: 1,
    minHeight: 72,
    borderRadius: theme.radius.xl,
    backgroundColor: 'rgba(15,13,22,0.32)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  profileVipWalletItem: {
    backgroundColor: 'rgba(251,191,36,0.12)',
    borderColor: 'rgba(251,191,36,0.42)',
  },
  profileWalletValue: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  profileWalletLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.tiny,
    fontWeight: '700',
  },
  profileVipValue: {
    color: '#FBBF24',
  },
  profileVipLabel: {
    color: '#FBBF24',
  },
  statsRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xxl,
  },
  section: {
    marginBottom: theme.spacing.xxl,
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '800',
    fontFamily: theme.fonts.displaySemiBold,
    marginBottom: theme.spacing.md,
  },
  logoutButton: {
    height: 56,
    borderRadius: theme.radius.pill,
    backgroundColor: 'rgba(244,114,182,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(244,114,182,0.32)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  logoutText: {
    color: theme.colors.secondary,
    fontSize: theme.typography.body,
    fontWeight: '900',
  },
  disabledButton: {
    opacity: 0.6,
  },
  emptyState: {
    flex: 1,
    padding: theme.spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  emptyText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body,
    fontWeight: '700',
  },
});
