// Base scale: 1 uvox = 0.1 mm edge length
const UVOX_EDGE_MM = 0.1;

// Length conversions
export function mmToUvox(mm) {
  return Math.round(mm / UVOX_EDGE_MM);
}
export function uvoxToMM(uvox) {
  return uvox * UVOX_EDGE_MM;
}
export function inchesToUvox(inches) {
  return mmToUvox(inches * 25.4);
}
export function uvoxToInches(uvox) {
  return uvoxToMM(uvox) / 25.4;
}

// Area conversions (square)
export function mm2ToUvox2(mm2) {
  return Math.round(mm2 / (UVOX_EDGE_MM ** 2));
}
export function uvox2ToMM2(uvox2) {
  return uvox2 * (UVOX_EDGE_MM ** 2);
}

// Volume conversions (cube)
export function mm3ToUvox3(mm3) {
  return Math.round(mm3 / (UVOX_EDGE_MM ** 3));
}
export function uvox3ToMM3(uvox3) {
  return uvox3 * (UVOX_EDGE_MM ** 3);
}
