import { Text, View, StyleSheet } from 'react-native';

import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { theme } from '../../theme';

export function LibraryScreen() {
  return (
    <ScreenContainer>
      <View style={styles.content}>
        <Text style={styles.title}>Biblioteca</Text>
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
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.title,
    fontWeight: '700',
  },
});
