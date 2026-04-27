import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList> | undefined;
  App: NavigatorScreenParams<AppTabParamList> | undefined;
  Story: NavigatorScreenParams<StoryStackParamList>;
};

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
