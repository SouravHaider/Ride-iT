// Screen 2: Profile (home).
// Now also shows the mini player docked at the bottom (tap it to open the
// full Now Playing). Name comes from mockData (now "M Sourav").

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import PressableScale from '../components/PressableScale';
import RideModeToggle from '../components/RideModeToggle';
import MiniPlayer from '../components/MiniPlayer';
import SettingsSheet from '../components/SettingsSheet';
import { colors, spacing, radius, type } from '../theme';
import { useRideMode } from '../context/RideModeContext';
import { profile as initialProfile, vehicles, routes, friends } from '../data/mockData';

const TABS = ['Vehicles', 'Routes', 'Friends'];

export default function ProfileScreen({ navigation }) {
  const [tab, setTab] = useState('Vehicles');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profile, setProfile] = useState(initialProfile);
  const { ridingMode } = useRideMode();

  const handleLogout = () => {
    setSettingsOpen(false);
    // Return to the Login screen (it's the first screen in the root stack).
    navigation.getParent()?.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={styles.headerActions}>
            <RideModeToggle />
            <PressableScale onPress={() => setSettingsOpen(true)} accessibilityLabel="Settings" style={styles.iconBtn}>
              <Ionicons name="settings-outline" size={22} color={colors.textDim} />
            </PressableScale>
          </View>
        </View>

        {/* Welcome back — affective affordance */}
        <View style={styles.welcome}>
          <Text style={styles.welcomeTitle}>Welcome back, {profile.name.split(' ')[1]}!</Text>
          <Text style={styles.welcomeSub}>Ride safe out there 🏍️</Text>
        </View>

        {/* Identity */}
        <View style={styles.identity}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={34} color={colors.textDim} />
          </View>
          <View style={{ marginLeft: spacing.lg }}>
            <Text style={styles.name}>{profile.name}</Text>
            <View style={styles.locRow}>
              <Ionicons name="location-outline" size={14} color={colors.textDim} />
              <Text style={styles.loc}>{profile.location}</Text>
            </View>
          </View>
        </View>

        {/* Headline stats */}
        <View style={styles.stats}>
          <Stat value={profile.stats.totalRoutes} label="Total Routes" />
          <View style={styles.statDivider} />
          <Stat value={profile.stats.totalDistance} label="Distance" />
          <View style={styles.statDivider} />
          <Stat value={profile.stats.avgSpeed} label="Avg Speed" />
        </View>

        {!ridingMode && (
          <>
            <View style={styles.segment}>
              {TABS.map((t) => {
                const active = t === tab;
                return (
                  <PressableScale
                    key={t}
                    onPress={() => setTab(t)}
                    accessibilityLabel={t}
                    style={[styles.segmentBtn, active && styles.segmentBtnActive]}
                  >
                    <Text style={[styles.segmentText, active && styles.segmentTextActive]}>{t}</Text>
                  </PressableScale>
                );
              })}
            </View>

            {tab === 'Vehicles' && <VehicleList />}
            {tab === 'Routes' && <RouteList />}
            {tab === 'Friends' && <FriendList />}
          </>
        )}
      </ScrollView>

      {/* Mini player docked at the bottom of Profile */}
      {!ridingMode && (
        <View style={styles.playerWrap}>
          <MiniPlayer />
        </View>
      )}

      <SettingsSheet
        visible={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onLogout={handleLogout}
        profile={profile}
        onSaveProfile={setProfile}
      />
    </SafeAreaView>
  );
}

function Stat({ value, label }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function VehicleList() {
  return (
    <View style={styles.list}>
      {vehicles.map((v) => (
        <View key={v.id} style={styles.card}>
          <View style={styles.cardIcon}>
            <MaterialCommunityIcons name="motorbike" size={26} color={colors.accent} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{v.name}</Text>
            <Text style={styles.cardSub}>{v.year}</Text>
          </View>
          {v.primary && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>Primary</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

function RouteList() {
  return (
    <View style={styles.list}>
      {routes.map((r) => (
        <View key={r.id} style={styles.card}>
          <View style={[styles.cardIcon, { backgroundColor: colors.navSoft }]}>
            <Ionicons name="map-outline" size={24} color={colors.nav} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{r.title}</Text>
            <Text style={styles.cardSub}>
              {r.distance} · {r.duration} · ↑ {r.elevation}
            </Text>
          </View>
          <View style={styles.likes}>
            <Ionicons name="heart" size={14} color={colors.danger} />
            <Text style={styles.likesText}>{r.likes}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

function FriendList() {
  return (
    <View style={styles.list}>
      {friends.map((f) => (
        <View key={f.id} style={styles.card}>
          <View style={styles.cardIcon}>
            <Ionicons name="person" size={22} color={colors.textDim} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{f.name}</Text>
            {f.sharingETA && (
              <Text style={styles.cardSub}>Sharing ETA · {f.eta}</Text>
            )}
          </View>
          <View style={[styles.dot, { backgroundColor: f.online ? colors.music : colors.textFaint }]} />
          <PressableScale accessibilityLabel={`Call ${f.name}`} style={styles.callBtn}>
            <Ionicons name="call" size={18} color={colors.music} />
          </PressableScale>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: spacing.lg, paddingBottom: spacing.xxl },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { color: colors.text, fontSize: type.h1, fontWeight: '900' },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  iconBtn: { minHeight: 44, width: 44, alignItems: 'center', justifyContent: 'center' },
  welcome: {
    backgroundColor: colors.accentSoft,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(245,158,11,0.3)',
  },
  welcomeTitle: { color: colors.accent, fontWeight: '800', fontSize: type.h3 },
  welcomeSub: { color: colors.textDim, marginTop: 2 },
  identity: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.xl },
  avatar: {
    width: 64, height: 64, borderRadius: radius.pill,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  name: { color: colors.text, fontSize: type.h2, fontWeight: '800' },
  locRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 4 },
  loc: { color: colors.textDim, fontSize: type.small },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.lg,
    marginTop: spacing.xl,
  },
  stat: { flex: 1, alignItems: 'center' },
  statValue: { color: colors.text, fontSize: type.h3, fontWeight: '800' },
  statLabel: { color: colors.textDim, fontSize: type.tiny, marginTop: 2 },
  statDivider: { width: 1, height: 32, backgroundColor: colors.border },
  segment: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: 4,
    marginTop: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  segmentBtn: { flex: 1, minHeight: 44, alignItems: 'center', justifyContent: 'center', borderRadius: radius.sm },
  segmentBtnActive: { backgroundColor: colors.accent },
  segmentText: { color: colors.textDim, fontWeight: '700' },
  segmentTextActive: { color: colors.bg },
  list: { marginTop: spacing.lg, gap: spacing.md },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  cardIcon: {
    width: 48, height: 48, borderRadius: radius.sm,
    backgroundColor: colors.accentSoft,
    alignItems: 'center', justifyContent: 'center',
    marginRight: spacing.md,
  },
  cardTitle: { color: colors.text, fontSize: type.body, fontWeight: '700' },
  cardSub: { color: colors.textDim, fontSize: type.small, marginTop: 2 },
  tag: { backgroundColor: colors.accentSoft, borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: 4 },
  tagText: { color: colors.accent, fontSize: type.tiny, fontWeight: '700' },
  likes: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  likesText: { color: colors.textDim, fontSize: type.small },
  dot: { width: 10, height: 10, borderRadius: 5, marginRight: spacing.md },
  callBtn: {
    width: 44, height: 44, borderRadius: radius.pill,
    backgroundColor: colors.musicSoft,
    alignItems: 'center', justifyContent: 'center',
  },
  playerWrap: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    paddingTop: spacing.sm,
    backgroundColor: colors.bg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
