// Simple vector logo so the project needs no image assets to run.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, radius, type } from '../theme';

export default function Logo({ tagline = true }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.badge}>
        <MaterialCommunityIcons name="motorbike" size={40} color={colors.accent} />
      </View>
      <Text style={styles.word}>
        RIDE <Text style={{ color: colors.accent }}>IT</Text>
      </Text>
      {tagline && <Text style={styles.tagline}>MOVING YOU AROUND…</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center' },
  badge: {
    width: 96,
    height: 96,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  word: { color: colors.text, fontSize: 34, fontWeight: '900', letterSpacing: 2 },
  tagline: {
    color: colors.textDim,
    fontSize: type.tiny,
    letterSpacing: 3,
    marginTop: spacing.xs,
    fontWeight: '700',
  },
});
