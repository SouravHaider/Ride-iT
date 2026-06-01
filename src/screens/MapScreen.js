// Screen 3: Map / GPS.
// Changes in this version:
//  - Brighter stylised map (was rendering near-black) so route/grid/pins show.
//  - Friends sharing their ETA appear as labelled pins on the map.
//  - A "Sharing ETA" pop-up card lists who's sharing, tappable to expand.
//  - Mini player pulls from the global player and opens full screen on tap.

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import PressableScale from '../components/PressableScale';
import MiniPlayer from '../components/MiniPlayer';
import RideModeToggle from '../components/RideModeToggle';
import { colors, spacing, radius, type } from '../theme';
import { useRideMode } from '../context/RideModeContext';
import { navSteps, sharingFriends } from '../data/mockData';

export default function MapScreen() {
  const { ridingMode } = useRideMode();
  const [stepIdx, setStepIdx] = useState(0);
  const [showSharing, setShowSharing] = useState(true);
  const step = navSteps[stepIdx];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {!ridingMode && (
        <View style={styles.searchWrap}>
          <View style={styles.searchRow}>
            <Ionicons name="navigate-circle-outline" size={20} color={colors.nav} />
            <TextInput
              style={styles.searchInput}
              placeholder="Your location…"
              placeholderTextColor={colors.textFaint}
              defaultValue="Greenwich, London"
            />
          </View>
          <View style={styles.searchRow}>
            <Ionicons name="location-outline" size={20} color={colors.accent} />
            <TextInput
              style={styles.searchInput}
              placeholder="Where to?"
              placeholderTextColor={colors.textFaint}
            />
            <PressableScale accessibilityLabel="Search route" style={styles.searchBtn}>
              <Text style={styles.searchBtnText}>Go</Text>
            </PressableScale>
          </View>
        </View>
      )}

      {/* Turn-by-turn banner */}
      <PressableScale
        onPress={() => setStepIdx((i) => (i + 1) % navSteps.length)}
        accessibilityLabel="Next direction"
        style={[styles.turnBanner, ridingMode && styles.turnBannerBig]}
      >
        <View style={styles.turnIcon}>
          <Ionicons name="arrow-forward" size={ridingMode ? 44 : 32} color={colors.white} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.turnDist, ridingMode && styles.turnDistBig]}>{step.distance}</Text>
          <Text style={[styles.turnText, ridingMode && styles.turnTextBig]} numberOfLines={2}>
            {step.instruction}
          </Text>
        </View>
        <View style={styles.roadTag}>
          <Text style={styles.roadText}>{step.road}</Text>
        </View>
      </PressableScale>

      {/* Map area */}
      <View style={styles.mapWrap}>
        <FakeMap />

        {/* Friend ETA pins, positioned by their x/y percentages */}
        {sharingFriends.map((f) => (
          <View key={f.id} style={[styles.friendPin, { left: `${f.x}%`, top: `${f.y}%` }]}>
            <View style={styles.friendLabel}>
              <Ionicons name="person-circle" size={16} color={colors.white} />
              <Text style={styles.friendLabelText}>{f.name.split(' ')[0]} · {f.eta}</Text>
            </View>
            <View style={styles.friendDotStem} />
            <View style={styles.friendDot} />
          </View>
        ))}

        <View style={styles.mapBadges}>
          <RideModeToggle />
        </View>

        {/* Sharing ETA pop-up card */}
        {!ridingMode && (
          <View style={styles.sharingCard}>
            <PressableScale
              onPress={() => setShowSharing((v) => !v)}
              accessibilityLabel="Toggle sharing list"
              style={styles.sharingHeader}
            >
              <Ionicons name="people" size={18} color={colors.nav} />
              <Text style={styles.sharingTitle}>
                {sharingFriends.length} sharing ETA
              </Text>
              <Ionicons
                name={showSharing ? 'chevron-down' : 'chevron-up'}
                size={18}
                color={colors.textDim}
              />
            </PressableScale>

            {showSharing &&
              sharingFriends.map((f) => (
                <View key={f.id} style={styles.sharingRow}>
                  <View style={styles.sharingDot} />
                  <Text style={styles.sharingName}>{f.name}</Text>
                  <Text style={styles.sharingEta}>{f.eta}</Text>
                </View>
              ))}
          </View>
        )}
      </View>

      {/* Persistent mini player */}
      {!ridingMode && (
        <View style={styles.playerWrap}>
          <MiniPlayer />
        </View>
      )}
    </SafeAreaView>
  );
}

// Brighter stylised map: a lighter base, visible streets grid, a clear route
// line and start/end pins. Pure RN views — runs anywhere, no native module.
function FakeMap() {
  return (
    <View style={styles.fakeMap}>
      {/* a couple of "parks" / blocks for visual interest */}
      <View style={[styles.block, { left: '8%', top: '12%', width: '30%', height: '22%', backgroundColor: 'rgba(34,197,94,0.10)' }]} />
      <View style={[styles.block, { right: '10%', bottom: '16%', width: '34%', height: '26%', backgroundColor: 'rgba(59,130,246,0.08)' }]} />

      {Array.from({ length: 8 }).map((_, i) => (
        <View key={`h${i}`} style={[styles.gridLine, { top: `${(i + 1) * 11}%` }]} />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <View key={`v${i}`} style={[styles.gridLineV, { left: `${(i + 1) * 16}%` }]} />
      ))}

      <View style={styles.routeLine} />
      <View style={styles.pinStart}>
        <Ionicons name="ellipse" size={16} color={colors.nav} />
      </View>
      <View style={styles.pinEnd}>
        <Ionicons name="location" size={28} color={colors.accent} />
      </View>
      <View style={styles.compass}>
        <MaterialCommunityIcons name="compass" size={22} color={colors.textDim} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  searchWrap: { padding: spacing.lg, gap: spacing.md },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    minHeight: 52,
  },
  searchInput: { flex: 1, color: colors.text, fontSize: type.body, marginLeft: spacing.md },
  searchBtn: { backgroundColor: colors.nav, borderRadius: radius.sm, paddingHorizontal: spacing.lg, minHeight: 40, justifyContent: 'center' },
  searchBtnText: { color: colors.white, fontWeight: '800' },
  turnBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.nav,
    marginHorizontal: spacing.lg,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
  },
  turnBannerBig: { marginTop: spacing.lg, paddingVertical: spacing.xl },
  turnIcon: { width: 48, alignItems: 'center' },
  turnDist: { color: colors.white, fontSize: type.h2, fontWeight: '900' },
  turnDistBig: { fontSize: 40 },
  turnText: { color: 'rgba(255,255,255,0.9)', fontSize: type.body, marginTop: 2 },
  turnTextBig: { fontSize: type.h2, marginTop: spacing.xs },
  roadTag: { backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: radius.sm, paddingHorizontal: spacing.md, paddingVertical: 6 },
  roadText: { color: colors.white, fontWeight: '800' },
  mapWrap: { flex: 1, margin: spacing.lg, borderRadius: radius.lg, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  mapBadges: { position: 'absolute', top: spacing.md, right: spacing.md },

  // Brighter base so it no longer looks black
  fakeMap: { flex: 1, backgroundColor: '#2A2F3A' },
  block: { position: 'absolute', borderRadius: radius.sm },
  gridLine: { position: 'absolute', left: 0, right: 0, height: 1, backgroundColor: 'rgba(255,255,255,0.10)' },
  gridLineV: { position: 'absolute', top: 0, bottom: 0, width: 1, backgroundColor: 'rgba(255,255,255,0.10)' },
  routeLine: {
    position: 'absolute',
    left: '20%', top: '70%',
    width: '55%', height: 5,
    backgroundColor: colors.nav,
    borderRadius: 3,
    transform: [{ rotate: '-38deg' }],
  },
  pinStart: { position: 'absolute', left: '18%', top: '68%' },
  pinEnd: { position: 'absolute', right: '20%', top: '24%' },
  compass: { position: 'absolute', left: spacing.md, bottom: spacing.md },

  // Friend ETA pins
  friendPin: { position: 'absolute', alignItems: 'center' },
  friendLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.nav,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  friendLabelText: { color: colors.white, fontSize: type.tiny, fontWeight: '800' },
  friendDotStem: { width: 2, height: 8, backgroundColor: colors.nav },
  friendDot: {
    width: 14, height: 14, borderRadius: 7,
    backgroundColor: colors.white,
    borderWidth: 3, borderColor: colors.nav,
  },

  // Sharing ETA pop-up card
  sharingCard: {
    position: 'absolute',
    left: spacing.md,
    top: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    width: 190,
  },
  sharingHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, minHeight: 36 },
  sharingTitle: { flex: 1, color: colors.text, fontSize: type.small, fontWeight: '800' },
  sharingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  sharingDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.music },
  sharingName: { flex: 1, color: colors.textDim, fontSize: type.small },
  sharingEta: { color: colors.nav, fontSize: type.small, fontWeight: '800' },

  playerWrap: { paddingHorizontal: spacing.lg, paddingBottom: spacing.md },
});
