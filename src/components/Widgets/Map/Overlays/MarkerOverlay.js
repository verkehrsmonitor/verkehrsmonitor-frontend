import React, { PureComponent } from 'react';
import { CircleMarker } from 'react-leaflet';
import { isNumeric, isDefined } from '~/helper/utils';
import idx from 'idx';
import { extent as d3Extent } from 'd3-array';
import { scaleSqrt as d3ScaleSqrt } from 'd3-scale';

export default class MarkerOverlay extends PureComponent {
  componentDidUpdate() {
    if (this.activeNodeEl) this.activeNodeEl.leafletElement.bringToFront();
  }

  getMarkers = () => {
    const {
      activeNode,
      data,
      metaData,
      refernceKey,
      onMouseOver,
      onMouseMove,
      onMouseOut,
      onFeatureClick,
      valueKey
    } = this.props;

    const domain = d3Extent(data, d => d.value[valueKey]);

    const scale = d3ScaleSqrt()
      .domain(domain)
      .range([2, 12]);

    const hasActiveStation = isDefined(activeNode);

    if (isDefined(data)) {
      return metaData.map((item) => {
        const currMarker = data.find(entry => item[refernceKey] === entry.key);

        const value = idx(currMarker, entry => entry.value[valueKey]);
        const radius = data.length > 1 ? scale(value) : 7;
        const isActiveNode = hasActiveStation && (item.nr === activeNode);
        const pathStyles = {
          stroke: isActiveNode && radius > 5,
          weight: 1,
          fillOpacity: 0.75,
          fillColor: config.colors.roads[item.type],
          color: config.colors.darkgrey
        };

        return isNumeric(radius) && (
          <CircleMarker
            key={`circleLayer-${item[refernceKey]}`}
            ref={(node) => {
              if (isActiveNode) {
                this.activeNodeEl = node;
              }
            }}
            onMouseOver={evt => onMouseOver(evt, { ...item, val: value })}
            onMouseMove={onMouseMove}
            onMouseOut={onMouseOut}
            onClick={() => onFeatureClick(item.nr)}
            center={[item.lat, item.lng]}
            radius={radius}
            {...pathStyles}
          />
        );
      });
    }
    return null;
  }

  render() {
    return this.getMarkers();
  }
}
