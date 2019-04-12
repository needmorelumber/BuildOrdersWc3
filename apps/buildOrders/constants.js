// It's presumed this is order by most recent DESCENDING
export const PATCHES = [
  '1.30.4',
];

export const getCurrentPatch = () => PATCHES[0];

export const RACES = [
  { code: 'HU', path: 'Human', label: 'Human' },
  { code: 'NE', path: 'Night+Elf', label: 'Night Elf' },
  { code: 'OR', path: 'Orc', label: 'Orc' },
  { code: 'UD', path: 'Undead', label: 'Undead' },
];

export const getRaceLabel = race => RACES.find(el => el.code === race).label;
export const getRacePath = race => RACES.find(el => el.code === race).path;

export const getIconString = race => `https://s3.us-west-2.amazonaws.com/needmorelumberassets/icons/${getRacePath(race)}.png`;
export const getFeatImage = race => `https://s3.us-west-2.amazonaws.com/needmorelumberassets/icons/feat/${getRacePath(race)}_feat.png`;
