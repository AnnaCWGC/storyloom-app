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

type GradientButtonProps = PressableProps & {
  title: string;
  icon?: ReactNode;
  style?: ViewStyle;
};

export function GradientButton({
  title,
  icon,
  style,
  ...props
}: GradientButtonProps) {
  return (
    <Pressable {...props} style={[styles.wrapper, style]}>
      <LinearGradient
        colors={[theme.colors.secondary, theme.colors.primaryStrong]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.button}
      >
        {icon ? <View style={styles.icon}>{icon}</View> : null}

        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  button: {
    height: 56,
    borderRadius: theme.radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.xl,
  },
  icon: {
    position: 'absolute',
    left: theme.spacing.xl,
  },
  text: {
    color: theme.colors.white,
    fontSize: theme.typography.body,
    fontWeight: '700',
  },
});
