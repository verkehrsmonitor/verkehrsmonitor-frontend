import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compareStr } from '~/helper/utils';

import AntTable from 'antd/lib/table';
import AntAutoComplete from 'antd/lib/auto-complete';
import AntIcon from 'antd/lib/icon';

import ChartTitle from './ChartTitle';
import { AutoSearch } from '../Filter';

const { Column } = AntTable;
const { Option } = AntAutoComplete;

const StyledTable = styled.div`
  .ant-table-body {
    height: 186px;
    font-size: 12px;
    overflow-x: visible!important;
    overflow-y: auto;
  }

  .ant-table-small {
    border: none;
  }

  .ant-table-row {
    cursor: pointer;
  }

  td.ant-table-column-has-filters,
  th.ant-table-column-has-filters {
    padding: 6px 8px!important;
  }

  .ant-table-pagination.ant-pagination {
    font-size: 12px;
    margin: 8px 0;
  }

  .ant-pagination-simple .ant-pagination-simple-pager input {
    border: none;
  }
`;

const StyledTableHeader = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 8px;

  .ant-select-show-search {
    font-size: 12px!important;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;

const ClearButton = styled.div`
  width: 100%;
  font-size: 12px;

  display: flex;
  flex-direction: row;
  align-items: center;

  color: ${config.colors.midgrey};
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    color: ${config.colors.highlight}
  }
`;

const StyledAnticon = styled(AntIcon)`
  margin-right: 5px;
`;

export default class Table extends PureComponent {
  onClear = () => this.props.onSelectRow(null)

  getColumns = () =>
    this.props.columns.map(col => (
      <Column
        dataIndex={col.dataIndex}
        key={col.dataIndex}
        title={col.title}
      />
    ))

  getSearchItems = () =>
    this.props.items
      .map(item => ({ key: item.nr, label: item.name }))
      .sort((a, b) => compareStr(a.label, b.label))
      .map(opt => (
        <Option key={opt.key} value={opt.key}>
          {opt.label}
        </Option>
      ))

  addRowHandler = record => ({
    onClick: () => this.props.onSelectRow(record.nr),
    onMouseEnter: () => this.props.onHover(record.nr),
    onMouseLeave: () => this.props.onHover(null)
  })

  render() {
    const { columns, hasSelectedItem, items, label, onSearch } = this.props;
    return (
      <StyledTable>
        <StyledTableHeader>
          <Wrapper>
            <ChartTitle>{label}</ChartTitle>

            <AutoSearch
              placeholder="Nach Stationsname suchen…"
              dataSource={this.getSearchItems()}
              onSelect={onSearch}
            />
          </Wrapper>


          {hasSelectedItem && (
            <Wrapper>
              <ClearButton onClick={this.onClear}>
                <StyledAnticon type="close-circle-o" />
                <span> Auswahl zurücksetzen</span>
              </ClearButton>
            </Wrapper>
          )}
        </StyledTableHeader>

        <AntTable
          columns={columns}
          dataSource={items}
          rowKey={record => record.key}
          pagination={{
            position: 'bottom',
            pageSize: 35,
            simple: true,
            hideOnSinglePage: true,
            size: 'small'
          }}
          size="small"
          bordered={false}
          onRow={this.addRowHandler}
        >
          {this.getColumns()}
        </AntTable>
      </StyledTable>
    );
  }
}

Table.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  onHover: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  label: PropTypes.string
};

Table.defaultProps = {
  label: '',
  items: []
};
