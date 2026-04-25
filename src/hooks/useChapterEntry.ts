import { useCallback, useState } from 'react';

import { chapterEntryService } from '../services/chapterEntryService';
import { useWallet } from './useWallet';

type StartChapterParams = {
  storyId: string;
  chapterId: string;
};

type StartChapterResult =
  | {
      allowed: true;
      usedKey: boolean;
    }
  | {
      allowed: false;
      usedKey: false;
      reason: 'INSUFFICIENT_KEYS';
    };

export function useChapterEntry() {
  const {
    keys,
    isVip,
    nextKeyAt,
    canSpendCurrency,
    spendKeys,
  } = useWallet();

  const [loading, setLoading] = useState(false);

  const canStartChapter = useCallback(() => {
    if (isVip) return true;

    return canSpendCurrency('keys', 1);
  }, [canSpendCurrency, isVip]);

  const startChapter = useCallback(
    async ({
      storyId,
      chapterId,
    }: StartChapterParams): Promise<StartChapterResult> => {
      if (isVip) {
        await chapterEntryService.registerChapterEntry({
          storyId,
          chapterId,
          usedKey: false,
        });

        return {
          allowed: true,
          usedKey: false,
        };
      }

      if (!canSpendCurrency('keys', 1)) {
        return {
          allowed: false,
          usedKey: false,
          reason: 'INSUFFICIENT_KEYS',
        };
      }

      try {
        setLoading(true);

        await spendKeys(1, 'chapter_entry', chapterId);

        await chapterEntryService.registerChapterEntry({
          storyId,
          chapterId,
          usedKey: true,
        });

        return {
          allowed: true,
          usedKey: true,
        };
      } finally {
        setLoading(false);
      }
    },
    [canSpendCurrency, isVip, spendKeys],
  );

  return {
    keys,
    isVip,
    nextKeyAt,
    loading,
    canStartChapter,
    startChapter,
  };
}
