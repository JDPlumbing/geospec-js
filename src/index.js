// index.js for geospec-js

// Canonical parameter set (32 slots)
const PARAMS = [
  "length",          // 0
  "width",           // 1
  "height",          // 2
  "depth",           // 3
  "radius",          // 4
  "innerDiameter",   // 5
  "outerDiameter",   // 6
  "wallThickness",   // 7
  "angle",           // 8
  "curvature",       // 9
  "majorRadius",     // 10
  "minorRadius",     // 11
  "vertexCount",     // 12
  "edgeLength",      // 13
  "apothem",         // 14
  "surfaceArea",     // 15
  "volume",          // 16
  "crossSectionArea",// 17
  "taperRatio",      // 18
  "aspectRatio",     // 19
  "slendernessRatio",// 20
  // 21–31 reserved
];

/**
 * Encode a list of parameters into a 32-bit mask.
 * @param {string[]} params
 * @returns {number} bitmask
 */
export function encodeMask(params) {
  let mask = 0;
  params.forEach(p => {
    const idx = PARAMS.indexOf(p);
    if (idx >= 0) mask |= (1 << idx);
  });
  return mask >>> 0; // ensure unsigned
}

/**
 * Decode a mask back into parameter names.
 * @param {number} mask
 * @returns {string[]}
 */
export function decodeMask(mask) {
  const active = [];
  PARAMS.forEach((p, idx) => {
    if (mask & (1 << idx)) active.push(p);
  });
  return active;
}

/**
 * Create a shape spec from mask + values.
 * @param {{mask: number, values: number[]}} spec
 * @returns {{type: string, dimensions: Object}}
 */
export function shapeFromSpec({ mask, values }) {
  const keys = decodeMask(mask);
  const dims = {};
  keys.forEach((k, i) => {
    dims[k] = values[i];
  });

  // crude type inference examples
  let type = "generic";
  if (keys.includes("innerDiameter") && keys.includes("outerDiameter") && keys.includes("length")) {
    type = "pipe";
  } else if (keys.includes("radius") && keys.includes("length")) {
    type = "rod";
  } else if (keys.length === 1 && keys[0] === "radius") {
    type = "sphere";
  }

  return { type, dimensions: dims };
}

// Export PARAMS for reference
export { PARAMS };
