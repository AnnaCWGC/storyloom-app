import {
  addFavoriteStory,
  clearLibrary,
  libraryReducer,
  removeFavoriteStory,
  setFavoriteStoryIds,
} from '@/domains/library';

describe('library slice', () => {
  it('sets favorite story ids', () => {
    const state = libraryReducer(
      undefined,
      setFavoriteStoryIds(['story-1', 'story-2']),
    );

    expect(state.favoriteStoryIds).toEqual(['story-1', 'story-2']);
  });

  it('adds favorite without duplicates', () => {
    const state1 = libraryReducer(undefined, addFavoriteStory('story-1'));
    const state2 = libraryReducer(state1, addFavoriteStory('story-1'));

    expect(state2.favoriteStoryIds).toEqual(['story-1']);
  });

  it('removes favorite', () => {
    const state1 = libraryReducer(
      undefined,
      setFavoriteStoryIds(['story-1', 'story-2']),
    );

    const state2 = libraryReducer(state1, removeFavoriteStory('story-1'));

    expect(state2.favoriteStoryIds).toEqual(['story-2']);
  });

  it('clears library', () => {
    const state1 = libraryReducer(undefined, setFavoriteStoryIds(['story-1']));

    const state2 = libraryReducer(state1, clearLibrary());

    expect(state2.favoriteStoryIds).toEqual([]);
  });
});
