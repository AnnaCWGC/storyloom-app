import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StoryDetailsScreen } from '../screens/catalog/StoryDetailsScreen';
import { StoryReaderScreen } from '../screens/story/StoryReaderScreen';

const Stack = createNativeStackNavigator();

export function StoryNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="StoryDetails" component={StoryDetailsScreen} />
      <Stack.Screen name="StoryReader" component={StoryReaderScreen} />
    </Stack.Navigator>
  );
}
