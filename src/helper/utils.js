import moment from 'moment';
import L from 'leaflet';

export function getBasePath() {
  return BASENAME;
}

export function getImagePath(filename) {
  return `${BASENAME}assets/images/${filename}`;
}

export function isUndefined(obj) {
  return typeof obj === 'undefined';
}

export function isDefined(obj) {
  return typeof obj !== 'undefined' && obj !== null;
}


export function isNumeric(number) {
  if (isUndefined(number)) {
    return false;
  }

  return !isNaN(number) && isFinite(number);
}

export function formatToLocalString(number, precision) {
  if (!isNumeric(number) || isUndefined(Number.toLocaleString())) {
    return false;
  }
  return number.toLocaleString('de-DE', { minimumFractionDigits: precision, maximumFractionDigits: precision });
}

export function formatDate(dateObj) {
  return dateObj.format('YYYY-MM-DD').toString();
}

export function numberFormat(num, precision = 0) {
  if (!isNumeric(num)) {
    return false;
  }
  if (num >= 1000000000) {
    const formatNumber = formatToLocalString((num / 1000000000), 2);
    return `${formatNumber.replace(/\.0$/, '')}G`;
  }
  if (num >= 1000000) {
    const formatNumber = formatToLocalString((num / 1000000), 1);
    return `${formatNumber.replace(/\.0$/, '')}M`;
  }
  if (num >= 100000) {
    const formatNumber = formatToLocalString((num / 1000), 0);
    return `${formatNumber.replace(/\.0$/, '')}K`;
  }
  if (num >= 10000) {
    const formatNumber = formatToLocalString((num / 1000), 1);
    return `${formatNumber.replace(/\.0$/, '')}K`;
  }
  return formatToLocalString(num, precision);
}

export function compareStr(a, b) {
  if (isUndefined(a)) return false;

  if (a.localeCompare) {
    return a.localeCompare(b);
  }
  return a - b;
}

export function getTimeRangeLabel(timeRange, timeRangeUnit) {
  if (!timeRange || !timeRangeUnit) return '';

  // we add 1 unit to include the end value
  // so for ex. 01.03 - 02.03 = 2 days instead of 1
  const { label, unit } = config.timeRanges[timeRangeUnit];
  const diff = timeRange[1].diff(timeRange[0], unit) + 1;
  return `in ${diff} ${label}${diff > 1 ? 'en' : ''}`;
}

export function getDateTickLabel(d, timeRangeUnit) {
  return moment.unix(d).format(config.timeRanges[timeRangeUnit].format);
}

export function pointInRange(point, range) {
  const { lat, lng } = point;
  const se = { lat: range[0][0], lng: range[0][1] };
  const nw = { lat: range[1][0], lng: range[1][1] };

  return (lat <= nw.lat && lat >= se.lat)
  && (lng <= nw.lng && lng >= se.lng);
}

export function getBoundsForFeature(feature) {
  return L.geoJSON(feature).getBounds();
}

/**
 * @param {Array} range [2003, 2016]
 * @returns {Array} [2003, 2004, ..., 2016]
 */
export function getListInRange(range) {
  const size = range[1] - range[0];
  return [...Array(size + 1)].map((entry, i) => range[0] + i);
}

export function getRelativeValueString(total, part) {
  const percentageValue = (part * 100) / total;
  return formatToLocalString(percentageValue, 1);
}

export default {
  compareStr,
  getBasePath,
  getTimeRangeLabel,
  getImagePath,
  isUndefined,
  isDefined,
  isNumeric,
  numberFormat,
  getDateTickLabel,
  pointInRange,
  getListInRange,
  formatDate
};
