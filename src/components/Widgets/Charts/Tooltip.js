import React from 'react';
import styled from 'styled-components';

const StyledTooltip = styled.div`
  padding: 8px;
  line-height: 1.5;
  z-index: 1000;
  background: ${config.colors.white};
  border: 1px solid ${config.colors.lightgrey};
  border-radius: 2px;
  text-transform: capitalize;
  pointer-events: none;
`;

const TooltipKey = styled.span`
  font-weight: 600;
`;

export default ({ categoryLabel, category, meta }) => (
  <StyledTooltip>
    <div>
      <TooltipKey>{categoryLabel}: </TooltipKey>
      <span>{category}</span>
    </div>
    {meta.map(item => (
      <div key={`${item.label}`}>
        <TooltipKey>{item.label}: </TooltipKey>
        <span>{item.value}</span>
      </div>
    ))}
  </StyledTooltip>
);
