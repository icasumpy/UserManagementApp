import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

/**
 * Khung tạm cho các màn hình chưa triển khai.
 * Component này sẽ được thay thế khi xây dựng giao diện thật.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.description
 */
export default function PlaceholderScreen({ title, description }) {
  return (
    <ThemedView style={styles.screen}>
      <View style={styles.content}>
        <ThemedText style={styles.title} type="subtitle">
          {title}
        </ThemedText>
        <ThemedText style={styles.description} themeColor="textSecondary">
          {description}
        </ThemedText>
        <ThemedText style={styles.tag} type="code">
          SCAFFOLD
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    width: '100%',
    maxWidth: 520,
    alignItems: 'center',
    gap: 12,
  },
  title: {
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
  },
  tag: {
    marginTop: 8,
    opacity: 0.6,
  },
});
