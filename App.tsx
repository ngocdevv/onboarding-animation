import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { OnboardingScreen } from './src/screens/onboarding-screen';

const Tab = createBottomTabNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    'CooperFiveOpti-Black': require("./assets/fonts/CooperFiveOpti-Black.otf"),
    'CaveatBrush-Regular': require("./assets/fonts/CaveatBrush-Regular.ttf"),
    'Piepia W01 Regular': require("./assets/fonts/Piepie W01 Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null; // Or return a loading spinner
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <OnboardingScreen />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;