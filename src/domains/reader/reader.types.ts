export type ChapterEntryDTO = {
  storyId: string;
  chapterId: string;
  usedKey: boolean;
};

export type StartChapterParams = {
  storyId: string;
  chapterId: string;
};

export type StartChapterResult =
  | {
      allowed: true;
      usedKey: boolean;
    }
  | {
      allowed: false;
      usedKey: false;
      reason: 'INSUFFICIENT_KEYS';
    };
