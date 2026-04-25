import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play } from 'lucide-react-native';

import { Story } from '../../types/story';
import { theme } from '../../theme';

type FeaturedStoryCardProps = {
  story: Story;
  onPress: () => void;
};

export function FeaturedStoryCard({ story, onPress }: FeaturedStoryCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <ImageBackground
        source={story.bannerImage || story.coverImage}
        style={styles.image}
        imageStyle={styles.imageRadius}
        resizeMode="cover"
      >
        <LinearGradient
          colors={[
            'rgba(15,13,22,0.10)',
            'rgba(15,13,22,0.38)',
            'rgba(15,13,22,0.86)',
          ]}
          style={styles.overlay}
        />

        <View style={styles.badge}>
          <Text style={styles.badgeText}>FEATURED</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.textContent}>
            <Text style={styles.title}>{story.title}</Text>

            <Text style={styles.genres} numberOfLines={1}>
              {story.genres.join(' • ')}
            </Text>

            <Text style={styles.subtitle} numberOfLines={2}>
              {story.subtitle}
            </Text>
          </View>

          <View style={styles.startButton}>
            <Play size={15} color={theme.colors.white} fill={theme.colors.white} />
            <Text style={styles.startText}>Start</Text>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 190,
    borderRadius: 22,
    marginBottom: theme.spacing.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(216,106,205,0.26)',
    backgroundColor: theme.colors.surface,
  },
  image: {
    flex: 1,
    padding: theme.spacing.md,
    justifyContent: 'space-between',
  },
  imageRadius: {
    borderRadius: 22,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: theme.spacing.sm,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(216,106,205,0.88)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: theme.colors.white,
    fontSize: 10,
    fontWeight: '900',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  textContent: {
    flex: 1,
  },
  title: {
    color: theme.colors.text,
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '600',
    fontFamily: theme.fonts.displaySemiBold,
    marginBottom: theme.spacing.xs,
  },
  genres: {
    color: theme.colors.secondary,
    fontSize: theme.typography.tiny,
    fontWeight: '800',
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    color: theme.colors.text,
    fontSize: theme.typography.tiny,
    lineHeight: 16,
  },
  startButton: {
    height: 42,
    paddingHorizontal: theme.spacing.md,
    borderRadius: 21,
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  startText: {
    color: theme.colors.white,
    fontSize: theme.typography.small,
    fontWeight: '800',
  },
});
