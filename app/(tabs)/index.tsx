import { Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { HelloWave } from '@/components/HelloWave';
import { useTheme } from '@/hooks/useTheme';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#333333', dark: '#333333' }}
      headerImage={
        <Image
          source={require('@/assets/icons/Square284x284Logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Welcome to Star War: X-Wing Wiki</ThemedText>
        <ThemedText>
          Search the rules to the left or search quick build loadouts to the right.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Good Starting places</ThemedText>
        <ThemedView>
          <ThemedText>
            <Link style={{ textDecorationLine: "underline" }} href={{ pathname: "/(content)/rules/[id]", params: { id: "Introduction" } }}>Introduction</Link>
          </ThemedText>
          <ThemedText>
            <Link style={{ textDecorationLine: "underline" }} href={{ pathname: "/(content)/rules/[id]", params: { id: "Quick_Reference" } }}>Quick Reference</Link>
          </ThemedText>
          <ThemedText>
            <Link style={{ textDecorationLine: "underline" }} href={{ pathname: "/(content)/rules/[id]", params: { id: "Wings" } }}>Wings</Link>
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}


/*
 <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>

*/

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
