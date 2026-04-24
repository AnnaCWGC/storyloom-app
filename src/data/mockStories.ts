import { Story } from '../types/story';

export const mockStories: Story[] = [
  {
    id: 'the-royal-lie',
    title: 'The Royal Lie',
    subtitle: 'A fake betrothal. A kingdom in crisis.',
    author: 'M. R. Vale',
    description:
      'You were hired to pretend to be the prince’s bride. No one warned you that the lie would become the safest thing in a palace full of enemies.',
    genres: ['Romance', 'Drama', 'Royalty'],
    status: 'new',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176',
    bannerImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    rating: 4.8,
    chapterCount: 12,
    progress: 0.68,
    chapters: [
      {
        id: 'chapter-1',
        title: 'The Invitation',
        scenes: [
          {
            id: 'scene-1',
            backgroundImage:
              'https://images.unsplash.com/photo-1514539079130-25950c84af65',
            speaker: 'Nicolai',
            text: 'I didn’t come all this way to ask for forgiveness.',
            choices: [
              {
                id: 'choice-1',
                text: 'I trust you.',
                nextSceneId: 'scene-2',
                effect: {
                  type: 'relationship',
                  target: 'Nicolai',
                  value: 1,
                  message: 'Nicolai noticed your trust.',
                },
              },
              {
                id: 'choice-2',
                text: "You're hiding something.",
                nextSceneId: 'scene-3',
              },
              {
                id: 'choice-3',
                text: 'Kiss him before he leaves.',
                nextSceneId: 'scene-4',
                isPremium: true,
                cost: 25,
              },
            ],
          },
          {
            id: 'scene-2',
            backgroundImage:
              'https://images.unsplash.com/photo-1514539079130-25950c84af65',
            speaker: 'Nicolai',
            text: 'Trust is a dangerous thing to give me.',
            nextSceneId: 'scene-5',
          },
          {
            id: 'scene-3',
            backgroundImage:
              'https://images.unsplash.com/photo-1514539079130-25950c84af65',
            speaker: 'Nicolai',
            text: 'Of course I am. Everyone in this palace is.',
            nextSceneId: 'scene-5',
          },
          {
            id: 'scene-4',
            backgroundImage:
              'https://images.unsplash.com/photo-1514539079130-25950c84af65',
            speaker: 'Nicolai',
            text: 'For one impossible second, he forgets the door behind him.',
            nextSceneId: 'scene-5',
          },
          {
            id: 'scene-5',
            backgroundImage:
              'https://images.unsplash.com/photo-1514539079130-25950c84af65',
            speaker: 'Narrator',
            text: 'Outside, the bells begin to ring.',
          },
        ],
      },
    ],
  },
  {
    id: 'a-crown-of-thorns',
    title: 'A Crown of Thorns',
    subtitle: 'Power always asks for blood.',
    author: 'M. R. Vale',
    description:
      'A cursed throne, a forbidden alliance, and a crown that chooses its ruler by pain.',
    genres: ['Fantasy', 'Romance', 'Drama'],
    status: 'ongoing',
    coverImage: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455',
    bannerImage: 'https://images.unsplash.com/photo-1520637836862-4d197d17c55a',
    rating: 4.7,
    chapterCount: 18,
    chapters: [],
  },
];
