import React from 'react';
import AntMenu from 'antd/lib/menu';

import Store from '~/redux/store';
import { setRangeType } from '~/modules/FilterBar/State';

export default (
  <AntMenu onClick={({ key }) => Store.dispatch(setRangeType(key))}>
    <AntMenu.Item key="day">Tageswerte</AntMenu.Item>
    <AntMenu.Item key="month">Monatswerte</AntMenu.Item>
    <AntMenu.Item key="year">Jahreswerte</AntMenu.Item>
  </AntMenu>
);
