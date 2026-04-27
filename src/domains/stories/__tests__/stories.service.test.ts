import { storiesService } from '@/domains/stories';

describe('storiesService', () => {
  it('finds all stories', async () => {
    const stories = await storiesService.findAll();

    expect(stories.length).toBeGreaterThan(0);
  });

  it('finds story by id', async () => {
    const story = await storiesService.findById('the-royal-lie');

    expect(story?.id).toBe('the-royal-lie');
    expect(story?.title).toBe('The Royal Lie');
  });

  it('returns null when story does not exist', async () => {
    const story = await storiesService.findById('missing-story');

    expect(story).toBeNull();
  });

  it('searches by text', async () => {
    const stories = await storiesService.search({
      search: 'royal',
      genre: 'All',
      status: 'all',
    });

    expect(stories.some(story => story.id === 'the-royal-lie')).toBe(true);
  });

  it('filters by status', async () => {
    const stories = await storiesService.search({
      status: 'completed',
      genre: 'All',
    });

    expect(stories.every(story => story.status === 'completed')).toBe(true);
  });

  it('filters by genre', async () => {
    const stories = await storiesService.search({
      genre: 'Romance',
      status: 'all',
    });

    expect(stories.every(story => story.genres.includes('Romance'))).toBe(
      true,
    );
  });
});
