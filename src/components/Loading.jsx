import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/colors';

/**
 * Trạng thái đang tải dùng chung.
 *
 * @param {object} props
 * @param {string} [props.message]
 * @param {boolean} [props.overlay] Hiển thị như lớp phủ toàn màn hình.
 */
export default function Loading({ message = 'Đang tải...', overlay = false }) {
  return (
    <View style={overlay ? styles.overlay : styles.inline}>
      <ActivityIndicator color={Colors.primary} size="large" />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  inline: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 24,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  message: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
});
