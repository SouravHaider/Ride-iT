// The Riding Mode switch. Tapping it simplifies the whole UI.
// Placed in screen headers so it's reachable from anywhere.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PressableScale from './PressableScale';
import { colors, spacing, radius, type } from '../theme';
import { useRideMode } from '../context/RideModeContext';

export default function RideModeToggle() {
  const { ridingMode, toggle } = useRideMode();
  return (
    <PressableScale
      onPress={toggle}
      accessibilityLabel="Toggle riding mode"
      style={[styles.pill, ridingMode && styles.pillActive]}
    >
      <View style={styles.row}>
        <MaterialCommunityIcons
          name={ridingMode ? 'motorbike' : 'motorbike-off'}
          size={20}
          color={ridingMode ? colors.bg : colors.accent}
        />
        <Text style={[styles.label, ridingMode && styles.labelActive]}>
          {ridingMode ? 'RIDING' : 'Ride'}
        </Text>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  pill: {
    minHeight: 44,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.accent,
    backgroundColor: colors.accentSoft,
    justifyContent: 'center',
  },
  pillActive: { backgroundColor: colors.accent, borderColor: colors.accent },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  label: { color: colors.accent, fontWeight: '800', fontSize: type.small, letterSpacing: 0.5 },
  labelActive: { color: colors.bg },
});
