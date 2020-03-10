import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import PropTypes from 'prop-types';

const RadioGroup = (props) => {
  const {
    controlId,
    label,
    name,
    onChange,
    value,
  } = props;

  return (
    <Form.Row>
      <Form.Group as={Col} controlId={controlId}>
        <div>
          <Form.Label>{label}</Form.Label>
        </div>
        <div>
          <ToggleButtonGroup
            type='radio'
            name={name}
            value={value}
            onChange={onChange}
          >
            <ToggleButton
              variant='outline-dark'
              value={false}
            >
              false
            </ToggleButton>
            <ToggleButton
              variant='outline-dark'
              value
            >
              true
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </Form.Group>
    </Form.Row>
  );
};

RadioGroup.propTypes = {
  controlId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
};

export default RadioGroup;
