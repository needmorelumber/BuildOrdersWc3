// It's presumed this is order by most recent DESCENDING
export const PATCHES = [
  '1.30.4',
];

export const getCurrentPatch = () => PATCHES[0];

export const RACES = [
  { code: 'HU', label: 'Human' },
  { code: 'NE', label: 'Night+Elf' },
  { code: 'OR', label: 'Orc' },
  { code: 'UD', label: 'Undead' },
];

export const getRaceLabel = race => RACES.find(el => el.code === race).label;

export const getIconString = race => `https://s3.us-west-2.amazonaws.com/needmorelumberassets/icons/${getRaceLabel(race)}.png`;
export const getFeatImage = race => `https://s3.us-west-2.amazonaws.com/needmorelumberassets/icons/feat/${getRaceLabel(race)}_feat.png`;
