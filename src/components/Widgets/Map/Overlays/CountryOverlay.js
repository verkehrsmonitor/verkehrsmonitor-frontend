import React from 'react';
import { GeoJSON } from 'react-leaflet';

const getPathStyles = active => ({
  fill: false,
  color: '#30B0F6',
  stroke: active,
  weight: 1
});

const CountryOverlay = ({ data, activeFeature }) => (
  <GeoJSON
    data={data}
    style={feature => getPathStyles(feature.properties.ID === activeFeature)}
  />
);

export default CountryOverlay;
