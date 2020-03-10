import React, { Fragment } from 'react';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';

import { ICONS } from '../../constants';
import { useAppState } from '../Provider';

const style = {
  cursor: 'pointer',
  verticalAlign: 'middle',
};

const DateCol = (props) => {
  const {
    data,
    date,
    handleEditOpen,
    handleDeleteOpen,
  } = props;
  const { user: { isAuthenticated } } = useAppState();

  return (
    <Col xs={12} md={6} lg={4}>
      <h5>{date}</h5>
      <ul data-testid={`list-${date}`}>
        {data.map(release => (
          <li key={release.id}>
            <span>
              {release.artist} &ndash; {release.title}
            </span>
            {isAuthenticated && (
              <Fragment>
                <span style={style} onClick={() => handleEditOpen(release)}>
                  &nbsp;&nbsp;{ICONS.PENCIL}
                </span>
                <span style={style} onClick={() => handleDeleteOpen(release)}>
                  {ICONS.X}
                </span>
              </Fragment>
            )}
          </li>
        ))}
      </ul>
    </Col>
  );
};

DateCol.propTypes = {
  data: PropTypes.array.isRequired,
  date: PropTypes.string.isRequired,
  handleEditOpen: PropTypes.func.isRequired,
  handleDeleteOpen: PropTypes.func.isRequired,
};

export default DateCol;
