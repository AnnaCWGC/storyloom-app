import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

import { Story } from '../../types/story';
import { theme } from '../../theme';

type ContinueReadingCardProps = {
  story: Story;
  chapterLabel: string;
  progress: number;
  onPress: () => void;
};

export function ContinueReadingCard({
  story,
  chapterLabel,
  progress,
  onPress,
}: ContinueReadingCardProps) {
  const progressPercent = Math.round(progress * 100);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image source={story.coverImage} style={styles.thumbnail} />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {story.title}
        </Text>

        <Text style={styles.chapter} numberOfLines={1}>
          {chapterLabel}
        </Text>

        <View style={styles.progressRow}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
          </View>

          <Text style={styles.progressText}>{progressPercent}%</Text>
        </View>
      </View>

      <ChevronRight size={20} color={theme.colors.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 74,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    padding: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 52,
    height: 52,
    borderRadius: 12,
    marginRight: theme.spacing.md,
  },
  content: {
    flex: 1,
    paddingRight: theme.spacing.sm,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.small,
    fontWeight: '800',
  },
  chapter: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.tiny,
    marginTop: 2,
    marginBottom: theme.spacing.sm,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  progressTrack: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.border,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: theme.colors.secondary,
  },
  progressText: {
    color: theme.colors.textSecondary,
    fontSize: 10,
    fontWeight: '700',
  },
});
