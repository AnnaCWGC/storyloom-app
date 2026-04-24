export type StoryGenre =
  | 'Romance'
  | 'Fantasy'
  | 'Drama'
  | 'Mystery'
  | 'Horror'
  | 'Royalty';

export type StoryChoice = {
  id: string;
  text: string;
  nextSceneId: string;
  isPremium?: boolean;
  cost?: number;
  effect?: {
    type: 'relationship' | 'reputation' | 'memory';
    target?: string;
    value?: number;
    message?: string;
  };
};

export type StoryScene = {
  id: string;
  backgroundImage: string;
  speaker?: string;
  text: string;
  choices?: StoryChoice[];
  nextSceneId?: string;
};

export type StoryChapter = {
  id: string;
  title: string;
  scenes: StoryScene[];
};

export type Story = {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  description: string;
  genres: StoryGenre[];
  status: 'ongoing' | 'completed' | 'new';
  coverImage: string;
  bannerImage: string;
  rating?: number;
  chapterCount: number;
  progress?: number;
  chapters: StoryChapter[];
};
