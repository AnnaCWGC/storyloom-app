import { ReactNode } from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../theme';

type AppButtonProps = PressableProps & {
  title: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: ReactNode;
  style?: ViewStyle;
};

export function AppButton({
  title,
  variant = 'primary',
  icon,
  style,
  ...props
}: AppButtonProps) {
  if (variant === 'primary') {
    return (
      <Pressable {...props} style={style}>
        <LinearGradient
          colors={[theme.colors.secondary, theme.colors.primaryStrong]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.primaryButton}
        >
          {icon ? <View style={styles.icon}>{icon}</View> : null}
          <Text style={styles.primaryText}>{title}</Text>
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <Pressable
      {...props}
      style={[
        styles.button,
        variant === 'secondary' && styles.secondaryButton,
        variant === 'ghost' && styles.ghostButton,
        style,
      ]}
    >
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      <Text style={[styles.text, variant === 'ghost' && styles.ghostText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    height: 56,
    borderRadius: theme.radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
  },
  button: {
    height: 56,
    borderRadius: theme.radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  primaryText: {
    color: theme.colors.white,
    fontSize: theme.typography.body,
    fontWeight: '700',
  },
  text: {
    color: theme.colors.text,
    fontSize: theme.typography.body,
    fontWeight: '600',
  },
  ghostText: {
    color: theme.colors.primary,
  },
  icon: {
    marginRight: theme.spacing.md,
  },
});
