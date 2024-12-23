import { Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { HelloWave } from '@/components/HelloWave';

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
