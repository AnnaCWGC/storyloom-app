import { StyleSheet, TextInput, View } from 'react-native';
import { Search } from 'lucide-react-native';

import { theme } from '@/theme';

type SearchBarProps = {
  value: string;
  onChangeText: (value: string) => void;
};

export function SearchBar({ value, onChangeText }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Search size={19} color={theme.colors.textMuted} />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search stories, characters, themes..."
        placeholderTextColor={theme.colors.textMuted}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 46,
    borderRadius: 23,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderWidth: 1,
    borderColor: 'rgba(216,106,205,0.35)',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  input: {
    flex: 1,
    color: theme.colors.text,
    fontSize: theme.typography.small,
    fontFamily: theme.fonts.regular,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 0,
  },
});
