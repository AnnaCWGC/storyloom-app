export type ProfilePreferences = {
  notificationsEnabled: boolean;
  matureContentEnabled: boolean;
  reduceMotionEnabled: boolean;
};

export type ProfileState = {
  preferences: ProfilePreferences;
};
