import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, BookOpen, Heart, Play, Sparkles, Star } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChapterListItem } from '../../components/story-details/ChapterListItem';
import { ChapterAccessCard } from '../../components/story-details/ChapterAccessCard';
import { InfoPill } from '../../components/story-details/InfoPill';
import { NoKeysModal } from '../../components/story-details/NoKeysModal';
import { ErrorState } from '../../components/ui/ErrorState';
import { GradientButton } from '../../components/ui/GradientButton';
import { LoadingState } from '../../components/ui/LoadingState';
import { useChapterEntry } from '../../hooks/useChapterEntry';
import { useLibrary } from '../../hooks/useLibrary';
import { useStory } from '../../hooks/useStory';
import { useStoryProgress } from '../../hooks/useStoryProgress';
import { theme } from '../../theme';

export function StoryDetailsScreen({ route, navigation }: any) {
  const { storyId } = route.params;
  const insets = useSafeAreaInsets();
  const { story, loading, error } = useStory(storyId);
  const {
    keys,
    isVip,
    nextKeyAt,
    loading: chapterEntryLoading,
    startChapter,
  } = useChapterEntry();
  const [isNoKeysModalVisible, setIsNoKeysModalVisible] = useState(false);

  const { getStoryProgress } = useStoryProgress();
  const {
    isFavoriteStory,
    toggleFavorite,
    loading: libraryLoading,
  } = useLibrary();

  const progress = getStoryProgress(storyId);
  const isFavorite = isFavoriteStory(storyId);

  if (loading) {
    return (
      <View style={styles.container}>
        <LoadingState message="Loading story..." />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.emptyContainer}>
        <ErrorState message={error} />
      </View>
    );
  }

  if (!story) {
    return (
      <View style={styles.emptyContainer}>
        <ErrorState message="Story not found." />
      </View>
    );
  }

  const selectedStory = story;
  const firstChapter = selectedStory.chapters[0];
  const hasProgress = Boolean(progress);
  const canStartStory = Boolean(firstChapter || hasProgress);

  async function handleOpenChapter(targetChapterId: string) {
    if (chapterEntryLoading) return;

    const result = await startChapter({
      storyId: selectedStory.id,
      chapterId: targetChapterId,
    });

    if (!result.allowed) {
      setIsNoKeysModalVisible(true);
      return;
    }

    navigation.navigate('StoryReader', {
      storyId: selectedStory.id,
      chapterId: targetChapterId,
    });
  }

  async function handleStartOrContinue() {
    if (hasProgress) {
      await handleOpenChapter(progress!.chapterId);
      return;
    }

    if (!firstChapter) return;

    await handleOpenChapter(firstChapter.id);
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
                onPress={() => toggleFavorite(storyId)}
                disabled={libraryLoading}
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
              title={
                chapterEntryLoading
                  ? 'Opening...'
                  : hasProgress
                    ? 'Continue story'
                    : 'Start story'
              }
              icon={
                <Play
                  size={18}
                  color={theme.colors.white}
                  fill={theme.colors.white}
                />
              }
              onPress={handleStartOrContinue}
              disabled={chapterEntryLoading}
              style={styles.mainButton}
            />
          ) : (
            <View style={[styles.disabledButton, styles.mainButton]}>
              <Text style={styles.disabledButtonText}>Coming soon</Text>
            </View>
          )}

          <ChapterAccessCard
            keys={keys}
            maxKeys={3}
            isVip={isVip}
            nextKeyAt={nextKeyAt}
          />

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
                  accessLabel={isVip ? 'VIP' : '1 KEY'}
                  accessType={isVip ? 'vip' : 'key'}
                  isLoading={chapterEntryLoading}
                  onPress={() => handleOpenChapter(chapter.id)}
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

      <NoKeysModal
        visible={isNoKeysModalVisible}
        nextKeyAt={nextKeyAt}
        onClose={() => setIsNoKeysModalVisible(false)}
        onGoToRewards={() => {
          setIsNoKeysModalVisible(false);
          navigation.getParent()?.navigate('App', {
            screen: 'Rewards',
          });
        }}
      />
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
    padding: theme.spacing.xxl,
    justifyContent: 'center',
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
