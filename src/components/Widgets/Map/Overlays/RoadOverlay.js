import React from 'react';
import { GeoJSON } from 'react-leaflet';

const RoadOverlay = ({ color, data, id }) => (
  <GeoJSON
    key={id}
    data={data}
    fill={false}
    color={color}
    weight="1"
  />
);

export default RoadOverlay;
