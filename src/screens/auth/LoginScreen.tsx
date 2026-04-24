import { Text, View, StyleSheet } from 'react-native';

import { AppButton } from '../../components/ui/AppButton';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { useAppDispatch } from '../../store/hooks';
import { login } from '../../store/slices/authSlice';
import { theme } from '../../theme';

export function LoginScreen() {
  const dispatch = useAppDispatch();

  function handleLogin() {
    dispatch(login());
  }

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <Text style={styles.logo}>Storyloom</Text>

        <Text style={styles.subtitle}>Choose your path. Live the story.</Text>

        <AppButton title="Entrar no app" onPress={handleLogin} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: theme.spacing.xl,
    justifyContent: 'center',
  },
  logo: {
    color: theme.colors.text,
    fontSize: 42,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body,
    textAlign: 'center',
    marginBottom: theme.spacing.xxl,
  },
});
