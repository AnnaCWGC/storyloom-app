import { Text, View, StyleSheet } from 'react-native';

import { AppButton } from '../../components/ui/AppButton';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { mockStories } from '../../data/mockStories';
import { useAppSelector } from '../../store/hooks';
import { theme } from '../../theme';

export function HomeScreen({ navigation }: any) {
  const firstStory = mockStories[0];
  const user = useAppSelector(state => state.user);

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <Text style={styles.title}>Hello, {user.name}</Text>

        <Text style={styles.subtitle}>What do you want to live today?</Text>

        <View style={styles.card}>
          <Text style={styles.storyTitle}>{firstStory.title}</Text>
          <Text style={styles.storyDescription}>{firstStory.subtitle}</Text>

          <AppButton
            title="Ver história"
            onPress={() =>
              navigation.navigate('Story', {
                screen: 'StoryDetails',
                params: {
                  storyId: firstStory.id,
                },
              })
            }
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: theme.spacing.xl,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.title,
    fontWeight: '700',
    marginTop: theme.spacing.xl,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body,
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.xxl,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  storyTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.subtitle,
    fontWeight: '700',
    marginBottom: theme.spacing.sm,
  },
  storyDescription: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body,
    marginBottom: theme.spacing.xl,
  },
});
