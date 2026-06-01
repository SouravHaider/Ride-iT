// Screen 4: Music.
// Now uses the global player + the Drake playlist with original cover tiles.
// The now-playing bar opens the full screen when tapped.

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import PressableScale from '../components/PressableScale';
import MiniPlayer from '../components/MiniPlayer';
import SongCover from '../components/SongCover';
import RideModeToggle from '../components/RideModeToggle';
import { colors, spacing, radius, type } from '../theme';
import { useRideMode } from '../context/RideModeContext';
import { usePlayer } from '../context/PlayerContext';
import { songs } from '../data/mockData';

export default function MusicScreen() {
  const { ridingMode } = useRideMode();
  const { currentId, playing, play, queue, toggleQueue } = usePlayer();
  const [joined, setJoined] = useState(false);

  // Reset "joined" whenever the playing track changes.
  useEffect(() => { setJoined(false); }, [currentId]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Music</Text>
        <RideModeToggle />
      </View>

      {!ridingMode && (
        <View style={styles.searchRow}>
          <Ionicons name="search" size={20} color={colors.textDim} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search your music…"
            placeholderTextColor={colors.textFaint}
          />
        </View>
      )}

      <FlatList
        data={songs}
        keyExtractor={(s) => s.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={!ridingMode ? <Text style={styles.sectionLabel}>DRAKE · PLAYLIST</Text> : null}
        renderItem={({ item }) => {
          const active = item.id === currentId;
          const queued = queue.includes(item.id);
          return (
            <PressableScale
              onPress={() => play(item.id)}
              accessibilityLabel={`Play ${item.title}`}
              style={[styles.row, active && styles.rowActive]}
            >
              <SongCover song={item} size={48} />
              <View style={{ flex: 1, marginLeft: spacing.md }}>
                <Text style={[styles.songTitle, active && { color: colors.music }]} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.songArtist} numberOfLines={1}>
                  {item.artist} · {item.duration}
                </Text>
              </View>
              {active && playing && (
                <Ionicons name="volume-high" size={18} color={colors.music} style={{ marginRight: spacing.sm }} />
              )}
              <PressableScale
                onPress={() => toggleQueue(item.id)}
                accessibilityLabel={queued ? 'Remove from queue' : 'Add to queue'}
                style={styles.addBtn}
              >
                <Ionicons
                  name={queued ? 'checkmark-circle' : 'add-circle-outline'}
                  size={26}
                  color={queued ? colors.music : colors.textDim}
                />
              </PressableScale>
            </PressableScale>
          );
        }}
      />

      {/* Listening together — who else is on this track + join the group */}
      {!ridingMode && <ListeningBanner songId={currentId} joined={joined} setJoined={setJoined} />}

      <View style={styles.playerWrap}>
        <MiniPlayer />
      </View>
    </SafeAreaView>
  );
}

function ListeningBanner({ songId, joined, setJoined }) {
  const song = songs.find((s) => s.id === songId);
  const listeners = song?.listeners || [];
  if (listeners.length === 0) {
    return (
      <View style={styles.listenWrap}>
        <Text style={styles.listenNone}>No friends listening to this track right now</Text>
      </View>
    );
  }
  return (
    <View style={styles.listenWrap}>
      <View style={styles.avatars}>
        {listeners.slice(0, 3).map((name, i) => (
          <View key={name} style={[styles.avatar, { marginLeft: i === 0 ? 0 : -10 }]}>
            <Text style={styles.avatarText}>{name[0]}</Text>
          </View>
        ))}
      </View>
      <View style={{ flex: 1, marginLeft: spacing.md }}>
        <Text style={styles.listenTitle} numberOfLines={1}>
          {listeners.length === 1
            ? `${listeners[0].split(' ')[0]} is listening`
            : `${listeners[0].split(' ')[0]} +${listeners.length - 1} listening`}
        </Text>
        <Text style={styles.listenSub}>to the same song</Text>
      </View>
      <PressableScale
        onPress={() => setJoined((v) => !v)}
        accessibilityLabel={joined ? 'Leave group' : 'Join group'}
        style={[styles.joinBtn, joined && styles.joinBtnActive]}
      >
        <Ionicons name={joined ? 'checkmark' : 'people'} size={16} color={joined ? colors.bg : colors.music} />
        <Text style={[styles.joinText, joined && styles.joinTextActive]}>{joined ? 'Joined' : 'Join'}</Text>
      </PressableScale>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  headerRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingTop: spacing.lg,
  },
  headerTitle: { color: colors.text, fontSize: type.h1, fontWeight: '900' },
  searchRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md, borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: spacing.lg, marginHorizontal: spacing.lg, marginTop: spacing.lg,
    minHeight: 52,
  },
  searchInput: { flex: 1, color: colors.text, fontSize: type.body, marginLeft: spacing.md },
  list: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.md, gap: spacing.sm },
  sectionLabel: { color: colors.textDim, fontSize: type.tiny, fontWeight: '800', letterSpacing: 2, marginBottom: spacing.md },
  row: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md, borderWidth: 1, borderColor: colors.border,
    padding: spacing.md,
  },
  rowActive: { borderColor: colors.music, backgroundColor: colors.musicSoft },
  songTitle: { color: colors.text, fontSize: type.body, fontWeight: '700' },
  songArtist: { color: colors.textDim, fontSize: type.small, marginTop: 2 },
  addBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  listenWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.musicSoft,
    borderWidth: 1,
    borderColor: colors.music,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    minHeight: 56,
  },
  listenNone: { color: colors.textDim, fontSize: type.small, fontStyle: 'italic' },
  avatars: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: colors.music,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: colors.bg,
  },
  avatarText: { color: colors.bg, fontWeight: '900', fontSize: type.small },
  listenTitle: { color: colors.text, fontSize: type.small, fontWeight: '800' },
  listenSub: { color: colors.textDim, fontSize: type.tiny },
  joinBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    borderWidth: 1.5, borderColor: colors.music,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    minHeight: 40,
  },
  joinBtnActive: { backgroundColor: colors.music },
  joinText: { color: colors.music, fontWeight: '800', fontSize: type.small },
  joinTextActive: { color: colors.bg },
  playerWrap: { paddingHorizontal: spacing.lg, paddingBottom: spacing.md },
});
