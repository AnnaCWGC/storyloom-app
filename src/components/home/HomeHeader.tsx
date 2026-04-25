import { Image, StyleSheet, Text, View } from 'react-native';
import { Crown, Gem, Infinity, Key } from 'lucide-react-native';

import { theme } from '../../theme';

type HomeHeaderProps = {
  name: string;
  diamonds: number;
  keys: number;
  isVip: boolean;
  avatar?: string;
};

export function HomeHeader({
  name,
  diamonds,
  keys,
  isVip,
  avatar,
}: HomeHeaderProps) {
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

        <View style={styles.textContent}>
          <Text style={styles.title} numberOfLines={1}>Hello, {name}</Text>
          <Text style={styles.subtitle} numberOfLines={1}>What do you want to live today?</Text>
        </View>
      </View>

      <View style={styles.walletRow}>
        <View style={styles.walletPill}>
          <Gem size={16} color={theme.colors.secondary} fill={theme.colors.secondary} />
          <Text style={styles.walletText}>{diamonds}</Text>
        </View>

        <View style={[styles.walletPill, isVip && styles.vipKeyPill]}>
          {isVip ? (
            <>
              <Infinity size={17} color="#FBBF24" />
              <Text style={styles.vipKeyText}>VIP</Text>
              <Crown size={13} color="#FBBF24" fill="#FBBF24" />
            </>
          ) : (
            <>
              <Key size={16} color={theme.colors.secondary} />
              <Text style={styles.walletText}>{keys}</Text>
            </>
          )}
        </View>
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
  textContent: {
    flex: 1,
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
  walletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  walletPill: {
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
  walletText: {
    color: theme.colors.text,
    fontSize: theme.typography.small,
    fontWeight: '800',
  },
  vipKeyPill: {
    backgroundColor: 'rgba(251,191,36,0.14)',
    borderColor: 'rgba(251,191,36,0.55)',
    shadowColor: '#FBBF24',
    shadowOpacity: 0.28,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 5,
  },
  vipKeyText: {
    color: '#FBBF24',
    fontSize: theme.typography.tiny,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
});
