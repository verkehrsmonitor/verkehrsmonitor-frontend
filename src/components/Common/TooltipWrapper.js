import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTooltipWrapper = styled.div`
  position: absolute;
  max-width: 250px;
  min-width: 150px;
  padding: 8px;
  z-index: 1000;
  pointer-events: none;
  background: ${config.colors.white};
  border: 1px solid rgba(0, 0, 0, 0.05)
`;

export default class TooltipWrapper extends PureComponent {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    pos: PropTypes.objectOf(PropTypes.number).isRequired
  }

  render() {
    const { children, pos, isVisible } = this.props;

    const style = {
      display: isVisible ? 'block' : 'none',
      left: pos.x - 75,
      top: pos.y - 75
    };

    return (
      <StyledTooltipWrapper style={style}>
        {children}
      </StyledTooltipWrapper>
    );
  }
}
