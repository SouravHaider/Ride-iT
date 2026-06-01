// Full-screen "Now Playing" — opens when the mini player bar is tapped
// (from any screen). Rendered as a Modal so it floats above the tabs.

import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import PressableScale from './PressableScale';
import SongCover from './SongCover';
import { colors, spacing, radius, type } from '../theme';
import { usePlayer } from '../context/PlayerContext';

export default function NowPlaying() {
  const { current, playing, fullScreen, togglePlay, next, prev, closeFull } = usePlayer();

  return (
    <Modal visible={fullScreen} animationType="slide" transparent={false} onRequestClose={closeFull}>
      <SafeAreaView style={styles.safe}>
        {/* top bar */}
        <View style={styles.top}>
          <PressableScale onPress={closeFull} accessibilityLabel="Close" style={styles.iconBtn}>
            <Ionicons name="chevron-down" size={28} color={colors.text} />
          </PressableScale>
          <Text style={styles.topLabel}>NOW PLAYING</Text>
          <View style={styles.iconBtn} />
        </View>

        {/* big art */}
        <View style={styles.artWrap}>
          <SongCover song={current} size={280} radius={radius.lg} />
        </View>

        {/* title / artist */}
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>{current.title}</Text>
          <Text style={styles.artist}>{current.artist} · {current.album}</Text>
        </View>

        {/* fake progress bar */}
        <View style={styles.progressWrap}>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
            <View style={styles.progressKnob} />
          </View>
          <View style={styles.times}>
            <Text style={styles.time}>1:24</Text>
            <Text style={styles.time}>{current.duration}</Text>
          </View>
        </View>

        {/* transport controls */}
        <View style={styles.controls}>
          <PressableScale onPress={prev} accessibilityLabel="Previous" style={styles.sideBtn}>
            <Ionicons name="play-skip-back" size={40} color={colors.text} />
          </PressableScale>
          <PressableScale onPress={togglePlay} accessibilityLabel={playing ? 'Pause' : 'Play'} style={styles.playBtn}>
            <Ionicons name={playing ? 'pause' : 'play'} size={44} color={colors.bg} />
          </PressableScale>
          <PressableScale onPress={next} accessibilityLabel="Next" style={styles.sideBtn}>
            <Ionicons name="play-skip-forward" size={40} color={colors.text} />
          </PressableScale>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg, paddingHorizontal: spacing.xl },
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.sm },
  topLabel: { color: colors.textDim, fontSize: type.tiny, fontWeight: '800', letterSpacing: 2 },
  iconBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  artWrap: { alignItems: 'center', marginTop: spacing.xxl },
  info: { alignItems: 'center', marginTop: spacing.xxl },
  title: { color: colors.text, fontSize: type.h1, fontWeight: '900' },
  artist: { color: colors.textDim, fontSize: type.body, marginTop: spacing.sm },
  progressWrap: { marginTop: spacing.xxl },
  progressTrack: { height: 4, backgroundColor: colors.border, borderRadius: 2, justifyContent: 'center' },
  progressFill: { position: 'absolute', left: 0, width: '35%', height: 4, backgroundColor: colors.music, borderRadius: 2 },
  progressKnob: { position: 'absolute', left: '35%', width: 14, height: 14, borderRadius: 7, backgroundColor: colors.music },
  times: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.sm },
  time: { color: colors.textDim, fontSize: type.small },
  controls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.xxl, marginTop: spacing.xxl },
  sideBtn: { width: 56, height: 56, alignItems: 'center', justifyContent: 'center' },
  playBtn: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: colors.music,
    alignItems: 'center', justifyContent: 'center',
  },
});
