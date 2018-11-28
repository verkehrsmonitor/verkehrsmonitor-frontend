import React, { PureComponent } from 'react';
import styled from 'styled-components';

import AntDropdown from 'antd/lib/dropdown';
import AntIcon from 'antd/lib/icon';
import InputLabel from '~/components/Common/InputLabel';
import InputWrapper from '~/components/Common/InputWrapper';
import YearPicker from './YearPicker';
import RangePicker from './RangePicker';
import DropdownMenu from './RangePickerDropdown';

const StyledTimeRangeFilter = styled(InputWrapper)`
  .ant-input,
  .ant-calendar {
    font-size: 12px;
  }

  .ant-dropdown-trigger {
    cursor: pointer;
  }
`;

const filterComps = {
  day: RangePicker,
  month: RangePicker,
  year: YearPicker
};

export default class TimeRangeFilter extends PureComponent {
  render() {
    const {
      label,
      timeRangeMinMax,
      rangeType,
      timeRange,
      handler
    } = this.props;

    const FilterComp = filterComps[rangeType];

    return (
      <StyledTimeRangeFilter>
        <AntDropdown overlay={DropdownMenu} trigger={['click']}>
          <InputLabel>{label}<AntIcon type="down" /></InputLabel>
        </AntDropdown>

        <FilterComp
          values={timeRange}
          onChange={handler}
          timeRangeMinMax={timeRangeMinMax}
          rangeType={rangeType}
        />
      </StyledTimeRangeFilter>
    );
  }
}
