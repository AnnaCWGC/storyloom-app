import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ExploreStoryRow } from '../../components/explore/ExploreStoryRow';
import {
  ExploreStatusFilter,
  StatusFilter,
} from '../../components/explore/StatusFilter';
import { GenreChips } from '../../components/home/GenreChips';
import { SearchBar } from '../../components/home/SearchBar';
import { StoryCoverCard } from '../../components/home/StoryCoverCard';
import { ErrorState } from '../../components/ui/ErrorState';
import { LoadingState } from '../../components/ui/LoadingState';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { useFilteredStories } from '../../hooks/useFilteredStories';
import { theme } from '../../theme';

export function ExploreScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedStatus, setSelectedStatus] =
    useState<ExploreStatusFilter>('all');

  const {
    stories: filteredStories,
    loading,
    error,
  } = useFilteredStories({
    search,
    genre: selectedGenre,
    status: selectedStatus,
  });

  const hasSearch = Boolean(search.trim());

  function goToStoryDetails(storyId: string) {
    navigation.navigate('Story', {
      screen: 'StoryDetails',
      params: {
        storyId,
      },
    });
  }

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + 12,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Explore</Text>

        <Text style={styles.subtitle}>
          Search stories, genres, characters and worlds.
        </Text>

        <SearchBar value={search} onChangeText={setSearch} />

        <GenreChips
          selectedGenre={selectedGenre}
          onSelectGenre={setSelectedGenre}
        />

        <StatusFilter
          selectedStatus={selectedStatus}
          onSelectStatus={setSelectedStatus}
        />

        <View style={styles.resultsHeader}>
          <Text style={styles.sectionTitle}>
            {hasSearch ? 'Search results' : 'All stories'}
          </Text>

          <Text style={styles.resultCount}>
            {filteredStories.length}{' '}
            {filteredStories.length === 1 ? 'story' : 'stories'}
          </Text>
        </View>

        {loading ? (
          <LoadingState message="Loading stories..." />
        ) : error ? (
          <ErrorState message={error} />
        ) : filteredStories.length ? (
          hasSearch ? (
            <View style={styles.rowsList}>
              {filteredStories.map(story => (
                <ExploreStoryRow
                  key={story.id}
                  story={story}
                  onPress={() => goToStoryDetails(story.id)}
                />
              ))}
            </View>
          ) : (
            <View style={styles.grid}>
              {filteredStories.map(story => (
                <View key={story.id} style={styles.gridItem}>
                  <StoryCoverCard
                    story={story}
                    compact
                    onPress={() => goToStoryDetails(story.id)}
                  />
                </View>
              ))}
            </View>
          )
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No stories found</Text>

            <Text style={styles.emptyText}>
              Try another genre, status or search term.
            </Text>
          </View>
        )}
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
  resultsHeader: {
    marginBottom: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '800',
    fontFamily: theme.fonts.displaySemiBold,
  },
  resultCount: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.tiny,
    fontWeight: '800',
  },
  rowsList: {
    gap: theme.spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: theme.spacing.md,
    rowGap: theme.spacing.xl,
  },
  gridItem: {
    width: 108,
  },
  emptyCard: {
    borderRadius: theme.radius.xl,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    padding: theme.spacing.xl,
  },
  emptyTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.body,
    fontWeight: '900',
    marginBottom: theme.spacing.xs,
  },
  emptyText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.small,
    lineHeight: 20,
  },
});
