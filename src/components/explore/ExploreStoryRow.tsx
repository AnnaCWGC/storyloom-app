import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { ChevronRight, Star } from 'lucide-react-native';

import { Story } from '@/domains/stories';
import { theme } from '@/theme';

type ExploreStoryRowProps = {
  story: Story;
  onPress: () => void;
};

export function ExploreStoryRow({ story, onPress }: ExploreStoryRowProps) {
  const imageSource = story.coverImage || story.bannerImage;

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image source={imageSource} style={styles.cover} />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {story.title}
        </Text>

        <Text style={styles.description} numberOfLines={2}>
          {story.subtitle || story.description}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.ratingPill}>
            <Star
              size={11}
              color={theme.colors.secondary}
              fill={theme.colors.secondary}
            />
            <Text style={styles.ratingText}>
              {story.rating?.toFixed(1) ?? '4.8'}
            </Text>
          </View>

          <Text style={styles.metaText}>
            {story.genres[0]} • {story.chapterCount} eps
          </Text>
        </View>
      </View>

      <ChevronRight size={20} color={theme.colors.secondary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 104,
    borderRadius: theme.radius.xl,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    padding: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  cover: {
    width: 72,
    height: 88,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface,
    marginRight: theme.spacing.md,
  },
  content: {
    flex: 1,
    paddingRight: theme.spacing.sm,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.body,
    fontWeight: '900',
    marginBottom: theme.spacing.xs,
  },
  description: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.tiny,
    lineHeight: 17,
    marginBottom: theme.spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  ratingPill: {
    height: 24,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.radius.pill,
    backgroundColor: 'rgba(244,114,182,0.14)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    color: theme.colors.text,
    fontSize: 11,
    fontWeight: '900',
  },
  metaText: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.tiny,
    fontWeight: '700',
  },
});
