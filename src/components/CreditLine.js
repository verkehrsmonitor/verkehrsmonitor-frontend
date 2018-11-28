import React from 'react';
import styled from 'styled-components';

const StyledCreditLine = styled.div`
  font-size: 12px;
`;

export default () => (
  <StyledCreditLine>
    <p>Die <a href="https://www.bast.de/DE/Verkehrstechnik/Fachthemen/v2-verkehrszaehlung/Aktuell/zaehl_aktuell_node.html" target="_blank" rel="noopener noreferrer">Daten</a> wurden durch die <a href="https://www.bast.de/BASt_2017/DE/Home/home_node.html" target="_blank" rel="noopener noreferrer">Bast</a> erfasst und für dieses Projekt zur Verfügung gestellt.</p>
    <p>Die Umsetzung erfolgte durch <a href="https://webkid.io/" target="_blank" rel="noopener noreferrer">webkid</a>.</p>
  </StyledCreditLine>
);
