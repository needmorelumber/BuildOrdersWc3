// It's presumed this is order by most recent DESCENDING
export const PATCHES = [
  '1.30.4',
];

export const getCurrentPatch = () => PATCHES[0];

export const RACES = [
  { code: 'HU', label: 'Human' },
  { code: 'NE', label: 'Night Elf' },
  { code: 'OR', label: 'Orc' },
  { code: 'UD', label: 'Undead' },
];
