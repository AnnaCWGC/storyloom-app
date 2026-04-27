import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ArrowLeft, Gem, Menu } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '@/theme';

type ReaderTopBarProps = {
  chapterTitle: string;
  diamonds: number;
  progress: number;
  onBack: () => void;
};

export function ReaderTopBar({
  chapterTitle,
  diamonds,
  progress,
  onBack,
}: ReaderTopBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <Pressable style={styles.iconButton} onPress={onBack}>
        <ArrowLeft size={22} color={theme.colors.text} />
      </Pressable>

      <View style={styles.centerContent}>
        <Text style={styles.chapterTitle} numberOfLines={1}>
          {chapterTitle}
        </Text>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${Math.max(4, progress * 100)}%` },
            ]}
          />
        </View>
      </View>

      <View style={styles.rightContent}>
        <View style={styles.diamondsPill}>
          <Gem size={14} color={theme.colors.secondary} fill={theme.colors.secondary} />
          <Text style={styles.diamondsText}>{diamonds}</Text>
        </View>

        <Pressable style={styles.menuButton}>
          <Menu size={20} color={theme.colors.text} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    paddingHorizontal: theme.spacing.xxl,
    paddingBottom: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(15,13,22,0.46)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: theme.spacing.md,
  },
  chapterTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.small,
    fontWeight: '800',
    marginBottom: theme.spacing.sm,
  },
  progressTrack: {
    width: '100%',
    maxWidth: 170,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.16)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: theme.colors.secondary,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  diamondsPill: {
    height: 34,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.radius.pill,
    backgroundColor: 'rgba(15,13,22,0.50)',
    borderWidth: 1,
    borderColor: 'rgba(244,114,182,0.28)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  diamondsText: {
    color: theme.colors.text,
    fontSize: theme.typography.tiny,
    fontWeight: '900',
  },
  menuButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(15,13,22,0.46)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
