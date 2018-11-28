import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import debounce from 'lodash.debounce';

import CreditLine from '~/components/CreditLine';
import * as AppActions from '~/modules/App/State';
import * as FilterBarActions from '~/modules/FilterBar/State';
import { getTimeRangeLabel } from '~/helper/utils';
import {
  getFilteredStations,
  getStats,
  getTotalValuesForTypeInRange,
  getTableData
} from '~/helper/selectors';

import { media } from '~/helper/style-helper';

import Section from '~/components/Common/Section';
import WidgetWrapper from '~/components/Common/WidgetWrapper';
import BigNumber from '~/components/Widgets/BigNumber';
import MapWrapper from '~/components/Widgets/Map/MapWrapper';
import StationsTable from '~/components/Widgets/StationsTable';
import StackedAreaChart from '~/components/Widgets/Charts/StackedAreaChart';
import Spinner from '~/components/Common/Spinner';
import FilterBar from '~/modules/FilterBar';

const ViewSection = styled(Section)`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: space-between;
  margin-bottom: 1em;
  ${media.giant`flex-direction: row;`}
`;

const StyledDashboard = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
class Dashboard extends PureComponent {
  constructor() {
    super();

    this.state = {
      isDisabled: false
    };

    this.handleHoverStationDebounced = debounce(this.handleHoveredStation, 50);
    this.handleBoundsChangedDebounced = debounce(this.handleBoundsChanged, 50);
  }

  componentDidMount() {
    this.props.dispatch(AppActions.loadStations());
    this.props.dispatch(AppActions.loadStatesGeoData());
    this.props.dispatch(AppActions.loadInTimeRange());
  }

  // map handler
  handleHoveredStation = id => this.props.dispatch(AppActions.setHighlightedStation(id));

  handleOnFeatureClick = id => this.props.dispatch(FilterBarActions.setActiveStation(id));

  handleBoundsChanged = (bounds) => {
    this.props.dispatch(AppActions.setMapBounds(bounds));
    this.setState({ isDisabled: false });
  }

  handleCloseRoadControlPanel = () => this.props.dispatch(FilterBarActions.resetFilter());

  handleOnZoomStart = () => this.setState({ isDisabled: true });

  // table handler
  handleSearchChanged = id => this.props.dispatch(FilterBarActions.setActiveStation(id))

  handleOnSelectRow = id => this.props.dispatch(FilterBarActions.setActiveStation(id))

  render() {
    const {
      activeRoad,
      activeState,
      activeStation,
      highlightedStation,
      isLoading,
      stations,
      stats,
      timeRangeUnit,
      roadType,
      roadGeoData,
      statesGeoData,
      tableData,
      timeRange,
      totalValuesForTypeInRange
    } = this.props;
    const { isDisabled } = this.state;

    return (
      <Fragment>
        <FilterBar />
        <StyledDashboard>
          {isLoading && <Spinner />}
          <ViewSection>
            <WidgetWrapper>
              <MapWrapper
                activeNode={highlightedStation}
                activeRoad={activeRoad}
                activeState={activeState}
                activeStation={activeStation}
                statesGeoData={statesGeoData}
                data={stats.stations}
                onBoundsChanged={this.handleBoundsChangedDebounced}
                onZoomStart={this.handleOnZoomStart}
                metaData={stations}
                onCloseControlPanel={this.handleCloseRoadControlPanel}
                onFeatureClick={this.handleOnFeatureClick}
                refernceKey="nr"
                roadGeoData={roadGeoData}
                roadType={roadType}
                valueKey="total"
              />
            </WidgetWrapper>
            <WidgetWrapper isDisabled={isDisabled}>
              <BigNumber
                indicator="Zählstellen"
                info="im sichtbaren Bereich"
                value={stations.length}
                isDisabled={isDisabled || isLoading}
              />
              <BigNumber
                indicator="Messungen"
                info={getTimeRangeLabel(timeRange, timeRangeUnit)}
                value={stats.total}
                isDisabled={isDisabled || isLoading}
              />
              <BigNumber
                indicator="Anteil Lkw"
                info="des gesamten Verkehrs"
                value={((stats.truck * 100) / stats.total) || 0}
                suffix="%"
                precision={1}
                isDisabled={isDisabled || isLoading}
              />
              <BigNumber
                indicator="Anteil Bus"
                info="des gesamten Verkehrs"
                value={((stats.bus * 100) / stats.total) || 0}
                suffix="%"
                precision={1}
                isDisabled={isDisabled || isLoading}
              />
              <StackedAreaChart
                data={totalValuesForTypeInRange}
                xAccessor="date"
                yAccessor="value"
                lineIDAccessor="id"
                withTooltip
                showAxis
                margin={{ left: 54, bottom: 32, right: 32, top: 12 }}
                title="Summierte Auslastung nach Fahrzeugtypen für die Auswahl"
                legendLabel=""
                timeRangeUnit={timeRangeUnit}
              />
              <StationsTable
                items={tableData}
                label="Alle ausgewählten Stationen im Überblick"
                onHover={this.handleHoverStationDebounced}
                onSearch={this.handleSearchChanged}
                onSelectRow={this.handleOnSelectRow}
                hasSelectedItem={!!activeStation}
              />
            </WidgetWrapper>
          </ViewSection>
          <ViewSection css={{ paddingTop: 0 }}>
            <CreditLine />
          </ViewSection>
        </StyledDashboard>
      </Fragment>
    );
  }
}

export default connect(
  (state, props) => ({
    isLoading: state.AppState.isLoading,
    activeStation: state.FilterBarState.activeStation,
    activeRoad: state.FilterBarState.activeRoad,
    activeState: state.FilterBarState.activeState,
    timeRange: state.FilterBarState.timeRange,
    highlightedStation: state.AppState.highlightedStation,
    roadType: state.FilterBarState.roadType,
    timeRangeUnit: state.AppState.timeRangeUnit,
    statesGeoData: state.AppState.statesGeoData,
    roadGeoData: state.AppState.roadGeoData,
    stations: getFilteredStations(state, props),
    stats: getStats(state, props),
    totalValuesForTypeInRange: getTotalValuesForTypeInRange(state, props),
    tableData: getTableData(state, props)
  })
)(Dashboard);
