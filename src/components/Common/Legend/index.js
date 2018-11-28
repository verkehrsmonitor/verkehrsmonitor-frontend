import React, { PureComponent } from 'react';
import styled from 'styled-components';

import LegendItem from './LegendItem';

const StylesLegend = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;

const LegendLabel = styled.div`
  font-size: 12px;
  margin-right: 5px;
`;

const LegendItems = styled.div`
  display: flex;
  flex-direction: row;
  text-transform: capitalize;
`;

class Legend extends PureComponent {
  getItems = () =>
    this.props.items.map(item => <LegendItem key={item.id} item={item} />)

  render() {
    return (
      <StylesLegend>
        <LegendLabel>{this.props.label}</LegendLabel>
        <LegendItems>{this.getItems()}</LegendItems>
      </StylesLegend>
    );
  }
}

export default Legend;
