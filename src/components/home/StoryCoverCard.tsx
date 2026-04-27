import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Star } from 'lucide-react-native';

import { Story } from '@/domains/stories';
import { theme } from '@/theme';

type StoryCoverCardProps = {
  story: Story;
  onPress: () => void;
  compact?: boolean;
};

export function StoryCoverCard({
  story,
  onPress,
  compact = false,
}: StoryCoverCardProps) {
  const imageSource = story.coverImage || story.bannerImage;

  return (
    <Pressable
      style={[styles.container, compact && styles.compactContainer]}
      onPress={onPress}
    >
      <ImageBackground
        source={imageSource}
        style={styles.cover}
        imageStyle={styles.coverRadius}
        resizeMode="cover"
      >
        <LinearGradient
          colors={[
            'rgba(15,13,22,0.00)',
            'rgba(15,13,22,0.20)',
            'rgba(15,13,22,0.86)',
          ]}
          style={styles.overlay}
        />

        <View style={styles.ratingPill}>
          <Star size={10} color={theme.colors.premium} fill={theme.colors.premium} />
          <Text style={styles.ratingText}>{story.rating?.toFixed(1) ?? '4.8'}</Text>
        </View>

        <View style={styles.titleContent}>
          <Text style={styles.title} numberOfLines={2}>
            {story.title}
          </Text>
        </View>
      </ImageBackground>

      <Text style={styles.meta} numberOfLines={1}>
        {story.genres[0]} • {story.chapterCount} eps
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 108,
    marginRight: theme.spacing.md,
  },
  compactContainer: {
    marginRight: 0,
  },
  cover: {
    width: 108,
    height: 158,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  coverRadius: {
    borderRadius: 14,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  ratingPill: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    height: 22,
    paddingHorizontal: 6,
    borderRadius: 11,
    backgroundColor: 'rgba(15,13,22,0.72)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingText: {
    color: theme.colors.text,
    fontSize: 10,
    fontWeight: '800',
  },
  titleContent: {
    marginTop: 'auto',
    padding: theme.spacing.sm,
  },
  title: {
    color: theme.colors.text,
    fontSize: 13,
    lineHeight: 15,
    fontWeight: '800',
    fontFamily: theme.fonts.displaySemiBold,
  },
  meta: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.tiny,
    marginTop: theme.spacing.sm,
  },
});
