import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { media } from '~/helper/style-helper';
import Widget from '../Widget';
import Map from './Map';
import Tooltip from './UI/Tooltip';
import ControlPanel from './UI/ControlPanel';

const MapWrapperDiv = styled(Widget)`
  position: relative;
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  ${media.giant`width: 500px;`}
`;

export default class MapWrapper extends PureComponent {
  state = {
    showTooltip: false,
    tooltipData: null,
    tooltipPos: { x: 0, y: 0 }
  }

  getClosePanelLabel = () => {
    const {
      activeState, activeStation, activeRoad, metaData, roadType
    } = this.props;

    if (activeStation && metaData.length) {
      return metaData[0].name || '';
    }

    if (activeState) {
      return config.states[activeState];
    }

    if (roadType && activeRoad) {
      return `${roadType}${activeRoad}`;
    }
    return 'Auswahl zurücksetzen';
  }

  getControlPanel = () => (
    <ControlPanel
      onClick={this.props.onCloseControlPanel}
      roadType={this.props.roadType}
      label={this.getClosePanelLabel()}
    />
  )

  handleMouseMove = (evt) => {
    this.setState({
      tooltipPos: { x: evt.containerPoint.x, y: evt.containerPoint.y }
    });
  }

  handleMouseOut = () => {
    this.setState({
      showTooltip: false,
      tooltipPos: { x: 0, y: 0 },
      tooltipData: null
    });
  }

  handleMouseOver = (evt, station) => {
    this.setState({
      showTooltip: true,
      tooltipPos: { x: evt.containerPoint.x, y: evt.containerPoint.y },
      tooltipData: station
    });
  }

  render() {
    const {
      activeState,
      activeRoad,
      activeStation
    } = this.props;

    const hasActiveFilter = (activeRoad || activeStation || activeState);

    return (
      <MapWrapperDiv>
        <Map
          {...this.props}
          onMouseOver={this.handleMouseOver}
          onMouseMove={this.handleMouseMove}
          onMouseOut={this.handleMouseOut}
        />

        <Tooltip
          isVisible={this.state.showTooltip}
          pos={this.state.tooltipPos}
          data={this.state.tooltipData}
        />

        {hasActiveFilter ? this.getControlPanel() : null}
      </MapWrapperDiv>
    );
  }
}
