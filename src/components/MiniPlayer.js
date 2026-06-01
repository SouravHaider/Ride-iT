// The mini player bar. Now appears on Profile, Map and Music.
// Tapping the bar (the song area) opens the full-screen Now Playing.
// Controls (prev/play/next) drive the shared global player.

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PressableScale from './PressableScale';
import SongCover from './SongCover';
import { colors, spacing, radius, type } from '../theme';
import { useRideMode } from '../context/RideModeContext';
import { usePlayer } from '../context/PlayerContext';

export default function MiniPlayer() {
  const { ridingMode } = useRideMode();
  const { current, playing, togglePlay, next, prev, openFull } = usePlayer();
  const iconSize = ridingMode ? 34 : 26;

  return (
    <View style={styles.wrap}>
      {/* Tapping the song/cover area opens the full Now Playing screen */}
      <Pressable
        onPress={openFull}
        accessibilityLabel="Open now playing"
        style={styles.tapArea}
      >
        <SongCover song={current} size={44} />
        <View style={styles.meta}>
          <Text style={[styles.title, ridingMode && styles.titleBig]} numberOfLines={1}>
            {current.title}
          </Text>
          {!ridingMode && (
            <Text style={styles.artist} numberOfLines={1}>
              {current.artist}
            </Text>
          )}
        </View>
      </Pressable>

      <View style={styles.controls}>
        {!ridingMode && (
          <PressableScale onPress={prev} accessibilityLabel="Previous track" style={styles.ctrl}>
            <Ionicons name="play-skip-back" size={iconSize} color={colors.text} />
          </PressableScale>
        )}
        <PressableScale onPress={togglePlay} accessibilityLabel={playing ? 'Pause' : 'Play'} style={styles.ctrl}>
          <Ionicons name={playing ? 'pause' : 'play'} size={iconSize + 4} color={colors.music} />
        </PressableScale>
        <PressableScale onPress={next} accessibilityLabel="Next track" style={styles.ctrl}>
          <Ionicons name="play-skip-forward" size={iconSize} color={colors.text} />
        </PressableScale>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.lg,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tapArea: { flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: spacing.sm },
  meta: { flex: 1, marginLeft: spacing.md },
  title: { color: colors.text, fontSize: type.body, fontWeight: '700' },
  titleBig: { fontSize: type.h3 },
  artist: { color: colors.textDim, fontSize: type.small, marginTop: 2 },
  controls: { flexDirection: 'row', alignItems: 'center' },
  ctrl: { paddingHorizontal: spacing.xs, minHeight: 44 },
});
