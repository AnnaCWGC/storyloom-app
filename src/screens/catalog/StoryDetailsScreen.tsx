import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, BookOpen, Heart, Play, Sparkles, Star } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChapterListItem } from '../../components/story-details/ChapterListItem';
import { InfoPill } from '../../components/story-details/InfoPill';
import { GradientButton } from '../../components/ui/GradientButton';
import { useStories } from '../../hooks/useStories';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleFavoriteStory } from '../../store/slices/librarySlice';
import { theme } from '../../theme';

export function StoryDetailsScreen({ route, navigation }: any) {
  const { storyId } = route.params;
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { findStoryById, loading } = useStories();

  const progressByStory = useAppSelector(
    state => state.storyProgress.progressByStory,
  );
  const favoriteStoryIds = useAppSelector(
    state => state.library.favoriteStoryIds,
  );

  const story = findStoryById(storyId);
  const progress = progressByStory[storyId];
  const isFavorite = favoriteStoryIds.includes(storyId);

  if (!story) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {loading ? 'Loading story...' : 'Historia nao encontrada'}
        </Text>
      </View>
    );
  }

  const selectedStory = story;
  const firstChapter = selectedStory.chapters[0];
  const hasProgress = Boolean(progress);
  const canStartStory = Boolean(firstChapter || hasProgress);

  function handleStartOrContinue() {
    if (hasProgress) {
      navigation.navigate('StoryReader', {
        storyId: selectedStory.id,
        chapterId: progress!.chapterId,
      });

      return;
    }

    if (!firstChapter) return;

    navigation.navigate('StoryReader', {
      storyId: selectedStory.id,
      chapterId: firstChapter.id,
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ImageBackground
          source={story.bannerImage || story.coverImage}
          style={[styles.hero, { paddingTop: insets.top + 8 }]}
          resizeMode="cover"
        >
          <LinearGradient
            colors={[
              'rgba(15,13,22,0.18)',
              'rgba(15,13,22,0.42)',
              theme.colors.background,
            ]}
            locations={[0, 0.48, 1]}
            style={styles.heroOverlay}
          />

          <View style={styles.topBar}>
            <Pressable
              style={styles.iconButton}
              onPress={() => navigation.goBack()}
            >
              <ArrowLeft size={22} color={theme.colors.text} />
            </Pressable>

            <View style={styles.topRightActions}>
              <Pressable
                style={styles.iconButton}
                onPress={() => dispatch(toggleFavoriteStory(storyId))}
              >
                <Heart
                  size={20}
                  color={isFavorite ? theme.colors.secondary : theme.colors.text}
                  fill={isFavorite ? theme.colors.secondary : 'transparent'}
                />
              </Pressable>

              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>
                  {story.status === 'completed'
                    ? 'COMPLETED'
                    : story.status === 'new'
                      ? 'NEW'
                      : 'ONGOING'}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.content}>
          <Text style={styles.title}>{story.title}</Text>

          {story.subtitle ? (
            <Text style={styles.subtitle}>{story.subtitle}</Text>
          ) : null}

          <View style={styles.genresRow}>
            {story.genres.map(genre => (
              <View key={genre} style={styles.genreChip}>
                <Text style={styles.genreText}>{genre}</Text>
              </View>
            ))}
          </View>

          <View style={styles.infoRow}>
            <InfoPill
              icon={
                <Star
                  size={15}
                  color={theme.colors.secondary}
                  fill={theme.colors.secondary}
                />
              }
              value={story.rating?.toFixed(1) ?? '4.8'}
              label="Rating"
            />

            <InfoPill
              icon={<BookOpen size={15} color={theme.colors.secondary} />}
              value={`${story.chapterCount}`}
              label="Chapters"
            />

            <InfoPill
              icon={<Sparkles size={15} color={theme.colors.secondary} />}
              value={story.author}
              label="Author"
            />
          </View>

          <View style={styles.descriptionCard}>
            <Text style={styles.sectionTitle}>Synopsis</Text>
            <Text style={styles.description}>{story.description}</Text>
          </View>

          {canStartStory ? (
            <GradientButton
              title={hasProgress ? 'Continue story' : 'Start story'}
              icon={
                <Play
                  size={18}
                  color={theme.colors.white}
                  fill={theme.colors.white}
                />
              }
              onPress={handleStartOrContinue}
              style={styles.mainButton}
            />
          ) : (
            <View style={[styles.disabledButton, styles.mainButton]}>
              <Text style={styles.disabledButtonText}>Coming soon</Text>
            </View>
          )}

          <View style={styles.chaptersSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Chapters</Text>
              <Text style={styles.chapterCount}>
                {story.chapters.length} available
              </Text>
            </View>

            {story.chapters.length ? (
              story.chapters.map((chapter, index) => (
                <ChapterListItem
                  key={chapter.id}
                  index={index}
                  title={chapter.title}
                  onPress={() =>
                    navigation.navigate('StoryReader', {
                      storyId: story.id,
                      chapterId: chapter.id,
                    })
                  }
                />
              ))
            ) : (
              <View style={styles.emptyChapterCard}>
                <Text style={styles.emptyChapterTitle}>Coming soon</Text>
                <Text style={styles.emptyChapterText}>
                  This story does not have playable chapters yet.
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xxl,
  },
  emptyText: {
    color: theme.colors.text,
    fontSize: theme.typography.body,
    fontWeight: '700',
  },
  scrollContent: {
    paddingBottom: 48,
  },
  hero: {
    height: 330,
    paddingHorizontal: theme.spacing.xxl,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(15,13,22,0.58)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  statusBadge: {
    height: 32,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.pill,
    backgroundColor: 'rgba(216,106,205,0.82)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    color: theme.colors.white,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.7,
  },
  content: {
    marginTop: -54,
    paddingHorizontal: theme.spacing.xxl,
  },
  title: {
    color: theme.colors.text,
    fontSize: 38,
    lineHeight: 44,
    fontWeight: '600',
    fontFamily: theme.fonts.displaySemiBold,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body,
    lineHeight: 22,
    marginBottom: theme.spacing.md,
  },
  genresRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  genreChip: {
    height: 30,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.pill,
    backgroundColor: 'rgba(244,114,182,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(244,114,182,0.30)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  genreText: {
    color: theme.colors.secondary,
    fontSize: theme.typography.tiny,
    fontWeight: '800',
  },
  infoRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.xxl,
  },
  descriptionCard: {
    borderRadius: theme.radius.xl,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '800',
    fontFamily: theme.fonts.displaySemiBold,
  },
  description: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.small,
    lineHeight: 22,
    marginTop: theme.spacing.sm,
  },
  mainButton: {
    marginBottom: theme.spacing.xxl,
  },
  disabledButton: {
    height: 56,
    borderRadius: theme.radius.pill,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButtonText: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.body,
    fontWeight: '800',
  },
  chaptersSection: {
    marginTop: theme.spacing.sm,
  },
  sectionHeader: {
    marginBottom: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chapterCount: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.tiny,
    fontWeight: '700',
  },
  emptyChapterCard: {
    borderRadius: theme.radius.lg,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    padding: theme.spacing.lg,
  },
  emptyChapterTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.body,
    fontWeight: '800',
    marginBottom: theme.spacing.xs,
  },
  emptyChapterText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.small,
    lineHeight: 20,
  },
});
