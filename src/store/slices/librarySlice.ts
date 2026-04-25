import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LibraryState = {
  favoriteStoryIds: string[];
};

const initialState: LibraryState = {
  favoriteStoryIds: [],
};

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    setFavoriteStoryIds(state, action: PayloadAction<string[]>) {
      state.favoriteStoryIds = action.payload;
    },
    addFavoriteStory(state, action: PayloadAction<string>) {
      const storyId = action.payload;

      if (!state.favoriteStoryIds.includes(storyId)) {
        state.favoriteStoryIds.push(storyId);
      }
    },
    removeFavoriteStory(state, action: PayloadAction<string>) {
      state.favoriteStoryIds = state.favoriteStoryIds.filter(
        id => id !== action.payload,
      );
    },
    toggleFavoriteStory(state, action: PayloadAction<string>) {
      const storyId = action.payload;
      const alreadyFavorite = state.favoriteStoryIds.includes(storyId);

      if (alreadyFavorite) {
        state.favoriteStoryIds = state.favoriteStoryIds.filter(
          id => id !== storyId,
        );

        return;
      }

      state.favoriteStoryIds.push(storyId);
    },
    clearLibrary() {
      return initialState;
    },
  },
});

export const {
  setFavoriteStoryIds,
  addFavoriteStory,
  removeFavoriteStory,
  toggleFavoriteStory,
  clearLibrary,
} = librarySlice.actions;

export const libraryReducer = librarySlice.reducer;
