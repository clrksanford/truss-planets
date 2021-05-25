export function isNum(val) {
  return /^\d+$/.test(val);
}

export function calcSphereSurfaceArea(radius) {
  return 4 * Math.PI * Math.pow(radius, 2);
}
