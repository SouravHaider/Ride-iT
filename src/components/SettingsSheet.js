// Settings sheet that slides up from the gear icon on Profile.
// Includes working Edit profile and Log out actions (plus a few toggles).
// Log out returns to the Login screen; Edit profile opens a simple editable
// name/location form that updates the displayed profile for the session.

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import PressableScale from './PressableScale';
import { colors, spacing, radius, type } from '../theme';

export default function SettingsSheet({ visible, onClose, onLogout, profile, onSaveProfile }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [location, setLocation] = useState(profile.location);

  const save = () => {
    onSaveProfile({ name: name.trim() || profile.name, location: location.trim() || profile.location });
    setEditing(false);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <SafeAreaView style={styles.sheet} edges={['bottom']}>
          <View style={styles.handle} />

          <View style={styles.headerRow}>
            <Text style={styles.title}>{editing ? 'Edit Profile' : 'Settings'}</Text>
            <PressableScale onPress={onClose} accessibilityLabel="Close settings" style={styles.closeBtn}>
              <Ionicons name="close" size={24} color={colors.text} />
            </PressableScale>
          </View>

          {editing ? (
            <View style={styles.form}>
              <Text style={styles.fieldLabel}>Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Your name"
                placeholderTextColor={colors.textFaint}
              />
              <Text style={styles.fieldLabel}>Location</Text>
              <TextInput
                style={styles.input}
                value={location}
                onChangeText={setLocation}
                placeholder="Your location"
                placeholderTextColor={colors.textFaint}
              />
              <PressableScale onPress={save} accessibilityLabel="Save profile" style={styles.saveBtn}>
                <Text style={styles.saveText}>Save changes</Text>
              </PressableScale>
              <PressableScale onPress={() => setEditing(false)} accessibilityLabel="Cancel" style={styles.cancelBtn}>
                <Text style={styles.cancelText}>Cancel</Text>
              </PressableScale>
            </View>
          ) : (
            <View style={styles.menu}>
              <Row icon="person-outline" label="Edit profile" onPress={() => setEditing(true)} />
              <Row icon="notifications-outline" label="Notifications" />
              <Row icon="map-outline" label="Map preferences" />
              <Row icon="lock-closed-outline" label="Privacy" />
              <Row icon="help-circle-outline" label="Help & support" />
              <View style={styles.divider} />
              <Row icon="log-out-outline" label="Log out" danger onPress={onLogout} />
            </View>
          )}
        </SafeAreaView>
      </View>
    </Modal>
  );
}

function Row({ icon, label, onPress, danger }) {
  return (
    <PressableScale onPress={onPress} accessibilityLabel={label} style={styles.row}>
      <Ionicons name={icon} size={22} color={danger ? colors.danger : colors.textDim} />
      <Text style={[styles.rowLabel, danger && { color: colors.danger }]}>{label}</Text>
      {!danger && <Ionicons name="chevron-forward" size={18} color={colors.textFaint} />}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  handle: { alignSelf: 'center', width: 40, height: 4, borderRadius: 2, backgroundColor: colors.border, marginBottom: spacing.lg },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.lg },
  title: { color: colors.text, fontSize: type.h2, fontWeight: '900' },
  closeBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  menu: { gap: spacing.xs },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    minHeight: 56, paddingHorizontal: spacing.sm,
  },
  rowLabel: { flex: 1, color: colors.text, fontSize: type.body, fontWeight: '600' },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.sm },
  form: { gap: spacing.sm },
  fieldLabel: { color: colors.textDim, fontSize: type.small, fontWeight: '700', marginTop: spacing.sm },
  input: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    minHeight: 52,
    color: colors.text,
    fontSize: type.body,
  },
  saveBtn: { backgroundColor: colors.accent, borderRadius: radius.md, alignItems: 'center', marginTop: spacing.lg, minHeight: 52, justifyContent: 'center' },
  saveText: { color: colors.bg, fontWeight: '800', fontSize: type.body },
  cancelBtn: { alignItems: 'center', marginTop: spacing.sm, minHeight: 44, justifyContent: 'center' },
  cancelText: { color: colors.textDim, fontWeight: '700' },
});
