import { mockStories } from '../data/mockStories';
import { Story } from '../types/story';

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const storiesService = {
  async findAll(): Promise<Story[]> {
    await delay(250);

    return mockStories;
  },

  async findById(storyId: string): Promise<Story | null> {
    await delay(180);

    return mockStories.find(story => story.id === storyId) ?? null;
  },

  async search(params: {
    search?: string;
    genre?: string;
    status?: 'all' | 'new' | 'ongoing' | 'completed';
  }): Promise<Story[]> {
    await delay(250);

    const normalizedSearch = params.search?.trim().toLowerCase() ?? '';
    const selectedGenre = params.genre ?? 'All';
    const selectedStatus = params.status ?? 'all';

    return mockStories.filter(story => {
      const matchesGenre =
        selectedGenre === 'All' || story.genres.includes(selectedGenre as any);

      const matchesStatus =
        selectedStatus === 'all' || story.status === selectedStatus;

      const matchesSearch =
        !normalizedSearch ||
        story.title.toLowerCase().includes(normalizedSearch) ||
        story.subtitle?.toLowerCase().includes(normalizedSearch) ||
        story.description.toLowerCase().includes(normalizedSearch) ||
        story.author.toLowerCase().includes(normalizedSearch) ||
        story.genres.some(genre =>
          genre.toLowerCase().includes(normalizedSearch),
        );

      return matchesGenre && matchesStatus && matchesSearch;
    });
  },
};
