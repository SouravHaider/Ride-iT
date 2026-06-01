// Global music player state.
// Because the mini player now appears on Profile, Map AND Music — and tapping
// it opens one shared full-screen Now Playing — the current track, play state,
// and "is the full screen open" all live here in Context rather than inside a
// single screen.

import React, { createContext, useContext, useState } from 'react';
import { songs } from '../data/mockData';

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [currentId, setCurrentId] = useState(songs[0].id);
  const [playing, setPlaying] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  const [queue, setQueue] = useState([]);

  const current = songs.find((s) => s.id === currentId) || songs[0];
  const index = songs.findIndex((s) => s.id === currentId);

  const play = (id) => {
    setCurrentId(id);
    setPlaying(true);
  };
  const togglePlay = () => setPlaying((p) => !p);
  const next = () => play(songs[(index + 1) % songs.length].id);
  const prev = () => play(songs[(index - 1 + songs.length) % songs.length].id);
  const openFull = () => setFullScreen(true);
  const closeFull = () => setFullScreen(false);
  const toggleQueue = (id) =>
    setQueue((q) => (q.includes(id) ? q.filter((x) => x !== id) : [...q, id]));

  return (
    <PlayerContext.Provider
      value={{
        current, currentId, playing, fullScreen, queue,
        play, togglePlay, next, prev, openFull, closeFull, toggleQueue,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used inside PlayerProvider');
  return ctx;
}
