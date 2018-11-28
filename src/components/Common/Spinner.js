import React from 'react';
import Spin from 'antd/lib/spin';
import styled from 'styled-components';

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, .7);
  z-index: 1000000;
`;

const StyledSpinner = styled.div`
  display: inline-block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Spinner = () => (
  <Overlay>
    <StyledSpinner>
      <Spin />
    </StyledSpinner>
  </Overlay>
);


export default Spinner;
