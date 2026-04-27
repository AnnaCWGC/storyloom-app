import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '@/theme';

export type ExploreStatusFilter = 'all' | 'new' | 'ongoing' | 'completed';

type StatusFilterProps = {
  selectedStatus: ExploreStatusFilter;
  onSelectStatus: (status: ExploreStatusFilter) => void;
};

const statusOptions: Array<{
  label: string;
  value: ExploreStatusFilter;
}> = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'New',
    value: 'new',
  },
  {
    label: 'Ongoing',
    value: 'ongoing',
  },
  {
    label: 'Completed',
    value: 'completed',
  },
];

export function StatusFilter({
  selectedStatus,
  onSelectStatus,
}: StatusFilterProps) {
  return (
    <View style={styles.container}>
      {statusOptions.map(option => {
        const isSelected = selectedStatus === option.value;

        return (
          <Pressable
            key={option.value}
            style={[styles.option, isSelected && styles.selectedOption]}
            onPress={() => onSelectStatus(option.value)}
          >
            <Text
              style={[
                styles.optionText,
                isSelected && styles.selectedOptionText,
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 44,
    borderRadius: theme.radius.pill,
    backgroundColor: 'rgba(255,255,255,0.045)',
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    padding: 4,
    flexDirection: 'row',
    marginBottom: theme.spacing.xxl,
  },
  option: {
    flex: 1,
    minHeight: 34,
    borderRadius: theme.radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.sm,
  },
  selectedOption: {
    backgroundColor: theme.colors.primary,
  },
  optionText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.tiny,
    fontWeight: '800',
    fontFamily: theme.fonts.bold,
  },
  selectedOptionText: {
    color: theme.colors.white,
  },
});
