import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Apple, Mail } from 'lucide-react-native';

import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { GradientButton } from '@/components/ui/GradientButton';
import { SocialButton } from '@/components/ui/SocialButton';
import { theme } from '@/theme';
import { useAuth } from '@/domains/auth';
import { AuthStackParamList } from '@/navigation/navigation.types';

const HERO_IMAGE = require('@/assets/images/auth/login-hero.png');

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: LoginScreenProps) {
  const {
    loading,
    loginWithEmail,
    loginWithGoogle,
    loginWithApple,
  } = useAuth();

  async function handleMockLogin(provider: 'email' | 'google' | 'apple') {
    if (loading) return;

    if (provider === 'google') {
      await loginWithGoogle();
      return;
    }

    if (provider === 'apple') {
      await loginWithApple();
      return;
    }

    await loginWithEmail({
      email: 'anna@storyloom.app',
      password: 'mock-password',
    });
  }

  function handleRegister() {
    navigation.navigate('Register');
  }

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.heroWrapper}>
          <ImageBackground
            source={HERO_IMAGE}
            style={styles.heroImage}
            resizeMode="cover"
          >
            <LinearGradient
              colors={[
                'rgba(15, 13, 22, 0.04)',
                'rgba(15, 13, 22, 0.26)',
                theme.colors.background,
              ]}
              locations={[0, 0.54, 1]}
              style={styles.heroOverlay}
            />
          </ImageBackground>
        </View>

        <View style={styles.content}>
          <View style={styles.brandBlock}>
            <Text style={styles.logo}>Storyloom</Text>

            <View style={styles.ornamentRow}>
              <View style={styles.ornamentLine} />
              <Text style={styles.ornamentStar}>✦</Text>
              <View style={styles.ornamentLine} />
            </View>

            <Text style={styles.subtitle}>
              Choose your path. Live the story.
            </Text>
          </View>

          <View style={styles.actions}>
            <SocialButton
              title={loading ? 'Loading...' : 'Continue with Google'}
              icon={<Text style={styles.googleIcon}>G</Text>}
              disabled={loading}
              onPress={() => handleMockLogin('google')}
            />

            <SocialButton
              title={loading ? 'Loading...' : 'Continue with Apple'}
              icon={
                <Apple
                  size={22}
                  color={theme.colors.white}
                  fill={theme.colors.white}
                />
              }
              disabled={loading}
              onPress={() => handleMockLogin('apple')}
            />

            <GradientButton
              title={loading ? 'Loading...' : 'Sign in with email'}
              icon={<Mail size={22} color={theme.colors.white} />}
              disabled={loading}
              onPress={() => handleMockLogin('email')}
            />
          </View>

          <Pressable style={styles.registerWrapper} onPress={handleRegister}>
            <Text style={styles.registerText}>
              New here?{' '}
              <Text style={styles.registerLink}>Create account</Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  heroWrapper: {
    height: '46%',
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#160019',
  },

  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.xxl,
    paddingBottom: 38,
    marginTop: -24,
  },

  heroImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
  },

  brandBlock: {
    alignItems: 'center',
  },

  logo: {
    color: '#F4C8F1',
    fontSize: theme.typography.logo,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: -1,
    fontFamily: theme.fonts.displaySemiBold,
  },

  ornamentRow: {
    marginTop: -2,
    marginBottom: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  ornamentLine: {
    width: 56,
    height: 1,
    backgroundColor: 'rgba(216, 106, 205, 0.78)',
  },

  ornamentStar: {
    color: theme.colors.primary,
    fontSize: 18,
    marginHorizontal: theme.spacing.sm,
  },

  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body,
    textAlign: 'center',
    marginBottom: theme.spacing.xxl,
  },

  actions: {
    gap: theme.spacing.md,
  },

  googleIcon: {
    color: theme.colors.white,
    fontSize: 22,
    fontWeight: '800',
  },

  registerWrapper: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
  },

  registerText: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.small,
  },

  registerLink: {
    color: theme.colors.secondary,
    fontWeight: '800',
  },
});
