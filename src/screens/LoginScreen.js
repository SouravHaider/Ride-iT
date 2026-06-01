// Screen 1: Login / Sign-up.
// On mount we show a brief loading screen — this is "timely feedback"
// (the Time dimension): it tells the user the app is working so they
// aren't left guessing.

import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, ActivityIndicator,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../components/Logo';
import PressableScale from '../components/PressableScale';
import { colors, spacing, radius, type } from '../theme';

export default function LoginScreen({ navigation }) {
  const [booting, setBooting] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 1600);
    return () => clearTimeout(t);
  }, []);

  const goIn = () => navigation.replace('Main');

  if (booting) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loadingWrap}>
          <Logo />
          <ActivityIndicator color={colors.accent} style={{ marginTop: spacing.xl }} />
          <Text style={styles.loadingText}>Loading…</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <View style={styles.content}>
          <Logo />

          <View style={styles.form}>
            <View style={styles.field}>
              <Ionicons name="person-outline" size={20} color={colors.textDim} />
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor={colors.textFaint}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.field}>
              <Ionicons name="lock-closed-outline" size={20} color={colors.textDim} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={colors.textFaint}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPw}
              />
              <PressableScale
                onPress={() => setShowPw((v) => !v)}
                accessibilityLabel="Toggle password visibility"
                style={styles.eye}
              >
                <Ionicons
                  name={showPw ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={colors.textDim}
                />
              </PressableScale>
            </View>

            <PressableScale onPress={goIn} style={styles.primaryBtn} accessibilityLabel="Login">
              <Text style={styles.primaryText}>Login</Text>
            </PressableScale>

            <Text style={styles.legal}>
              By signing in you accept the{' '}
              <Text style={styles.link}>Terms of Use</Text> and{' '}
              <Text style={styles.link}>Privacy Policy</Text>.
            </Text>

            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.or}>OR</Text>
              <View style={styles.line} />
            </View>

            <PressableScale onPress={goIn} style={styles.socialBtn} accessibilityLabel="Continue with Google">
              <Ionicons name="logo-google" size={20} color={colors.text} />
              <Text style={styles.socialText}>Continue with Google</Text>
            </PressableScale>

            <View style={styles.signupRow}>
              <Text style={styles.muted}>No account yet? </Text>
              <PressableScale onPress={goIn} style={styles.signupLink} accessibilityLabel="Sign up">
                <Text style={styles.link}>Sign up</Text>
              </PressableScale>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  flex: { flex: 1 },
  loadingWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: { color: colors.textDim, marginTop: spacing.md, letterSpacing: 1 },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: spacing.xl },
  form: { marginTop: spacing.xxl },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    minHeight: 56,
  },
  input: { flex: 1, color: colors.text, fontSize: type.body, marginLeft: spacing.md },
  eye: { minHeight: 44, justifyContent: 'center' },
  primaryBtn: {
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  primaryText: { color: colors.bg, fontWeight: '800', fontSize: type.body },
  legal: { color: colors.textFaint, fontSize: type.tiny, textAlign: 'center', marginTop: spacing.md, lineHeight: 16 },
  link: { color: colors.nav, fontWeight: '700' },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: spacing.lg },
  line: { flex: 1, height: 1, backgroundColor: colors.border },
  or: { color: colors.textDim, marginHorizontal: spacing.md, fontWeight: '700' },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
  },
  socialText: { color: colors.text, fontWeight: '700', fontSize: type.body },
  signupRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: spacing.xl },
  signupLink: { minHeight: 0 },
  muted: { color: colors.textDim },
});
