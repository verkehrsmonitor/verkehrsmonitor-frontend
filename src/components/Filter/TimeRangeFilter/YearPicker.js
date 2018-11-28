import React, { PureComponent } from 'react';
import AntSelect from 'antd/lib/select';
import moment from 'moment';
import { getListInRange } from '~/helper/utils';

const { Option } = AntSelect;

export default class YearPicker extends PureComponent {
  state = {
    startValue: this.props.values[0].year(),
    endValue: this.props.values[1].year(),
    hasError: false,
    options: getListInRange(this.props.timeRangeMinMax.map(m => m.year()))
  }

  getOptions = (option, key) => (
    <Option key={key} value={option}>{option}</Option>
  )

  handleChange = (val, type) => {
    const { startValue, endValue } = this.state;

    const startDateStr = type === 'start' ? `01-01-${val}` : `01-01-${startValue}`;
    const endDateStr = type === 'end' ? `31-12-${val}` : `31-12-${endValue}`;
    const startDate = moment(startDateStr, 'DD-MM-YYYY');
    const endDate = moment(endDateStr, 'DD-MM-YYYY');
    const isValid = startDate.isBefore(endDate);

    if (!isValid) {
      return this.setState({ hasError: true });
    }

    this.props.onChange([startDate, endDate]);

    return this.setState({
      startValue: startDate.year(),
      endValue: endDate.year(),
      hasError: false
    });
  }

  render() {
    const { hasError, startValue, endValue, options } = this.state;
    const startOptions = options.filter(entry => entry <= endValue);
    const endOptions = options.filter(entry => entry > startValue);
    return (
      <div>
        {hasError && <div>Bitte die Eingabe überprüfen</div>}
        <AntSelect
          defaultValue={startValue}
          onChange={val => this.handleChange(val, 'start')}
        >
          {startOptions.map(option => this.getOptions(option, `start-${option}`))}
        </AntSelect>

        <AntSelect
          defaultValue={endValue}
          onChange={val => this.handleChange(val, 'end')}
        >
          {endOptions.map(option => this.getOptions(option, `end-${option}`))}
        </AntSelect>
      </div>
    );
  }
}
