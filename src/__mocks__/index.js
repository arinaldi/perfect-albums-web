export const mockTopAlbumsData = {
  1991: [
    { artist: 'Nirvana', title: 'Nevermind' },
    { artist: 'Pearl Jam', title: 'Ten' },
  ],
  1999: [
    { artist: 'HIM', title: 'Razorblade Romance' },
  ],
};

export const mockFeaturedSongsData = [
  {
    id: '1',
    artist: 'Nirvana',
    title: 'Smells Like Teen Spirit',
    link: '',
  },
  {
    id: '2',
    artist: 'Pearl Jam',
    title: 'Even Flow',
    link: '',
  },
  {
    id: '3',
    artist: 'HIM',
    title: 'I Love You (Prelude to Tragedy)',
    link: '',
  },
];

export const releaseLabels = {
  one: '4 Oct 2019',
  two: '11 Oct 2019',
};

export const mockNewReleasesData = {
  [releaseLabels.one]: [
    {
      id: '1',
      artist: 'City and Colour',
      title: 'A Pill for Loneliness',
      date: '2019-10-04T05:00:00.000Z',
    },
    {
      id: '2',
      artist: 'The Darkness',
      title: 'Easter Is Cancelled',
      date: '2019-10-04T05:00:00.000Z',
    },
  ],
  [releaseLabels.two]: [
    {
      id: '3',
      artist: 'Bury Your Dead',
      title: 'We Are Bury Your Dead',
      date: '2019-10-11T05:00:00.000Z',
    },
  ],
};

export const mockAdminData = [
  {
    id: '1',
    artist: 'Nirvana',
    title: 'Nevermind',
    year: '1991',
    cd: true,
    aotd: true,
    favorite: true,
  },
  {
    id: '2',
    artist: 'Pearl Jam',
    title: 'Ten',
    year: '1991',
    cd: true,
    aotd: true,
    favorite: true,
  },
  {
    id: '3',
    artist: 'HIM',
    title: 'Razorblade Romance',
    year: '1999',
    cd: true,
    aotd: true,
    favorite: true,
  },
];
