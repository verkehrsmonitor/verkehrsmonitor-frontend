import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { media } from '~/helper/style-helper';

import Spinner from '~/components/Common/Spinner';

const StyledWidgetWrapper = styled.div`
  position: relative;
  flex: 1 1 auto;
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  align-items: flex-start;
  justify-content: flex-start;
  ${media.giant`padding: 0 16px; margin-left: -16px;`}
`;

export default class WidgetWrapper extends PureComponent {
  render() {
    return (
      <StyledWidgetWrapper>
        {this.props.isDisabled && <Spinner />}
        {this.props.children}
      </StyledWidgetWrapper>
    );
  }
}
