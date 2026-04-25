import { Image, StyleSheet, Text, View } from 'react-native';

import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { GradientButton } from '../../components/ui/GradientButton';
import { theme } from '../../theme';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';

export function ProfileScreen() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <ScreenContainer>
      <View style={styles.content}>
        {user.avatar ? (
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
        ) : null}

        <Text style={styles.title}>Perfil</Text>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.diamonds}>💎 {user.diamonds} diamantes</Text>

        <View style={styles.buttonWrapper}>
          <GradientButton title="Sair da conta" onPress={handleLogout} />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: theme.spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    marginBottom: theme.spacing.lg,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.title,
    fontWeight: '800',
    marginBottom: theme.spacing.sm,
  },
  name: {
    color: theme.colors.text,
    fontSize: theme.typography.body,
    fontWeight: '800',
    marginBottom: theme.spacing.sm,
  },
  diamonds: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body,
    marginBottom: theme.spacing.xxl,
  },
  buttonWrapper: {
    width: 160,
  },
});
