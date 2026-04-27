# Storyloom - Technical Architecture

Storyloom is a React Native / Expo interactive story app inspired by visual novel and choice-based narrative apps.

The project is organized around domain-driven frontend modules. Each domain owns its types, service layer, Redux slice when needed, and public hooks.

## Core stack

- React Native
- Expo
- TypeScript
- React Navigation
- Redux Toolkit
- Redux Persist
- AsyncStorage
- Expo Linear Gradient
- Lucide React Native

## High-level architecture

The app follows this flow:

```txt
screens
  ↓
domain hooks
  ↓
domain services
  ↓
apiClient / mocks
  ↓
Redux state when local persistence is needed
```

Screens should focus on layout and user interaction. Business rules should live in domain hooks and domain services.

## Folder structure

```txt
src/
  assets/
    images/
    fonts/

  components/
    ui/
    home/
    explore/
    story-details/
    reader/
    rewards/
    profile/

  config/
    env.ts

  domains/
    auth/
      auth.types.ts
      auth.service.ts
      auth.slice.ts
      user.slice.ts
      useAuth.ts
      useLogout.ts
      index.ts

    stories/
      story.types.ts
      stories.service.ts
      useStories.ts
      useStory.ts
      useFilteredStories.ts
      mocks/
        mockStories.ts
      index.ts

    reader/
      reader.types.ts
      chapter-entry.service.ts
      useChapterEntry.ts
      useStoryReader.ts
      index.ts

    progress/
      progress.types.ts
      progress.service.ts
      progress.slice.ts
      useStoryProgress.ts
      index.ts

    wallet/
      wallet.types.ts
      wallet.service.ts
      keysRecharge.slice.ts
      useWallet.ts
      index.ts

    rewards/
      rewards.types.ts
      rewards.service.ts
      rewards.slice.ts
      useRewards.ts
      index.ts

    vip/
      vip.service.ts
      vip.slice.ts
      useVip.ts
      index.ts

    library/
      library.types.ts
      library.service.ts
      library.slice.ts
      useLibrary.ts
      index.ts

    profile/
      profile.types.ts
      profile.slice.ts
      useProfilePreferences.ts
      index.ts

  hooks/
    useCountdown.ts
    useLoadFonts.ts

  navigation/
    RootNavigator.tsx
    AuthNavigator.tsx
    AppTabs.tsx
    StoryNavigator.tsx
    navigation.types.ts

  screens/
    auth/
    catalog/
    story/
    library/
    rewards/
    profile/

  services/
    apiClient.ts

  store/
    index.ts
    hooks.ts

  theme/
    index.ts
```

## Domain responsibilities

### Auth

Owns authentication, user session, user profile state, login/logout behavior and user reset on logout.

Files:

```txt
domains/auth/
  auth.types.ts
  auth.service.ts
  auth.slice.ts
  user.slice.ts
  useAuth.ts
  useLogout.ts
```

Current behavior:

- Mock login creates a user.
- User has diamonds, keys and VIP status.
- Logout clears user-specific state across domains.

Future backend endpoints:

- `POST /auth/login`
- `POST /auth/google`
- `POST /auth/apple`
- `POST /auth/logout`
- `GET /me`
- `PATCH /me`

### Stories

Owns story listing, search, story details, chapters, scenes and choices.

Files:

```txt
domains/stories/
  story.types.ts
  stories.service.ts
  useStories.ts
  useStory.ts
  useFilteredStories.ts
  mocks/mockStories.ts
```

Current behavior:

- Uses local mock stories.
- Images are currently local assets or mock image sources.
- Service is prepared to switch from mocks to API.

Future backend endpoints:

- `GET /stories`
- `GET /stories/:storyId`
- `GET /stories/:storyId/chapters`
- `GET /stories/:storyId/chapters/:chapterId`

### Reader

Owns chapter entry and story reading flow.

Files:

```txt
domains/reader/
  reader.types.ts
  chapter-entry.service.ts
  useChapterEntry.ts
  useStoryReader.ts
```

Current behavior:

- Every chapter entry costs 1 key for non-VIP users.
- Re-reading a chapter costs 1 key again.
- VIP users do not spend keys.
- Reader handles scene navigation, choices, progress and feedback through `useStoryReader`.

Future backend endpoints:

- `POST /chapter-entry`

### Progress

Owns story progress, choices history and relationship points.

Files:

```txt
domains/progress/
  progress.types.ts
  progress.service.ts
  progress.slice.ts
  useStoryProgress.ts
```

Current behavior:

- Progress is persisted locally.
- Continue Reading uses story progress.
- Choices can modify relationship points.

Future backend endpoints:

- `GET /progress`
- `POST /progress`
- `POST /progress/choices`
- `DELETE /progress/:storyId`

### Wallet

Owns diamonds, keys and key recharge.

Files:

```txt
domains/wallet/
  wallet.types.ts
  wallet.service.ts
  keysRecharge.slice.ts
  useWallet.ts
```

Current rules:

Diamonds:

- Used for premium choices.

Keys:

- Used to enter chapters.
- Every chapter entry costs 1 key.
- Re-reading costs another key.
- Max key stock is 3.
- 1 key recharges every 8 hours.
- VIP users ignore key limits.

Future backend endpoints:

- `GET /wallet/balance`
- `POST /wallet/currency/add`
- `POST /wallet/currency/spend`

### Rewards

Owns daily rewards, reward actions and diamond packs.

Files:

```txt
domains/rewards/
  rewards.types.ts
  rewards.service.ts
  rewards.slice.ts
  useRewards.ts
```

Current rules:

- Regular user daily reward: 12 diamonds
- VIP daily reward: 30 diamonds

Future backend endpoints:

- `GET /rewards`
- `GET /rewards/actions`
- `POST /rewards/actions/:actionId/claim`
- `GET /rewards/diamond-packs`
- `POST /rewards/diamond-packs/:packId/claim`
- `POST /rewards/daily`

### VIP

Owns VIP subscription state and metadata.

Files:

```txt
domains/vip/
  vip.service.ts
  vip.slice.ts
  useVip.ts
```

Current rules:

VIP:

- Unlimited chapter reads.
- No key spending.
- 30 daily diamonds.

Future backend endpoints:

- `GET /vip/status`
- `POST /vip/start-trial`
- `POST /vip/cancel`

### Library

Owns favorites and saved story references.

Files:

```txt
domains/library/
  library.types.ts
  library.service.ts
  library.slice.ts
  useLibrary.ts
```

Future backend endpoints:

- `GET /library/favorites`
- `POST /library/favorites/:storyId`
- `DELETE /library/favorites/:storyId`

### Profile

Owns app/user preferences.

Files:

```txt
domains/profile/
  profile.types.ts
  profile.slice.ts
  useProfilePreferences.ts
```

Current preferences:

- `notificationsEnabled`
- `matureContentEnabled`
- `reduceMotionEnabled`

## Import rules

Use absolute aliases:

```ts
import { useWallet } from '@/domains/wallet';
import { theme } from '@/theme';
```

Avoid deep relative imports like:

```ts
import { theme } from '../../theme';
```

Allowed dependency direction:

- screens -> domains
- screens -> components
- screens -> theme
- components -> theme
- components -> domain types when needed
- domains -> services/apiClient
- domains -> other domains only when there is a clear business dependency
- store -> domain reducers

Avoid:

- domains importing screens
- domains importing visual components
- services importing screens
- components directly dispatching Redux actions
- screens implementing business rules that belong in hooks/services

## Screen responsibilities

Screens should:

- Compose UI components.
- Call domain hooks.
- Navigate between screens.
- Handle local UI-only state such as modal visibility.

Screens should not:

- Directly call API services.
- Directly implement wallet/reward/progress business rules.
- Directly manipulate multiple Redux slices for domain behavior.

Example:

Bad:

```txt
StoryReaderScreen dispatches spendDiamonds, saveProgress and registerChoice directly.
```

Good:

```txt
StoryReaderScreen calls useStoryReader(), and useStoryReader coordinates wallet/progress/stories.
```

## Service layer

Services are the boundary between app logic and external data.

Current services use mocks when:

```ts
env.USE_MOCKS === true
```

Future services should call:

```ts
apiClient<T>('/endpoint')
```

The UI should not know whether data comes from mocks or backend.

## Redux usage

Redux is used for persisted user-specific state:

- auth
- user
- storyProgress
- library
- profile
- rewards
- keysRecharge
- vip

Redux slices should be owned by their domains.

Domain hooks should hide Redux details from screens.

## Economy rules

### Diamonds

Used for:

- premium choices
- future cosmetic/premium scenes

### Keys

Used for:

- chapter entry
- chapter reread

Rules:

- max keys: 3
- recharge: 1 key every 8 hours
- VIP: no key spending

### VIP

Rules:

- unlimited chapter entry
- daily reward = 30 diamonds
- regular daily reward = 12 diamonds

## Backend readiness

The project is prepared for backend integration through:

- `config/env.ts`
- `services/apiClient.ts`
- domain services
- domain hooks

When backend is ready, replace mock branches inside services. Screens should not need large changes.

## Development checklist for new features

When adding a new feature:

1. Identify the domain.
2. Add types inside the domain.
3. Add/update service functions.
4. Add/update slice only if persisted local state is needed.
5. Expose behavior through a domain hook.
6. Keep screen code mostly presentational.
7. Add UI components under `components/`.
8. Run typecheck.

## Current MVP status

Implemented:

- Login
- Home/Catalog
- Explore
- Story Details
- Story Reader
- Library
- Rewards
- Profile
- Favorites
- Progress
- Diamonds
- Keys
- VIP mock
- No Keys modal
- VIP paywall mock
- Redux Persist
- Mock services
- Backend contract documentation

Pending:

- real backend
- real auth
- real payments/subscriptions
- admin panel
- more stories/chapters/scenes
- production image CDN
- real daily reward reset
- real key recharge validation from backend
