import React, { Component } from 'react';
import PropTypes from 'prop-types';
import XYFrame from 'semiotic/lib/XYFrame';
import { scaleTime as d3ScaleTime } from 'd3-scale';
import { numberFormat, getDateTickLabel, formatToLocalString } from '~/helper/utils';
import isEqual from 'lodash.isequal';
import styled from 'styled-components';

import Legend from '~/components/Common/Legend';
import ChartTitle from '~/components/Common/ChartTitle';

import Widget from '../Widget';
import Tooltip from './Tooltip';

const TICKS = 5;

const StyledStackedAreaChartWrapper = styled.div`
  width: 100%;
  font-size: 12px;
  color: ${config.colors.darkgrey};
  font-weight: 300;
`;

const StyledStackedAreaChart = styled(Widget)`
  width: 100%;
  padding: 12px 16px;

  .annotation-layer {
    z-index: 10000;
  }

  circle.annotation {
    fill: none;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
`;

/**
 * A StackedAreaChart component
 * @example
 * data: [
 *   {
 *     id: 'first',
 *     color: '#00C853',
 *     ttLabel: 'Typ',
 *     ttDataLabel: 'Messungen',
 *     data: [
 *      {
 *        date: 1,
 *        value: 16432
 *      },
 *      {
 *        date: 2,
 *        value: 13990
 *      },
 *      {
 *        date: 3,
 *        value: 11253
 *      },
 *      {
 *        date: 4,
 *        value: 8975
 *      },
 *      {
 *        date: 5,
 *        value: 7324
 *      }
 *    ]
 *  },
 *  …
 * ]
 *
 * @param {array}  data - items
 * @param {string} xAccessor - key for the x values
 * @param {string} yAccessor - key for the y values
 * @param {string} lineIDAccessor - data item key
 * @param {bool} withTooltip- wether render a tooltip or not
 * @param {bool} margin
 * @param {func} showAxis
 * @param {string} title
 * @param {string} legendLabel
 * @param {string} timeRangeUnit
 */
export default class StackedAreaChart extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    xAccessor: PropTypes.string.isRequired,
    yAccessor: PropTypes.string.isRequired,
    lineIDAccessor: PropTypes.string.isRequired,
    withTooltip: PropTypes.bool,
    margin: PropTypes.objectOf(PropTypes.number),
    showAxis: PropTypes.bool,
    title: PropTypes.string,
    legendLabel: PropTypes.string
  }

  static defaultProps = {
    margin: {
      left: 0, bottom: 0, right: 0, top: 16
    },
    withTooltip: false,
    showAxis: false,
    title: '',
    legendLabel: ''
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }

  componentDidMount() {

  }

  getTooltipContent = ({ data, parentLine }) => {
    const { lineIDAccessor, yAccessor, timeRangeUnit } = this.props;

    const metaInfo = [{
      label: parentLine.ttDataLabel,
      value: formatToLocalString(data[yAccessor], 0)
    },
    {
      label: 'Zeitpunkt',
      value: getDateTickLabel(data.date, timeRangeUnit)
    }];

    return (
      <Tooltip
        category={parentLine[lineIDAccessor]}
        categoryLabel={parentLine.ttLabel}
        meta={metaInfo}
      />
    );
  }

  getTickValues = () => {
    const { data: dataList } = this.props;
    if (!dataList.length || !dataList[0].data) return false;
    // take the first data entry and check how the range of date stamps
    const { data } = dataList[0];

    if (data.length <= TICKS) {
      return data.map(entry => entry.date);
    }

    const mod = Math.floor(data.length / TICKS);
    return data.map((entry, i) => (i % mod === 0 && entry.date)).filter(item => item);
  }

  getAxis = () => [
    {
      orient: 'left',
      ticks: 3,
      tickFormat: d => numberFormat(d),
      tickSize: 0
    },
    {
      orient: 'bottom',
      tickValues: this.getTickValues(this.props.data),
      tickFormat: d => getDateTickLabel(d, this.props.timeRangeUnit),
      tickSize: 0,
      tickLineGenerator: ({ xy }) => (
        <path
          key={`${xy.y1} - ${xy.x1}`}
          style={{ fill: config.colors.lightgrey, stroke: config.colors.midgrey }}
          d={`M${xy.x1},${xy.y1 - 5}L${xy.x2},${xy.y1 - 5}L${xy.x2},${xy.y1 + 5}L${xy.x1},${xy.y1 + 5}Z`}
        />
      )
    }
  ]

  getAnnotionConfig = () => [
    { type: 'frame-hover' },
    {
      type: 'highlight',
      style: d => ({ fill: d.color, strokeWidth: 0 })
    }
  ]

  getDimension() {
    const bounds = this.wrapper ? this.wrapper.getBoundingClientRect() : false;
    return bounds ? [bounds.width - 32, 160] : [100, 160];
  }

  render() {
    const {
      data,
      xAccessor,
      yAccessor,
      lineIDAccessor,
      margin,
      showAxis,
      withTooltip,
      title,
      legendLabel
    } = this.props;

    const dimensions = this.getDimension();

    return (
      <StyledStackedAreaChartWrapper ref={(ref) => { this.wrapper = ref; }}>
        <StyledStackedAreaChart>
          <TitleWrapper>
            <ChartTitle>{title}</ChartTitle>
            <Legend
              label={legendLabel}
              items={data}
            />
          </TitleWrapper>
          <XYFrame
            size={dimensions}
            lines={data}
            xScaleType={d3ScaleTime()}
            lineDataAccessor="data"
            lineStyle={d => ({ fill: d.color, fillOpacity: 0.75 })}
            lineType="stackedarea"
            xAccessor={xAccessor}
            yAccessor={yAccessor}
            lineIDAccessor={lineIDAccessor}
            margin={margin}
            hoverAnnotation={withTooltip && this.getAnnotionConfig()}
            tooltipContent={this.getTooltipContent}
            axes={showAxis && this.getAxis()}
          />
        </StyledStackedAreaChart>
      </StyledStackedAreaChartWrapper>
    );
  }
}

