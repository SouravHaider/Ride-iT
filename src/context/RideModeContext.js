// Riding Mode is the project's signature safety feature.
// When ON: the UI simplifies to glanceable essentials, text scales up,
// and non-critical chrome is hidden. This is a global toggle, so we use
// React Context to share it across every screen.

import React, { createContext, useContext, useState } from 'react';

const RideModeContext = createContext(null);

export function RideModeProvider({ children }) {
  const [ridingMode, setRidingMode] = useState(false);

  const toggle = () => setRidingMode((v) => !v);

  return (
    <RideModeContext.Provider value={{ ridingMode, toggle, setRidingMode }}>
      {children}
    </RideModeContext.Provider>
  );
}

export function useRideMode() {
  const ctx = useContext(RideModeContext);
  if (!ctx) throw new Error('useRideMode must be used inside RideModeProvider');
  return ctx;
}
