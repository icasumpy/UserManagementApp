import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

import { Colors } from '@/constants/colors';

/**
 * Nút dùng chung cho các form/màn hình.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {() => void} [props.onPress]
 * @param {boolean} [props.disabled]
 * @param {boolean} [props.loading]
 * @param {'primary' | 'outline'} [props.variant]
 * @param {import('react-native').StyleProp<import('react-native').ViewStyle>} [props.style]
 */
export default function CustomButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  style,
}) {
  const isDisabled = disabled || loading;
  const isOutline = variant === 'outline';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ busy: loading, disabled: isDisabled }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        isOutline ? styles.outline : styles.primary,
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={isOutline ? Colors.primary : Colors.white} />
      ) : (
        <Text style={[styles.label, isOutline ? styles.outlineLabel : styles.primaryLabel]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryLabel: {
    color: Colors.white,
  },
  outlineLabel: {
    color: Colors.primary,
  },
});
