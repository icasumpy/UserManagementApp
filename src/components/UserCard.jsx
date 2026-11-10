import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/colors';

function getInitials(username = '') {
  return username
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

/**
 * Hiển thị thông tin tóm tắt của người dùng.
 * Chỉ sử dụng các trường username, email và image.
 *
 * @param {object} props
 * @param {{ username?: string, email?: string, image?: string }} [props.user]
 * @param {() => void} [props.onPress]
 */
export default function UserCard({ user, onPress }) {
  const { username = 'Chưa có tên', email = 'Chưa có email', image = '' } = user ?? {};

  const content = (
    <>
      {image ? (
        <Image accessibilityIgnoresInvertColors source={{ uri: image }} style={styles.avatar} />
      ) : (
        <View style={styles.avatarFallback}>
          <Text style={styles.avatarInitials}>{getInitials(username) || '?'}</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.username}>
          {username}
        </Text>
        <Text numberOfLines={1} style={styles.email}>
          {email}
        </Text>
      </View>
    </>
  );

  if (!onPress) {
    return <View style={styles.card}>{content}</View>;
  }

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    backgroundColor: Colors.background,
  },
  cardPressed: {
    backgroundColor: Colors.surfacePressed,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.surface,
  },
  avatarFallback: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surfacePressed,
  },
  avatarInitials: {
    color: Colors.primary,
    fontSize: 17,
    fontWeight: '700',
  },
  info: {
    flex: 1,
    gap: 2,
  },
  username: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  email: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
});
