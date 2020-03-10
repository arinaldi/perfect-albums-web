import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';

import { STATE_STATUSES } from '../../constants';
import AppMessage from '../AppMessage/presenter';
import InputFeedback from '../InputFeedback/presenter';
import RadioGroup from '../RadioGroup/presenter';
import SubmitButton from '../SubmitButton/presenter';

const CreateEditAlbum = (props) => {
  const {
    data,
    isValidated,
    isLoading,
    isSaving,
    query,
    header,
    handleChange,
    handleRadioChange,
    handleSubmit,
    status,
  } = props;
  const history = useHistory();

  return (
    <Container>
      <h3>{header} Album</h3>
      {!isLoading && (
        <Form
          noValidate
          validated={isValidated}
          onSubmit={handleSubmit}
        >
          <Row>
            <Col>
              <InputFeedback
                controlId='formArtist'
                label='Artist'
                name='artist'
                value={data.artist}
                onChange={handleChange}
              />
              <InputFeedback
                controlId='formTitle'
                label='Title'
                name='title'
                value={data.title}
                onChange={handleChange}
              />
              <InputFeedback
                controlId='formYear'
                label='Year'
                name='year'
                value={data.year}
                onChange={handleChange}
              />
            </Col>
            <Col sm={12} md='auto'>
              <RadioGroup
                controlId='formCd'
                label='CD'
                name='cd'
                value={data.cd}
                onChange={handleRadioChange}
              />
              <RadioGroup
                controlId='formAotd'
                label='AotD'
                name='aotd'
                value={data.aotd}
                onChange={handleRadioChange}
              />
              <RadioGroup
                controlId='formFavorite'
                label='Favorite'
                name='favorite'
                value={data.favorite}
                onChange={handleRadioChange}
              />
            </Col>
          </Row>
          <Row>
            <Col style={{ paddingBottom: 15 }}>
              <Button
                onClick={() => history.push(`/admin?${query}`)}
                variant='outline-dark'
                style={{ marginRight: 5 }}
              >
                Cancel
              </Button>
              <SubmitButton
                isDisabled={isSaving}
                isLoading={isSaving}
                text='Save'
                loadingText='Saving...'
              />
            </Col>
          </Row>
        </Form>
      )}
      {status === STATE_STATUSES.FAILURE && <AppMessage />}
    </Container>
  );
};

CreateEditAlbum.propTypes = {
  data: PropTypes.shape({
    artist: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    cd: PropTypes.bool.isRequired,
    aotd: PropTypes.bool.isRequired,
    favorite: PropTypes.bool.isRequired,
  }).isRequired,
  isValidated: PropTypes.bool,
  isLoading: PropTypes.bool,
  isSaving: PropTypes.bool,
  query: PropTypes.string,
  header: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleRadioChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

CreateEditAlbum.defaultProps = {
  isValidated: false,
  isLoading: false,
  isSaving: false,
  query: '',
};

export default CreateEditAlbum;
