import { Text, View, StyleSheet, Image } from 'react-native';

import { AppButton } from '../../components/ui/AppButton';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';
import { theme } from '../../theme';

export function ProfileScreen() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <ScreenContainer>
      <View style={styles.content}>
        {user.avatar ? <Image source={{ uri: user.avatar }} style={styles.avatar} /> : null}

        <Text style={styles.title}>Perfil</Text>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.diamonds}>💎 {user.diamonds} diamantes</Text>

        <AppButton title="Sair da conta" onPress={handleLogout} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: theme.spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: theme.spacing.sm,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.title,
    fontWeight: '700',
  },
  name: {
    color: theme.colors.text,
    fontSize: theme.typography.subtitle,
    fontWeight: '600',
  },
  diamonds: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body,
    marginBottom: theme.spacing.lg,
  },
});
