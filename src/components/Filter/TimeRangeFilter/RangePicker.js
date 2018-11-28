import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import AntDatePicker from 'antd/lib/date-picker';
import styled from 'styled-components';

const { MonthPicker: AntMonthPicker } = AntDatePicker;

const withStyles = comp => styled(comp)`
  input {
    cursor: pointer;
  }
`;

const rangeComps = {
  day: {
    comp: withStyles(AntDatePicker),
    format: 'DD.MM.YYYY',
    getLimit: (end, start) => end.diff(start, 'days') > 3
  },
  month: {
    comp: withStyles(AntMonthPicker),
    format: 'MMMM YYYY',
    getLimit: (end, start) => end.diff(start, 'month') > 11
  }
};

export default class RangePicker extends PureComponent {
    static propTypes = {
      timeRangeMinMax: PropTypes.arrayOf(momentPropTypes.momentObj).isRequired,
      values: PropTypes.arrayOf(momentPropTypes.momentObj),
      onChange: PropTypes.func.isRequired
    }

    static defaultProps = {
      values: []
    }

    state = {
      startValue: this.props.values[0],
      endValue: this.props.values[1],
      endOpen: false
    };

    onChange = (field, value) => {
      this.setState({ [field]: value });
    }

    onStartChange = (value) => {
      this.onChange('startValue', value);
    }

    onEndChange = (value) => {
      this.onChange('endValue', value);
      this.props.onChange([this.state.startValue, value]);
    }

    handleStartOpenChange = (open) => {
      if (!open) {
        this.setState({ endOpen: true });
      }
    }

    handleEndOpenChange = (open) => {
      this.setState({ endOpen: open });
    }

    // out of bounds
    disableDate = date =>
      date.isBefore(this.props.timeRangeMinMax[0]) || date.isAfter(this.props.timeRangeMinMax[1]);

    disabledStartDate = (startValue) => {
      const { endValue } = this.state;
      if (!startValue || !endValue) return false;
      return this.disableDate(startValue);
    }

    disabledEndDate = (endValue) => {
      const { startValue } = this.state;
      if (!endValue || !startValue) return false;

      const { rangeType } = this.props;
      const { getLimit } = rangeComps[rangeType];
      const isInLimit = getLimit(endValue, startValue);

      return (endValue.valueOf() <= startValue.valueOf()) ||
             isInLimit ||
             this.disableDate(endValue);
    }

    render() {
      const { rangeType } = this.props;
      const { startValue, endValue, endOpen } = this.state;
      const { comp: RangeComp, format } = rangeComps[rangeType];

      return (
        <div>
          <RangeComp
            allowClear={false}
            disabledDate={this.disabledStartDate}
            format={format}
            value={startValue}
            placeholder="Startdatum wählen"
            onChange={this.onStartChange}
            onOpenChange={this.handleStartOpenChange}
          />
          <RangeComp
            allowClear={false}
            disabledDate={this.disabledEndDate}
            format={format}
            value={endValue}
            placeholder="Enddatum wählen"
            onChange={this.onEndChange}
            open={endOpen}
            onOpenChange={this.handleEndOpenChange}
            showToday={false}
          />
        </div>
      );
    }
}

