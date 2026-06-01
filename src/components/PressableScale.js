// A pressable that gives immediate visual feedback on touch
// (the report's "Physical Objects" dimension: colour change confirms the
// action was registered). Also enforces a large minimum touch target.

import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { radius, TOUCH_TARGET } from '../theme';

export default function PressableScale({ children, style, onPress, accessibilityLabel }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
      style={({ pressed }) => [
        styles.base,
        style,
        pressed && styles.pressed,
      ]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: TOUCH_TARGET,
    justifyContent: 'center',
    borderRadius: radius.md,
  },
  pressed: {
    opacity: 0.65,
    transform: [{ scale: 0.98 }],
  },
});
