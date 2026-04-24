import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';

import { RootNavigator } from './src/navigation/RootNavigator';
import { store } from './src/store';

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <RootNavigator />
    </Provider>
  );
}
