import React, { PureComponent } from 'react';
import styled from 'styled-components';

import Table from '~/components/Common/Table';
import { compareStr, formatToLocalString, getRelativeValueString } from '~/helper/utils';
import Widget from './Widget';

const StyledStationsTable = styled(Widget)`
  width: 100%;
  overflow: auto;
  margin-right: 0;
  padding: 12px 16px 0 16px;
  margin-bottom: 0;
`;

const StyledColumnInfo = styled.span`
  color: ${config.colors.midgrey};
`;

const columns = [
  {
    title: 'Str.',
    dataIndex: 'road',
    key: 'road',
    sorter: (a, b) => compareStr(a.road, b.road)
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => compareStr(a.name, b.name)
  },
  {
    title: 'Zählungen',
    dataIndex: 'total',
    key: 'total',
    render: val => formatToLocalString(val, 0),
    sorter: (a, b) => a.total - b.total,
    defaultSortOrder: 'descend'
  },
  {
    title: '\u220B Lkw',
    dataIndex: 'truck',
    key: 'truck',
    render: (val, record) => (
      <div>{formatToLocalString(val, 0)}
        <StyledColumnInfo> ({getRelativeValueString(record.total, val)}%)</StyledColumnInfo>
      </div>
    ),
    sorter: (a, b) => a.truck - b.truck
  },
  {
    title: '\u220B Bus',
    dataIndex: 'bus',
    key: 'bus',
    render: (val, record) => (
      <div>{formatToLocalString(val, 0)}
        <StyledColumnInfo> ({getRelativeValueString(record.total, val)}%)</StyledColumnInfo>
      </div>
    ),
    sorter: (a, b) => a.bus - b.bus
  },
  {
    title: 'Land',
    dataIndex: 'stateLabel',
    key: 'land',
    sorter: (a, b) => compareStr(a.stateLabel, b.stateLabel)
  }
];

export default class StationsTable extends PureComponent {
  render() {
    return (
      <StyledStationsTable>
        <Table
          columns={columns}
          {...this.props}
        />
      </StyledStationsTable>
    );
  }
}
