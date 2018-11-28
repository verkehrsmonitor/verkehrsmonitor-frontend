import React from 'react';
import styled from 'styled-components';

const StyledLegendItem = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: baseline;
  margin-right: 5px;
`;

const Color = styled.span`
  background-color: ${props => props.color};
  width: 10px;
  height: 10px;
  margin-right: 5px;
`;

const Label = styled.div`
  font-size: 12px;
`;

const LegendItem = ({ item }) => (
  <StyledLegendItem>
    <Color color={item.color} />
    <Label>{item.id}</Label>
  </StyledLegendItem>
);

export default LegendItem;
