import {
  registerChoice,
  resetAllStoryProgress,
  resetStoryProgress,
  saveProgress,
  storyProgressReducer,
} from '@/domains/progress';

describe('progress slice', () => {
  it('saves story progress', () => {
    const state = storyProgressReducer(
      undefined,
      saveProgress({
        storyId: 'the-royal-lie',
        chapterId: 'chapter-1',
        sceneId: 'scene-2',
        progress: 0.4,
      }),
    );

    expect(state.progressByStory['the-royal-lie']).toEqual({
      storyId: 'the-royal-lie',
      chapterId: 'chapter-1',
      sceneId: 'scene-2',
      progress: 0.4,
    });
  });

  it('registers choice history', () => {
    const state = storyProgressReducer(
      undefined,
      registerChoice({
        storyId: 'the-royal-lie',
        chapterId: 'chapter-1',
        sceneId: 'scene-1',
        choiceId: 'choice-1',
      }),
    );

    expect(state.choicesHistory).toHaveLength(1);
    expect(state.choicesHistory[0].choiceId).toBe('choice-1');
  });

  it('updates relationship points when choice has relationship effect', () => {
    const state = storyProgressReducer(
      undefined,
      registerChoice({
        storyId: 'the-royal-lie',
        chapterId: 'chapter-1',
        sceneId: 'scene-1',
        choiceId: 'choice-1',
        relationshipTarget: 'Nicolai',
        relationshipValue: 1,
      }),
    );

    expect(state.relationshipPoints.Nicolai).toBe(1);
  });

  it('resets one story progress', () => {
    const withProgress = storyProgressReducer(
      undefined,
      saveProgress({
        storyId: 'the-royal-lie',
        chapterId: 'chapter-1',
        sceneId: 'scene-2',
        progress: 0.4,
      }),
    );

    const state = storyProgressReducer(
      withProgress,
      resetStoryProgress('the-royal-lie'),
    );

    expect(state.progressByStory['the-royal-lie']).toBeUndefined();
  });

  it('resets all progress', () => {
    const withProgress = storyProgressReducer(
      undefined,
      saveProgress({
        storyId: 'the-royal-lie',
        chapterId: 'chapter-1',
        sceneId: 'scene-2',
        progress: 0.4,
      }),
    );

    const state = storyProgressReducer(withProgress, resetAllStoryProgress());

    expect(state.progressByStory).toEqual({});
    expect(state.choicesHistory).toEqual([]);
    expect(state.relationshipPoints).toEqual({});
  });
});
