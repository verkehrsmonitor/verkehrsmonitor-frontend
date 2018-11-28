import React from 'react';
import styled from 'styled-components';

const StyledCreditLine = styled.div`
  font-size: 12px;
  line-height: 1.2;
  color: #777;
`;

export default () => (
  <StyledCreditLine>
    <p>
      Datenquelle: <a href="https://www.bast.de/BASt_2017/DE/Verkehrstechnik/Fachthemen/v2-verkehrszaehlung/Verkehrszaehlung.html" target="_blank" rel="noopener noreferrer">Automatische Zählstellen auf Autobahnen und Bundesstraßen</a> (<a href="https://www.bast.de/BASt_2017/DE/Home/home_node.html" target="_blank" rel="noopener noreferrer">Bast</a>).
      Umsetzung: <a href="https://webkid.io/" target="_blank" rel="noopener noreferrer">webkid</a>
    </p>
  </StyledCreditLine>
);
