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
    removeFavoriteStory(state, action: PayloadAction<string>) {
      state.favoriteStoryIds = state.favoriteStoryIds.filter(
        id => id !== action.payload,
      );
    },
  },
});

export const { toggleFavoriteStory, removeFavoriteStory } = librarySlice.actions;

export const libraryReducer = librarySlice.reducer;
