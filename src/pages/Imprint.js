import React from 'react';
import styled from 'styled-components';

import Section from '~/components/Common/Section';

const StylesPage = styled(Section)`
  font-size: 16px;
  line-height: 1;
`;

const StyledPageWrapper = styled.div`
  margin-bottom: 24px;
`;

const Imprint = () => (
  <StylesPage>
    <StyledPageWrapper>
      <h2 style={{ marginTop: '1em' }}>Angaben gemäß § 5 TMG:</h2>
      <p>webkid GmbH</p>
      <p>Oranienstraße 19A</p>
      <p>10999 Berlin</p>
    </StyledPageWrapper>
    <StyledPageWrapper>
      <h2>Vertreten durch:</h2>
      <p>Moritz Klack</p>
      <p>Christopher Möller</p>
    </StyledPageWrapper>
    <StyledPageWrapper>
      <h2>Kontakt:</h2>
      <p>Telefon: 030 5507 8159</p>
      <p>E-Mail: info@webkid.io</p>
    </StyledPageWrapper>
    <StyledPageWrapper>
      <h2>Registereintrag:</h2>
      <p>Eintragung im Handelsregister</p>
      <p>Registergericht: Amtsgericht Berlin Charlottenburg</p>
      <p>Registernummer: HRB 165568</p>
    </StyledPageWrapper>
    <StyledPageWrapper>
      <h2>Umsatzsteuer-ID:</h2>
      <p>Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:</p>
      <p>37/581/30516</p>
    </StyledPageWrapper>
  </StylesPage>
);

export default Imprint;
