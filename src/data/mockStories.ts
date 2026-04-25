import { storyImages } from '../assets/images/storyImages';
import { Story } from '../types/story';

export const mockStories: Story[] = [
  {
    id: 'the-royal-lie',
    title: 'The Royal Lie',
    subtitle: 'A fake betrothal. A kingdom in crisis.',
    author: 'M. R. Vale',
    description:
      "You were hired to pretend to be the prince's bride. No one warned you that the lie would become the safest thing in a palace full of enemies.",
    genres: ['Romance', 'Drama', 'Royalty'],
    status: 'new',
    coverImage: storyImages.theRoyalLie.cover,
    bannerImage: storyImages.theRoyalLie.banner,
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
            backgroundImage: storyImages.theRoyalLie.scene1,
            speaker: 'Nicolai',
            text: "I didn't come all this way to ask for forgiveness.",
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
            backgroundImage: storyImages.theRoyalLie.scene1,
            speaker: 'Nicolai',
            text: 'Trust is a dangerous thing to give me.',
            nextSceneId: 'scene-5',
          },
          {
            id: 'scene-3',
            backgroundImage: storyImages.theRoyalLie.scene1,
            speaker: 'Nicolai',
            text: 'Of course I am. Everyone in this palace is.',
            nextSceneId: 'scene-5',
          },
          {
            id: 'scene-4',
            backgroundImage: storyImages.theRoyalLie.scene1,
            speaker: 'Nicolai',
            text: 'For one impossible second, he forgets the door behind him.',
            nextSceneId: 'scene-5',
          },
          {
            id: 'scene-5',
            backgroundImage: storyImages.theRoyalLie.scene1,
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
    coverImage: storyImages.aCrownOfThorns.cover,
    bannerImage: storyImages.aCrownOfThorns.banner,
    rating: 4.7,
    chapterCount: 18,
    chapters: [],
  },
  {
    id: 'beyond-the-veil',
    title: 'Beyond the Veil',
    subtitle: 'Some doors should stay closed.',
    author: 'M. R. Vale',
    description:
      'A haunted estate, a missing heir, and a romance that begins where the living world ends.',
    genres: ['Romance', 'Mystery', 'Fantasy'],
    status: 'ongoing',
    coverImage: storyImages.beyondTheVeil.cover,
    bannerImage: storyImages.beyondTheVeil.banner,
    rating: 4.9,
    chapterCount: 10,
    chapters: [],
  },
  {
    id: 'whispers-in-the-dark',
    title: 'Whispers in the Dark',
    subtitle: 'The forest remembers every name.',
    author: 'M. R. Vale',
    description:
      'When your sister disappears near the old woods, the only person willing to help is the monster everyone warned you about.',
    genres: ['Mystery', 'Horror', 'Romance'],
    status: 'completed',
    coverImage: storyImages.whispersInTheDark.cover,
    bannerImage: storyImages.whispersInTheDark.banner,
    rating: 4.6,
    chapterCount: 16,
    chapters: [],
  },
];
