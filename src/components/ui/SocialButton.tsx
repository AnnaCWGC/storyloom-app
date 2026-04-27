import { ReactNode } from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import { theme } from '@/theme';

type SocialButtonProps = PressableProps & {
  title: string;
  icon: ReactNode;
  style?: ViewStyle;
};

export function SocialButton({
  title,
  icon,
  style,
  ...props
}: SocialButtonProps) {
  return (
    <Pressable {...props} style={[styles.button, style]}>
      <View style={styles.icon}>{icon}</View>

      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 56,
    borderRadius: theme.radius.pill,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  icon: {
    position: 'absolute',
    left: theme.spacing.xl,
  },
  text: {
    color: theme.colors.text,
    fontSize: theme.typography.body,
    fontWeight: '600',
    fontFamily: theme.fonts.semiBold,
  },
});
