import React from 'react';
import { MockedProvider } from '@apollo/react-testing';

import NewReleasesContainer from '../../src/components/NewReleases';
import { GET_RELEASES } from '../../src/queries';
import render from '../utils';
import { mockNewReleasesData } from '../mocks';

const mocks = [
  {
    request: {
      query: GET_RELEASES,
    },
    result: {
      data: {
        releases: mockNewReleasesData,
      },
    },
  },
];

test('renders without error', () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <NewReleasesContainer />
    </MockedProvider>,
  );
});
