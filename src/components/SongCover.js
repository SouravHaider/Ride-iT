// Original cover art for songs — a two-tone tile with the track's initial.
// Avoids using any copyrighted album artwork while still looking polished.
// `size` controls the square; `radius` the corner rounding.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { radius as r } from '../theme';

export default function SongCover({ song, size = 48, radius = r.sm }) {
  return (
    <View
      style={[
        styles.tile,
        { width: size, height: size, borderRadius: radius, backgroundColor: song.c1 },
      ]}
    >
      {/* a diagonal slab of the second colour for a bit of depth */}
      <View
        style={[
          styles.slab,
          { backgroundColor: song.c2, borderRadius: radius },
        ]}
      />
      <Text style={[styles.mono, { fontSize: size * 0.42 }]}>{song.mono}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: { alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  slab: {
    position: 'absolute',
    right: -8,
    bottom: -8,
    width: '70%',
    height: '70%',
    opacity: 0.55,
    transform: [{ rotate: '18deg' }],
  },
  mono: { color: '#FFFFFF', fontWeight: '900', opacity: 0.95 },
});
