import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Compass, Gift, Home, Library, User } from 'lucide-react-native';

import { HomeScreen } from '@/screens/catalog/HomeScreen';
import { ExploreScreen } from '@/screens/catalog/ExploreScreen';
import { LibraryScreen } from '@/screens/library/LibraryScreen';
import { ProfileScreen } from '@/screens/profile/ProfileScreen';
import { RewardsScreen } from '@/screens/rewards/RewardsScreen';
import { theme } from '@/theme';
import { AppTabParamList } from '@/navigation/navigation.types';

const Tab = createBottomTabNavigator<AppTabParamList>();

export function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          left: 12,
          right: 12,
          bottom: 0,
          height: 84,
          paddingTop: 8,
          paddingBottom: 12,
          backgroundColor: 'rgba(21, 17, 31, 0.96)',
          borderTopWidth: 1,
          borderTopColor: 'rgba(255,255,255,0.10)',
          elevation: 0,
        },
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          fontFamily: theme.fonts.semiBold,
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Compass color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Library color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="Rewards"
        component={RewardsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Gift color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
