import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { numberFormat } from '~/helper/utils';
import Widget from './Widget';

const StyledBigNumber = styled(Widget)`
  min-width: 165px;
  padding: 12px 16px;
`;

const Value = styled.div`
  display: block;
  font-size: 28px;
  line-height: 1;
  font-weight: 600;
  color: ${config.colors.darkgrey};
`;

const Indicator = styled.div`
  font-size: 12px;
  color: ${config.colors.darkgrey};
  font-weight: 600;
`;

const Info = styled.div`
  font-size: 12px;
  color: ${config.colors.darkgrey};
  font-weight: 300;
`;

export default class BigNumber extends PureComponent {
  render() {
    const {
      info, isDisabled, indicator, precision, suffix, value
    } = this.props;

    return (
      <StyledBigNumber>
        <Value>
          {isDisabled ? '-' : `${numberFormat(value, precision)}${suffix}`}
        </Value>
        <Indicator>{indicator}</Indicator>
        <Info>{info}</Info>
      </StyledBigNumber>
    );
  }
}

BigNumber.propTypes = {
  indicator: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  value: PropTypes.number,
  suffix: PropTypes.string,
  isDisabled: PropTypes.bool,
  precision: PropTypes.number
};

BigNumber.defaultProps = {
  suffix: '',
  value: 0,
  isDisabled: false,
  precision: 0
};
