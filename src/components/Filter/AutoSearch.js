import React, { PureComponent } from 'react';
import AntAutoComplete from 'antd/lib/auto-complete';
import styled from 'styled-components';

const StyledAntAutoComplete = styled(AntAutoComplete)`
  width: 225px;
  font-size: 12px;
`;

export default class AutoSearch extends PureComponent {
  // hook for onClear
  onChange = (val) => {
    if (!val) this.props.onSelect(null);
  }

  render() {
    return (
      <StyledAntAutoComplete
        allowClear
        dataSource={this.props.dataSource}
        placeholder={this.props.placeholder}
        onSelect={this.props.onSelect}
        onChange={this.onChange}
        filterOption={(inputValue, option) =>
          option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
      />
    );
  }
}
