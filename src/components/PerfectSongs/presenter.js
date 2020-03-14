import React from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

import ErrorBoundary from '../ErrorBoundary';
import data from '../../data/songs';

const songRows = data.songs.map((song, index) => (
  <tr key={index}>
    <td>{song.artist}</td>
    <td>{song.song}</td>
    <td>
      <a
        href={song.youtube}
        className='no-color'
        target='_blank'
        rel='noopener noreferrer'
      >
        Listen
      </a>
    </td>
  </tr>
));

const PerfectSongs = () => (
  <ErrorBoundary>
    <Container className='no-loader'>
      <h3 style={{ marginBottom: '16px' }}>Perfect Songs</h3>
      <Table striped hover>
        <thead>
          <tr>
            <th>Artist</th>
            <th>Song</th>
            <th />
          </tr>
        </thead>
        <tbody data-testid='table-body'>
          {songRows}
        </tbody>
      </Table>
    </Container>
  </ErrorBoundary>
);

export default PerfectSongs;
