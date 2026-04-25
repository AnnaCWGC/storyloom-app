import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAppSelector } from '../store/hooks';
import { AppTabs } from './AppTabs';
import { AuthNavigator } from './AuthNavigator';
import { StoryNavigator } from './StoryNavigator';

const Stack = createNativeStackNavigator();

export function RootNavigator() {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <>
            <Stack.Screen name="App" component={AppTabs} />
            <Stack.Screen name="Story" component={StoryNavigator} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
