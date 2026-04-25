import { Image, StyleSheet, Text, View } from 'react-native';
import { Gem } from 'lucide-react-native';

import { theme } from '../../theme';

type HomeHeaderProps = {
  name: string;
  diamonds: number;
  avatar?: string;
};

export function HomeHeader({ name, diamonds, avatar }: HomeHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarFallback}>
            <Text style={styles.avatarLetter}>{name[0]}</Text>
          </View>
        )}

        <View>
          <Text style={styles.title}>Hello, {name}</Text>
          <Text style={styles.subtitle}>What do you want to live today?</Text>
        </View>
      </View>

      <View style={styles.diamondsPill}>
        <Gem size={16} color={theme.colors.secondary} fill={theme.colors.secondary} />
        <Text style={styles.diamondsText}>{diamonds}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: theme.spacing.md,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: theme.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  avatarFallback: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surfaceElevated,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  avatarLetter: {
    color: theme.colors.text,
    fontSize: theme.typography.body,
    fontWeight: '800',
  },
  title: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: '800',
    fontFamily: theme.fonts.displaySemiBold,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.tiny,
    marginTop: 2,
  },
  diamondsPill: {
    height: 40,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.pill,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderWidth: 1,
    borderColor: 'rgba(216,106,205,0.28)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  diamondsText: {
    color: theme.colors.text,
    fontSize: theme.typography.small,
    fontWeight: '800',
  },
});
