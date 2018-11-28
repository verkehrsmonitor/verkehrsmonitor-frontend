import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AntRadio from 'antd/lib/radio';
import InputLabel from '~/components/Common/InputLabel';
import InputWrapper from '~/components/Common/InputWrapper';
import RadioButton from './RadioButton';

const { Group: AntRadioGroup } = AntRadio;

const StyledAntRadioGroup = styled(AntRadioGroup)`  
  .ant-radio-button-wrapper {
    font-size: 12px;
  }
`;

export default class RadioGroup extends PureComponent {
  static propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.object),
    currentValue: PropTypes.string,
    handler: PropTypes.func.isRequired
  }

  static defaultProps = {
    buttons: [],
    currentValue: ''
  }

  renderButtons = () => this.props.buttons.map(button =>
    <RadioButton key={`radio-${button.label}`} {...button} />);

  render() {
    return (
      <InputWrapper>
        <InputLabel>{this.props.label}</InputLabel>
        <div>
          <StyledAntRadioGroup
            value={this.props.currentValue}
            onChange={evt => this.props.handler(evt.target.value)}
          >
            {this.renderButtons()}
          </StyledAntRadioGroup>
        </div>
      </InputWrapper>
    );
  }
}
