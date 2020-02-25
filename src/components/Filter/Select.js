import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AntSelect from 'antd/lib/select';
import styled from 'styled-components';
import InputLabel from '~/components/Common/InputLabel';
import InputWrapper from '~/components/Common/InputWrapper';

const { Option } = AntSelect;

const StyledAntSelect = styled(AntSelect)`
  width: 200px;

  .ant-select-selection {
    font-size: 12px;
  }
`;

export default class Select extends PureComponent {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string
  };

  static defaultProps = {
    label: '',
    placeholder: '',
    value: undefined
  };

  getOptions = () =>
    this.props.options.map(option => (
      <Option key={option.key} value={option.key}>
        {option.label}
      </Option>
    ));

  render() {
    const { label, placeholder, onChange, value } = this.props;
    // as we have a controlled component
    // if we have a falsy value the placeholder is not shown
    // so we init with undefined for value
    // https://stackoverflow.com/questions/45546300/antd-design-select-placeholder-issues
    return (
      <InputWrapper>
        <InputLabel>{label}</InputLabel>
        <div>
          <StyledAntSelect
            placeholder={placeholder}
            onChange={onChange}
            allowClear
            showSearch
            disabled={!config.isOnline}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            value={value || undefined}
          >
            {this.getOptions()}
          </StyledAntSelect>
        </div>
      </InputWrapper>
    );
  }
}
