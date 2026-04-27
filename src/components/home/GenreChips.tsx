import { useRef } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { theme } from '@/theme';

const genres = ['All', 'Romance', 'Fantasy', 'Drama', 'Mystery', 'Horror'];

type GenreChipsProps = {
  selectedGenre: string;
  onSelectGenre: (genre: string) => void;
};

export function GenreChips({ selectedGenre, onSelectGenre }: GenreChipsProps) {
  const scrollRef = useRef<ScrollView>(null);

  function handleSelectGenre(genre: string) {
    onSelectGenre(genre);

    if (genre === 'All' || genre === 'Romance' || genre === 'Fantasy') {
      scrollRef.current?.scrollTo({ x: 0, animated: true });
    }
  }

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
      style={styles.container}
    >
      {genres.map(genre => {
        const isSelected = selectedGenre === genre;

        return (
          <Pressable
            key={genre}
            style={[styles.chip, isSelected && styles.selectedChip]}
            onPress={() => handleSelectGenre(genre)}
          >
            <Text style={[styles.chipText, isSelected && styles.selectedChipText]}>
              {genre}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
  },
  content: {
    gap: theme.spacing.sm,
    paddingRight: theme.spacing.xxl,
  },
  chip: {
    height: 34,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.pill,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedChip: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  chipText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.tiny,
    fontWeight: '700',
  },
  selectedChipText: {
    color: theme.colors.white,
  },
});
