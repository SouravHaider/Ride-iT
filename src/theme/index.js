// Central design tokens for Ride It.
// One source of truth keeps the interface consistent (an HCI principle:
// consistency lowers the learning curve). Change a value here and it
// propagates everywhere.

export const colors = {
  // Surfaces — a dark "rider HUD" base so the screen stays glanceable
  // in bright daylight and at night.
  bg: '#0E0F12',
  surface: '#1A1C22',
  surfaceAlt: '#23262E',
  border: '#2E323C',

  // Text
  text: '#F4F5F7',
  textDim: '#9AA0AC',
  textFaint: '#6B7280',

  // Functional colour system (straight from the report):
  // blue = navigation, green = music. Used consistently so an icon's
  // colour alone signals what domain it belongs to.
  nav: '#3B82F6',
  navSoft: 'rgba(59,130,246,0.15)',
  music: '#22C55E',
  musicSoft: 'rgba(34,197,94,0.15)',

  // Brand accent
  accent: '#F59E0B',
  accentSoft: 'rgba(245,158,11,0.15)',

  danger: '#EF4444',
  white: '#FFFFFF',
};

// Generous spacing scale. Large, well-separated targets respect Fitts's Law:
// bigger, closer controls are faster and safer to hit — critical with gloves.
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  pill: 999,
};

export const type = {
  // Sizes scale up in Riding Mode (see RideModeContext) for glanceability.
  h1: 28,
  h2: 22,
  h3: 18,
  body: 16,
  small: 13,
  tiny: 11,
};

// Minimum touch target. Apple/Google guidance is ~44px; we go larger
// because the user may be wearing gloves.
export const TOUCH_TARGET = 56;
