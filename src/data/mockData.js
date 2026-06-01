// Placeholder data so the app feels real without a backend.
// Swap these out for API calls when you build the real thing.

export const profile = {
  name: 'M Sourav',
  location: 'London, UK',
  stats: {
    totalRoutes: 345,
    totalDistance: '3,456 km',
    avgSpeed: '74 km/h',
  },
};

export const vehicles = [
  { id: 'v1', name: 'Triumph Trident 660', year: '2023', primary: true },
  { id: 'v2', name: 'Kawasaki Ninja H2R', year: '2021', primary: false },
  { id: 'v3', name: 'BMW S1000RR', year: '2022', primary: false },
];

export const routes = [
  { id: 'r1', title: 'Coastal Loop', distance: '11.5 km', duration: '20:28', elevation: '52 m', likes: 31 },
  { id: 'r2', title: 'Gothenburg Run', distance: '24.2 km', duration: '41:10', elevation: '88 m', likes: 18 },
  { id: 'r3', title: 'Morning Commute', distance: '8.3 km', duration: '15:02', elevation: '20 m', likes: 7 },
];

// Friends list. Those with `sharingETA: true` show up as labelled pins on the
// Map and in the "Sharing ETA" pop-up. x/y are percentage positions on the
// stylised map (0–100), eta is their estimated arrival.
export const friends = [
  { id: 'f1', name: 'Ali Reza', online: true, sharingETA: true, eta: '6 min', x: 32, y: 40 },
  { id: 'f2', name: 'Abdulla Khan', online: false, sharingETA: false },
  { id: 'f3', name: 'Alam Bhai', online: true, sharingETA: true, eta: '12 min', x: 64, y: 30 },
  { id: 'f4', name: 'Sara Ahmed', online: true, sharingETA: true, eta: '3 min', x: 48, y: 58 },
];

// Just the friends currently sharing their ETA — handy for the map.
export const sharingFriends = friends.filter((f) => f.sharingETA);

// Drake playlist. Each track gets an original two-colour tile (no copyrighted
// album art): `c1`/`c2` are the tile colours and `mono` is the big initial.
// `listeners` = friends currently listening to that track (for the social
// "listening together" feature on the Music screen).
export const songs = [
  { id: 's1', title: "God's Plan", artist: 'Drake', album: 'Scorpion', duration: '3:19', c1: '#1F2937', c2: '#374151', mono: 'G', listeners: ['Ali Reza', 'Sara Ahmed'] },
  { id: 's2', title: 'Hotline Bling', artist: 'Drake', album: 'Views', duration: '4:27', c1: '#7C3AED', c2: '#A78BFA', mono: 'H', listeners: ['Alam Bhai'] },
  { id: 's3', title: 'One Dance', artist: 'Drake', album: 'Views', duration: '2:54', c1: '#B45309', c2: '#F59E0B', mono: 'O', listeners: ['Ali Reza', 'Alam Bhai', 'Sara Ahmed'] },
  { id: 's4', title: 'In My Feelings', artist: 'Drake', album: 'Scorpion', duration: '3:38', c1: '#BE123C', c2: '#FB7185', mono: 'I', listeners: [] },
  { id: 's5', title: 'Nice For What', artist: 'Drake', album: 'Scorpion', duration: '3:30', c1: '#0F766E', c2: '#2DD4BF', mono: 'N', listeners: ['Sara Ahmed'] },
  { id: 's6', title: 'Started From the Bottom', artist: 'Drake', album: 'Nothing Was the Same', duration: '2:54', c1: '#1E3A8A', c2: '#3B82F6', mono: 'S', listeners: [] },
  { id: 's7', title: 'Passionfruit', artist: 'Drake', album: 'More Life', duration: '4:58', c1: '#9D174D', c2: '#F472B6', mono: 'P', listeners: ['Ali Reza'] },
  { id: 's8', title: 'Laugh Now Cry Later', artist: 'Drake', album: 'Certified Lover Boy', duration: '4:21', c1: '#374151', c2: '#9CA3AF', mono: 'L', listeners: ['Alam Bhai', 'Sara Ahmed'] },
];

// A scripted set of turn-by-turn steps for the demo Map screen.
export const navSteps = [
  { id: 'n1', distance: '80 yd', instruction: 'Turn right onto Nelson Road', road: 'A206' },
  { id: 'n2', distance: '300 yd', instruction: 'Continue onto Romney Road', road: 'A206' },
  { id: 'n3', distance: '1.2 mi', instruction: 'At roundabout, take 2nd exit', road: 'A2' },
];
