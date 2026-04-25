import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Heart, PlayCircle } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ContinueReadingCard } from '../../components/home/ContinueReadingCard';
import { SectionHeader } from '../../components/home/SectionHeader';
import { StoryCoverCard } from '../../components/home/StoryCoverCard';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { useStories } from '../../hooks/useStories';
import { useAppSelector } from '../../store/hooks';
import { theme } from '../../theme';

export function LibraryScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { stories, loading } = useStories();

  const progressByStory = useAppSelector(
    state => state.storyProgress.progressByStory,
  );
  const favoriteStoryIds = useAppSelector(
    state => state.library.favoriteStoryIds,
  );

  const continuedStories = stories.filter(story => progressByStory[story.id]);
  const favoriteStories = stories.filter(story =>
    favoriteStoryIds.includes(story.id),
  );

  function goToStoryDetails(storyId: string) {
    navigation.navigate('Story', {
      screen: 'StoryDetails',
      params: {
        storyId,
      },
    });
  }

  function continueStory(storyId: string) {
    const progress = progressByStory[storyId];

    if (!progress) return;

    navigation.navigate('Story', {
      screen: 'StoryReader',
      params: {
        storyId,
        chapterId: progress.chapterId,
      },
    });
  }

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 12 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Library</Text>
        <Text style={styles.subtitle}>
          Your saved stories, progress and favorites.
        </Text>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <PlayCircle size={20} color={theme.colors.secondary} />
            <Text style={styles.summaryValue}>{continuedStories.length}</Text>
            <Text style={styles.summaryLabel}>In progress</Text>
          </View>

          <View style={styles.summaryCard}>
            <Heart size={20} color={theme.colors.secondary} />
            <Text style={styles.summaryValue}>{favoriteStories.length}</Text>
            <Text style={styles.summaryLabel}>Favorites</Text>
          </View>
        </View>

        <View style={styles.section}>
          <SectionHeader title="Continue reading" actionLabel="" />

          {loading ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>Loading stories...</Text>
            </View>
          ) : continuedStories.length ? (
            continuedStories.map(story => {
              const progress = progressByStory[story.id];
              const chapterTitle =
                story.chapters.find(chapter => chapter.id === progress.chapterId)
                  ?.title ?? progress.chapterId;

              return (
                <ContinueReadingCard
                  key={story.id}
                  story={story}
                  progress={progress.progress}
                  chapterLabel={chapterTitle}
                  onPress={() => continueStory(story.id)}
                />
              );
            })
          ) : (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>No progress yet</Text>
              <Text style={styles.emptyText}>
                Start a story and it will appear here.
              </Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <SectionHeader title="Favorites" actionLabel="" />

          {loading ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>Loading stories...</Text>
            </View>
          ) : favoriteStories.length ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            >
              {favoriteStories.map(story => (
                <StoryCoverCard
                  key={story.id}
                  story={story}
                  onPress={() => goToStoryDetails(story.id)}
                />
              ))}
            </ScrollView>
          ) : (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>No favorites yet</Text>
              <Text style={styles.emptyText}>
                Tap the heart on a story page to save it here.
              </Text>
            </View>
          )}
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
    paddingBottom: 120,
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
  summaryRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xxl,
  },
  summaryCard: {
    flex: 1,
    minHeight: 98,
    borderRadius: theme.radius.xl,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    padding: theme.spacing.lg,
    justifyContent: 'center',
  },
  summaryValue: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: '900',
    marginTop: theme.spacing.sm,
  },
  summaryLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.tiny,
    fontWeight: '700',
    marginTop: 2,
  },
  section: {
    marginBottom: theme.spacing.xxl,
  },
  horizontalList: {
    paddingRight: theme.spacing.xxl,
  },
  emptyCard: {
    borderRadius: theme.radius.lg,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    padding: theme.spacing.lg,
  },
  emptyTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.body,
    fontWeight: '800',
    marginBottom: theme.spacing.xs,
  },
  emptyText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.small,
    lineHeight: 20,
  },
});
