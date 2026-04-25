import { StyleSheet, Text, View } from 'react-native';

import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { GradientButton } from '../../components/ui/GradientButton';
import { theme } from '../../theme';

export function RegisterScreen({ navigation }: any) {
  return (
    <ScreenContainer>
      <View style={styles.content}>
        <Text style={styles.title}>Create account</Text>

        <Text style={styles.subtitle}>
          Essa tela ainda vai virar o cadastro bonito. Por enquanto ela so
          existe para validar a navegacao.
        </Text>

        <GradientButton
          title="Back to login"
          onPress={() => navigation.goBack()}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: theme.spacing.xxl,
    justifyContent: 'center',
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.title,
    fontWeight: '800',
    fontFamily: theme.fonts.displaySemiBold,
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body,
    fontFamily: theme.fonts.regular,
    lineHeight: 24,
    marginBottom: theme.spacing.xxl,
  },
});
