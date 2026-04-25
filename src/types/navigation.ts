export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AppTabParamList = {
  Home: undefined;
  Explore: undefined;
  Library: undefined;
  Rewards: undefined;
  Profile: undefined;
};

export type StoryStackParamList = {
  StoryDetails: {
    storyId: string;
  };
  StoryReader: {
    storyId: string;
    chapterId: string;
  };
};

export type RootStackParamList = {
  Auth: undefined;
  App:
    | undefined
    | {
        screen: keyof AppTabParamList;
        params?: AppTabParamList[keyof AppTabParamList];
      };
  Story: {
    screen: keyof StoryStackParamList;
    params?: StoryStackParamList[keyof StoryStackParamList];
  };
};
