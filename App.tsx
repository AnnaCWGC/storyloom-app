import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { RootNavigator } from './src/navigation/RootNavigator';
import { persistor, store } from './src/store';
import { useLoadFonts } from './src/hooks/useLoadFonts';

export default function App() {
  const fontsLoaded = useLoadFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar style="light" />
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
}
