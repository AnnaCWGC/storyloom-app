export type StoryProgressDTO = {
  storyId: string;
  chapterId: string;
  sceneId: string;
  progress: number;
};

export type ChoiceHistoryDTO = {
  storyId: string;
  chapterId: string;
  sceneId: string;
  choiceId: string;
  relationshipTarget?: string;
  relationshipValue?: number;
};

export type StoryProgress = {
  storyId: string;
  chapterId: string;
  sceneId: string;
  progress: number;
};

export type ChoiceHistoryItem = {
  storyId: string;
  chapterId: string;
  sceneId: string;
  choiceId: string;
};

export type RelationshipPoints = Record<string, number>;
