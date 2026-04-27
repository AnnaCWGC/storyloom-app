import { Pressable, StyleSheet, Text, View } from 'react-native';

import { StoryChoice } from '@/domains/stories';
import { theme } from '@/theme';

type DialogueBoxProps = {
  speaker?: string;
  text: string;
  choices?: StoryChoice[];
  canContinue: boolean;
  isEnd: boolean;
  onChoicePress: (choice: StoryChoice) => void;
  onContinue: () => void;
  onEnd: () => void;
};

export function DialogueBox({
  speaker,
  text,
  choices,
  canContinue,
  isEnd,
  onChoicePress,
  onContinue,
  onEnd,
}: DialogueBoxProps) {
  const hasChoices = Boolean(choices?.length);

  return (
    <View style={styles.container}>
      {speaker ? (
        <View style={styles.speakerBlock}>
          <Text style={styles.speaker}>{speaker}</Text>

          <View style={styles.ornamentRow}>
            <View style={styles.ornamentLine} />
            <Text style={styles.ornamentStar}>✦</Text>
            <View style={styles.ornamentLine} />
          </View>
        </View>
      ) : null}

      <Text style={styles.dialogueText}>{text}</Text>

      {hasChoices ? (
        <View style={styles.choicesWrapper}>
          {choices?.map(choice => (
            <Pressable
              key={choice.id}
              style={[
                styles.choiceButton,
                choice.isPremium && styles.premiumChoiceButton,
              ]}
              onPress={() => onChoicePress(choice)}
            >
              <Text
                style={[
                  styles.choiceText,
                  choice.isPremium && styles.premiumChoiceText,
                ]}
              >
                {choice.isPremium && choice.cost ? `💎 ${choice.cost}  ` : ''}
                {choice.text}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : null}

      {!hasChoices && canContinue ? (
        <Pressable style={styles.continueButton} onPress={onContinue}>
          <Text style={styles.continueText}>Continuar</Text>
        </Pressable>
      ) : null}

      {!hasChoices && isEnd ? (
        <View style={styles.endWrapper}>
          <Text style={styles.endText}>Fim do capítulo</Text>

          <Pressable style={styles.continueButton} onPress={onEnd}>
            <Text style={styles.continueText}>Voltar ao catálogo</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: theme.radius.xl,
    backgroundColor: 'rgba(26,22,37,0.92)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    padding: theme.spacing.xl,
    shadowColor: theme.colors.black,
    shadowOpacity: 0.36,
    shadowRadius: 24,
    shadowOffset: {
      width: 0,
      height: 16,
    },
    elevation: 12,
  },
  speakerBlock: {
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  speaker: {
    color: theme.colors.secondary,
    fontSize: theme.typography.body,
    fontWeight: '800',
    fontFamily: theme.fonts.displaySemiBold,
    textAlign: 'center',
  },
  ornamentRow: {
    marginTop: theme.spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ornamentLine: {
    width: 42,
    height: 1,
    backgroundColor: 'rgba(244,114,182,0.48)',
  },
  ornamentStar: {
    color: theme.colors.secondary,
    fontSize: 12,
    marginHorizontal: theme.spacing.sm,
  },
  dialogueText: {
    color: theme.colors.text,
    fontSize: 18,
    fontFamily: theme.fonts.regular,
    lineHeight: 28,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  choicesWrapper: {
    gap: theme.spacing.md,
  },
  choiceButton: {
    minHeight: 52,
    borderRadius: theme.radius.md,
    backgroundColor: 'rgba(36,30,51,0.88)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    justifyContent: 'center',
  },
  premiumChoiceButton: {
    backgroundColor: 'rgba(244,114,182,0.13)',
    borderColor: 'rgba(244,114,182,0.86)',
  },
  choiceText: {
    color: theme.colors.text,
    fontSize: theme.typography.body,
    fontWeight: '600',
    fontFamily: theme.fonts.semiBold,
  },
  premiumChoiceText: {
    color: theme.colors.secondary,
    fontWeight: '900',
  },
  continueButton: {
    alignSelf: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
  },
  continueText: {
    color: theme.colors.secondary,
    fontSize: theme.typography.body,
    fontWeight: '900',
    fontFamily: theme.fonts.bold,
  },
  endWrapper: {
    alignItems: 'center',
  },
  endText: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.small,
    fontWeight: '700',
    fontFamily: theme.fonts.semiBold,
    marginBottom: theme.spacing.sm,
  },
});
