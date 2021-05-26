import { isNum } from './math';
import { UNKNOWN_DISPLAY, UNKNOWN_VALS } from '../constants';

export function formatNumericValue(value) {
  if (!isNum(value) || parseInt(value) <= 999) {
    return value;
  }
  return new Intl.NumberFormat('en-US').format(value).replace(/,/g, ' ');
}

export function formatUnknownValue(value) {
  return UNKNOWN_VALS.indexOf(value) > -1 ? UNKNOWN_DISPLAY : value;
}
