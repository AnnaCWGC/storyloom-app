# Storyloom

Storyloom is a React Native / Expo interactive story app where players read stories, make choices, spend diamonds on premium choices and use keys to access chapters.

## Stack

- Expo
- React Native
- TypeScript
- React Navigation
- Redux Toolkit
- Redux Persist
- AsyncStorage

## Run

```bash
npm install
npx expo start
```

## Typecheck

```bash
npm run typecheck
```

## Architecture

The app is organized by frontend domains under:

```txt
src/domains/
```

Main domains:

- auth
- stories
- reader
- progress
- wallet
- rewards
- vip
- library
- profile

See:

```txt
docs/ARCHITECTURE.md
```

## Current mode

The app currently uses mocks by default.

Environment config:

```txt
EXPO_PUBLIC_API_URL=
EXPO_PUBLIC_USE_MOCKS=true
```

When the backend is ready, domain services can switch from mocks to API calls through `apiClient`.
