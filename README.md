# 🏍️ Ride It

> A GPS navigation + music app for leisure motorbike riders, built with React Native (Expo).

Ride iT is a mobile app concept for recreational motorcyclists, combining turn-by-turn navigation, music control, ride-sharing with friends, and a safety-first **Riding Mode** in a single, glanceable interface.

[**▶ View the interactive design prototype**](https://xzr77m.axshare.com/) · [**🌐 Live web demo**](https://souravhaider.github.io/Ride-iT/)

---

## 📱 Screenshots

<p align="center">
  <img src="screenshots/01-login.png"    alt="Login"    width="200" />
  <img src="screenshots/02-map.png"      alt="Map / GPS" width="200" />
  <img src="screenshots/03-profile.png"  alt="Profile"  width="200" />
  <img src="screenshots/04-music.png"    alt="Music"    width="200" />
  <img src="screenshots/05-settings.png" alt="Settings" width="200" />
</p>

<p align="center"><sub>Login&nbsp;·&nbsp;Map&nbsp;·&nbsp;Profile&nbsp;·&nbsp;Music&nbsp;·&nbsp;Settings</sub></p>

---

## ✨ Features

- **Login / Sign-up** with a loading screen and social sign-in
- **Profile** — rider identity, ride stats, and Vehicles / Routes / Friends tabs, plus an editable profile and working settings menu
- **Map / GPS** — from/to search, a live map view, a large turn-by-turn banner, friends sharing their ETA shown as map pins, and a docked music player
- **Music** — a searchable playlist with cover art, add-to-queue, a full-screen Now Playing view, and a "listening together" feature to join friends on the same track
- **🛡️ Riding Mode** — a one-tap toggle that strips the UI down to glanceable essentials and scales up text, so the app is safe to glance at while riding

## 🎯 Design focus

Every screen is built around clarity and safety for riders:

| Design goal | How it shows up |
|---|---|
| Large touch targets | Min 56px controls, usable with gloves |
| Reduced distraction | Riding Mode hides everything non-essential |
| Consistency | One shared theme + components across all screens |
| Familiar controls | Universally recognised play/pause/nav icons |
| Clear feedback | Buttons change colour on press; active song highlights |
| Colour system | Blue = navigation, green = music — applied consistently |

## 🛠️ Tech stack

- [Expo](https://expo.dev/) (React Native)
- [React Navigation](https://reactnavigation.org/) — native stack + bottom tabs
- React Context for global state (player, riding mode)
- `@expo/vector-icons`

## 🚀 Getting started

You'll need [Node.js](https://nodejs.org/) installed.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npx expo start
```

Then scan the QR code with the **Expo Go** app on your phone (iOS/Android), or press `w` to open it in your browser.

## 🗺️ Using a real map

The Map screen ships with a lightweight stylised placeholder so the app runs in Expo Go with zero native setup. To use a real interactive map:

```bash
npx expo install react-native-maps
```

Then, in `src/screens/MapScreen.js`, replace the `<FakeMap />` component with a `<MapView />`. (Note: full `react-native-maps` support requires a development build rather than Expo Go.)

## 📁 Project structure

```
ride-it/
├── App.js                # navigation + providers
└── src/
    ├── theme/            # colours, spacing, type — single source of truth
    ├── context/          # global state (player, riding mode)
    ├── components/        # MiniPlayer, NowPlaying, SettingsSheet, etc.
    ├── screens/          # Login, Profile, Map, Music
    └── data/             # mock data
```

## 📋 Roadmap

- [ ] Voice control for navigation & music (hands-free safety)
- [ ] Real GPS via `react-native-maps` + live routing
- [ ] Persist auth & profile
- [ ] Light theme

## 📄 License

MIT — see [LICENSE](LICENSE).
