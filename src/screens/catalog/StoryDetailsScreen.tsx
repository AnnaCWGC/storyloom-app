import { Text, View, StyleSheet } from 'react-native';

import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { AppButton } from '../../components/ui/AppButton';
import { mockStories } from '../../data/mockStories';
import { theme } from '../../theme';

export function StoryDetailsScreen({ route, navigation }: any) {
  const { storyId } = route.params;

  const story = mockStories.find(item => item.id === storyId);

  if (!story) {
    return (
      <ScreenContainer>
        <View style={styles.content}>
          <Text style={styles.title}>História não encontrada</Text>
        </View>
      </ScreenContainer>
    );
  }

  const firstChapter = story.chapters[0];

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <Text style={styles.title}>{story.title}</Text>

        <Text style={styles.genres}>{story.genres.join(' • ')}</Text>

        <Text style={styles.description}>{story.description}</Text>

        {firstChapter ? (
          <AppButton
            title="Começar história"
            onPress={() =>
              navigation.navigate('StoryReader', {
                storyId: story.id,
                chapterId: firstChapter.id,
              })
            }
          />
        ) : (
          <Text style={styles.description}>Essa história ainda não possui capítulos.</Text>
        )}
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
    fontSize: 34,
    fontWeight: '700',
    marginBottom: theme.spacing.sm,
  },
  genres: {
    color: theme.colors.primary,
    fontSize: theme.typography.small,
    fontWeight: '700',
    marginBottom: theme.spacing.xl,
  },
  description: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body,
    lineHeight: 24,
    marginBottom: theme.spacing.xxl,
  },
});
