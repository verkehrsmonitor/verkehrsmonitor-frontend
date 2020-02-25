import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.85);
  z-index: 1000000;
`;

const Text = styled.div`
  display: inline-block;
  position: absolute;
  left: 50%;
  top: 25%;
  transform: translate(-50%, 0);
  font-size: 16px;
  text-align: center;
`;

const Spinner = () => (
  <Overlay>
    <Text>
      <strong>Diese Anwendung wird nicht weiter gepflegt.</strong>
      <br />
      Bei Fragen können Sie sich gerne an info@webkid.io wenden.
    </Text>
  </Overlay>
);

export default Spinner;
