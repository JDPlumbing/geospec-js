# geospec-js

A compact encoding and utility library for representing **pure geometry schemas** in simulations, parallel to how `utomid` and `uvoxid` handle matter and spatial identity.

## ✨ Overview
- **GeoSpec** provides a deterministic, compact schema for describing geometric shapes purely by their dimensions.
- Each object is represented by a **bitmask** (up to 32 bits) that indicates which dimensions are active.
- Dimension values are stored as numeric arrays (float or fixed-point).
- No strings required — names like "pipe" or "sphere" are derivable by which parameters are set.

## 📦 Installation
```bash
npm install geospec-js
```
*(for local dev, just clone this repo and `npm test`)*

## 🚀 Usage
```js
import { encodeMask, decodeMask, shapeFromSpec } from "geospec-js";

// Example: Pipe (Length + ID + OD)
const mask = encodeMask(["length", "innerDiameter", "outerDiameter"]);
const values = [2000, 20, 25]; // mm

console.log(mask.toString(2)); // e.g. "100011"

const spec = { mask, values };
console.log(shapeFromSpec(spec));
// { type: "pipe", dimensions: { length: 2000, id: 20, od: 25 } }
```

## 🛠 API
### Core
- `encodeMask(params: string[])` → `number` (bitmask)
- `decodeMask(mask: number)` → `string[]` (list of params)
- `shapeFromSpec(spec: {mask, values})` → derived type + dimensions

### Canonical Parameters (32 slots)
1. length  
2. width  
3. height  
4. depth  
5. radius  
6. innerDiameter  
7. outerDiameter  
8. wallThickness  
9. angle  
10. curvature  
11. majorRadius  
12. minorRadius  
13. vertexCount  
14. edgeLength  
15. apothem  
16. surfaceArea  
17. volume  
18. crossSectionArea  
19. taperRatio  
20. aspectRatio  
21. slendernessRatio  
22–31 reserved

## ✅ Tests
```bash
npm test
```

All mask encoding, decoding, and derivations are covered.

## 🔮 Roadmap
- Predefined templates for common shapes (pipe, rod, beam, sphere, torus, plate).
- Geometry utilities (derived values: thickness, hollowness, etc.).
- Interop with `utomid` (matter) and `uvoxid` (location).

## 📄 License
MIT License. Free for use in simulation and research projects.
