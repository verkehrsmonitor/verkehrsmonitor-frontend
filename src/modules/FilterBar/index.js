import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { getRoads, getStates } from '~/helper/selectors';
import { RadioGroup, Select, TimeRangeFilter } from '~/components/Filter';
import Section from '~/components/Common/Section';

import {
  setTimeRange,
  setActiveRoad,
  setRoadType,
  setActiveState
} from './State';

const StyledFilterBar = styled.div`
  background: ${config.colors.lightgrey};
`;

const StyledFilterBarBody = styled(Section)`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  padding: 4px 16px;
`;


class FilterBar extends PureComponent {
  handleTimeRangeChanged = timeRange => this.props.dispatch(setTimeRange(timeRange))

  handleRoadTypeChanged = roadType => this.props.dispatch(setRoadType(roadType))

  handleStateChanged = state => this.props.dispatch(setActiveState(state || null))

  handleRoadChanged = id => this.props.dispatch(setActiveRoad(id || null))

  render() {
    return (
      <StyledFilterBar>
        <StyledFilterBarBody>
          <TimeRangeFilter
            timeRangeMinMax={this.props.timeRangeMinMax}
            timeRange={this.props.timeRange}
            handler={this.handleTimeRangeChanged}
            rangeType={this.props.rangeType}
            label="Zeitraum wählen "
          />

          <RadioGroup
            currentValue={this.props.roadType}
            handler={this.handleRoadTypeChanged}
            buttons={config.filter.roadType}
            label="Straßentyp"
          />

          <Select
            options={this.props.roads}
            onChange={this.handleRoadChanged}
            value={this.props.activeRoad}
            label="Straße"
            placeholder="Bitte wählen"
          />

          <Select
            options={this.props.states}
            onChange={this.handleStateChanged}
            value={this.props.activeState}
            label="Bundesland"
            placeholder="Bitte wählen"
          />
        </StyledFilterBarBody>
      </StyledFilterBar>
    );
  }
}

export default connect(
  state => ({
    ...state.FilterBarState,
    roads: getRoads(state),
    states: getStates(state)
  })
)(FilterBar);
