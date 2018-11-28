import React from 'react';
import PropTypes from 'prop-types';
import AntRadio from 'antd/lib/radio';

const { Button: AntRadioButton } = AntRadio;

const RadioButton = props => (
  <AntRadioButton value={props.value}>{props.label}</AntRadioButton>
);

RadioButton.prototypes = {
  value: PropTypes.string.isRequired
};

export default RadioButton;
