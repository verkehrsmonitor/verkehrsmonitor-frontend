import React from 'react';
import styled from 'styled-components';

import Section from '~/components/Common/Section';

const StylesPage = styled(Section)`
  font-size: 16px;
  line-height: 1;
`;

const StyledPageWrapper = styled.div`
  margin-bottom: 24px;
  max-width: 600px;
  line-height: 1.4;

  h2 {
    margin-top: 1em
  }
`;

const About = () => (
  <StylesPage>
    <StyledPageWrapper>
      <h2>Über das Projekt</h2>
      <p>
        Der verkehrsmonitor gibt eine Übersicht über die automatischen Zählstellen an Autobahnen und Bundesstrßaen in Deutschland zwischen 2003 und 2016.
        Es ist möglich einen Zeitraum, ein Bundesland oder eine Straße zu filtern.
      </p>
      <p>Der verkehrsmonitor ist im Rahmen einer Vorstudie einer mFund Förderung entstanden.</p>
    </StyledPageWrapper>
  </StylesPage>
);

export default About;
