import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Map,
  TileLayer,
  ZoomControl
} from 'react-leaflet';

import { getBoundsForFeature, isDefined } from '~/helper/utils';
import isEqual from 'lodash.isequal';
import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';

import RoadOverlay from './Overlays/RoadOverlay';
import CountryOverlay from './Overlays/CountryOverlay';
import MarkerOverlay from './Overlays/MarkerOverlay';

/**
 * A Map component
 * @example
 * metaData: [
 *   {
 *      id: '101',
 *      lat: 50.23,
 *      lng: 7.89',
 *      name: 'Some text'
 *      …
 *   },
 *   …
 * ],
 * data: [
 *   {
 *     key: '101',
 *     value: { total: 202 }
 *   },
 *   …
 * ]
 *
 * @constructor
 * @param {array}  data - values with reference key (in specific range)
 * @param {array}  metaData - data with position and reference key to data entries
 * @param {object} roadGeoData - geojson for draw an animated path
 * @param {string} refernceKey - referencekey to match the values and metadata
 * @param {string} activeNode - highlightitem
 * @param {func}   handleBoundsChanged
 * @param {func}   onMouseOver
 * @param {func}   onMouseMove
 * @param {func}   onMouseOut
 * @param {func}   onZoomStart
 * @param {func}   onDragStart
 * @param {func}   onFeatureClick
 */

const StyledMap = styled(Map)`
  flex: 1 1 auto;
  min-height: 576px;
`;

export default class MapContainer extends PureComponent {
  static propTypes = {
    activeNode: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    metaData: PropTypes.arrayOf(PropTypes.object).isRequired,
    refernceKey: PropTypes.string,
    onMouseOver: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseOut: PropTypes.func,
    onFeatureClick: PropTypes.func,
    onBoundsChanged: PropTypes.func,
    onZoomStart: PropTypes.func,
    valueKey: PropTypes.string
  };

  static defaultProps = {
    activeNode: null,
    refernceKey: 'id',
    onMouseOver: () => {},
    onMouseMove: () => {},
    onMouseOut: () => {},
    onFeatureClick: () => {},
    onBoundsChanged: () => {},
    onZoomStart: () => {},
    onDragStart: () => {},
    valueKey: 'total'
  }

  componentDidUpdate(prevProps) {
    // handle selection change, fit bounds to corresponding feature etc.
    const {
      activeState,
      activeStation,
      roadGeoData,
      statesGeoData,
      metaData
    } = this.props;

    const {
      activeState: prevActiveState,
      activeRoad: prevActiveRoad,
      activeStation: prevActiveStation,
      roadGeoData: prevRoadGeoData
    } = prevProps;

    // fit bounds if active station
    if (isDefined(activeStation) && !isEqual(prevActiveStation, activeStation) &&
        metaData.length) {
      const bounds = metaData.map(station => [station.lat, station.lng]);
      this.fitMapView(this.map.leafletElement, bounds);
    }

    // fit bounds if active road
    if (isDefined(roadGeoData) && !isEqual(prevRoadGeoData, roadGeoData)) {
      const bounds = getBoundsForFeature(roadGeoData);
      this.fitMapView(this.map.leafletElement, bounds);
    }

    // fit bounds if active state
    if (isDefined(activeState) && !isEqual(prevActiveState, activeState)) {
      const { features } = statesGeoData;
      const activeFeature = features.find(feature => feature.properties.ID === activeState);
      const bounds = getBoundsForFeature(activeFeature);
      this.fitMapView(this.map.leafletElement, bounds);
    }

    // reset view
    if ((isDefined(prevActiveRoad) || isDefined(prevActiveState) || isDefined(prevActiveStation)) &&
       !this.hasActiveFilter()) {
      this.fitMapView(this.map.leafletElement);
    }
  }

  onZoomStart = () => {
    if (!this.hasActiveFilter()) this.props.onZoomStart();
  }

  onMoveend = () => {
    if (!this.hasActiveFilter()) {
      const newBounds = this.map.leafletElement.getBounds();
      this.props.onBoundsChanged(newBounds);
    }
  }

  fitMapView = (map, bounds) => {
    if (!bounds) {
      return map.fitBounds(config.map.mapBounds);
    }
    return map.fitBounds(bounds, { padding: [40, 40] });
  }

  hasActiveFilter = () => {
    const {
      activeState,
      activeRoad,
      activeStation
    } = this.props;
    return activeState || activeRoad || activeStation;
  }

  render() {
    return (
      <StyledMap
        bounds={config.map.mapBounds}
        zoomControl={false}
        onMoveend={this.onMoveend}
        onZoomStart={this.onZoomStart}
        onDragStart={this.onZoomStart}
        maxBounds={config.map.maxBounds}
        maxZoom={config.map.maxZoom}
        minZoom={config.map.minZoom}
        preferCanvas
        zoomSnap={0.5}
        zoom={0.5}
        ref={(map) => { this.map = map; }}
      >
        <TileLayer
          url={config.map.tileUrl}
          attribution={config.map.attribution}
        />

        {isDefined(this.props.statesGeoData) &&
          <CountryOverlay
            data={this.props.statesGeoData}
            activeFeature={this.props.activeState}
          />
        }

        {isDefined(this.props.metaData) &&
          <MarkerOverlay
            activeNode={this.props.activeNode}
            data={this.props.data}
            metaData={this.props.metaData}
            refernceKey={this.props.refernceKey}
            onMouseOver={this.props.onMouseOver}
            onMouseMove={this.props.onMouseMove}
            onMouseOut={this.props.onMouseOut}
            onFeatureClick={this.props.onFeatureClick}
            valueKey={this.props.valueKey}
          />
        }

        {isDefined(this.props.roadGeoData) &&
          <RoadOverlay
            data={this.props.roadGeoData}
            color={config.colors.roads[this.props.roadType]}
            id={`${this.props.activeRoad}-${this.props.roadType}`}
          />
        }

        <ZoomControl position="bottomleft" />
      </StyledMap>
    );
  }
}
