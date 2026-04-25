import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ContinueReadingCard } from '../../components/home/ContinueReadingCard';
import { FeaturedStoryCard } from '../../components/home/FeaturedStoryCard';
import { GenreChips } from '../../components/home/GenreChips';
import { HomeHeader } from '../../components/home/HomeHeader';
import { SearchBar } from '../../components/home/SearchBar';
import { SectionHeader } from '../../components/home/SectionHeader';
import { StoryCoverCard } from '../../components/home/StoryCoverCard';
import { ErrorState } from '../../components/ui/ErrorState';
import { LoadingState } from '../../components/ui/LoadingState';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { useStories } from '../../hooks/useStories';
import { useStoryProgress } from '../../hooks/useStoryProgress';
import { useAppSelector } from '../../store/hooks';
import { theme } from '../../theme';

export function HomeScreen({ navigation }: any) {
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const insets = useSafeAreaInsets();
  const { stories, loading, error } = useStories();

  const user = useAppSelector(state => state.user);
  const { progressByStory } = useStoryProgress();

  const featuredStory = stories[0];

  const filteredStories = useMemo(() => {
    return stories.filter(story => {
      const matchesGenre =
        selectedGenre === 'All' || story.genres.includes(selectedGenre as any);

      const normalizedSearch = search.trim().toLowerCase();

      const matchesSearch =
        !normalizedSearch ||
        story.title.toLowerCase().includes(normalizedSearch) ||
        story.subtitle?.toLowerCase().includes(normalizedSearch) ||
        story.genres.some(genre =>
          genre.toLowerCase().includes(normalizedSearch),
        );

      return matchesGenre && matchesSearch;
    });
  }, [search, selectedGenre, stories]);

  const popularStories = filteredStories.filter(
    story => story.id !== featuredStory?.id,
  );

  const continuedStories = stories.filter(story => progressByStory[story.id]);

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

  if (loading) {
    return (
      <ScreenContainer>
        <LoadingState message="Loading your stories..." />
      </ScreenContainer>
    );
  }

  if (error) {
    return (
      <ScreenContainer>
        <View style={styles.stateWrapper}>
          <ErrorState message={error} />
        </View>
      </ScreenContainer>
    );
  }

  if (!featuredStory) {
    return (
      <ScreenContainer>
        <View style={styles.stateWrapper}>
          <ErrorState message="No stories available yet." />
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
            paddingTop: insets.top + 8,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader
          name={user?.name ?? 'Reader'}
          diamonds={user?.diamonds ?? 0}
          keys={user?.keys ?? 0}
          avatar={user?.avatar}
        />

        <SearchBar value={search} onChangeText={setSearch} />

        <GenreChips
          selectedGenre={selectedGenre}
          onSelectGenre={setSelectedGenre}
        />

        <FeaturedStoryCard
          story={featuredStory}
          onPress={() => goToStoryDetails(featuredStory.id)}
        />

        <SectionHeader title="Popular now" />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          style={styles.popularScroll}
        >
          {popularStories.map(story => (
            <StoryCoverCard
              key={story.id}
              story={story}
              onPress={() => goToStoryDetails(story.id)}
            />
          ))}
        </ScrollView>

        {continuedStories.length ? (
          <View style={styles.section}>
            <SectionHeader title="Continue reading" />

            {continuedStories.map(story => {
              const progress = progressByStory[story.id];

              return (
                <ContinueReadingCard
                  key={story.id}
                  story={story}
                  progress={progress.progress}
                  chapterLabel={
                    story.chapters.find(
                      chapter => chapter.id === progress.chapterId,
                    )?.title ?? progress.chapterId
                  }
                  onPress={() => continueStory(story.id)}
                />
              );
            })}
          </View>
        ) : null}
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
  horizontalList: {
    paddingRight: theme.spacing.xxl,
  },
  popularScroll: {
    marginBottom: theme.spacing.xxl,
    overflow: 'visible',
  },
  section: {
    marginTop: theme.spacing.sm,
  },
  stateWrapper: {
    flex: 1,
    padding: theme.spacing.xxl,
    justifyContent: 'center',
  },
});
