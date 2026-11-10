import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Colors } from '@/constants/colors';

/**
 * Ô nhập liệu có label, trạng thái focus và thông báo lỗi.
 * Mọi prop còn lại được truyền xuống TextInput.
 *
 * @param {object} props
 * @param {string} [props.label]
 * @param {string} [props.error]
 * @param {import('react-native').StyleProp<import('react-native').ViewStyle>} [props.style]
 */
export default function CustomInput({ label, error, style, onFocus, onBlur, ...inputProps }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.wrapper, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <TextInput
        {...inputProps}
        onBlur={(event) => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        onFocus={(event) => {
          setIsFocused(true);
          onFocus?.(event);
        }}
        placeholderTextColor={inputProps.placeholderTextColor ?? Colors.textSecondary}
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          error && styles.inputError,
          inputProps.editable === false && styles.inputDisabled,
        ]}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    gap: 6,
  },
  label: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    backgroundColor: Colors.background,
    color: Colors.text,
    fontSize: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  inputFocused: {
    borderColor: Colors.primary,
  },
  inputError: {
    borderColor: Colors.error,
  },
  inputDisabled: {
    backgroundColor: Colors.surface,
    color: Colors.textSecondary,
  },
  error: {
    color: Colors.error,
    fontSize: 13,
  },
});
