import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from 'expo-router';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

NavigationBar.setVisibilityAsync("hidden").catch(err => console.error(err));

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar hidden={false} />

        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(content)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
