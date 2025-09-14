import { encodeMask, decodeMask, shapeFromSpec } from "../src/index.js";

describe("GeoSpec", () => {
  test("Pipe (Length + ID + OD)", () => {
    const mask = encodeMask(["length", "innerDiameter", "outerDiameter"]);
    const values = [2000, 20, 25];
    const spec = { mask, values };
    const result = shapeFromSpec(spec);

    expect(decodeMask(mask)).toEqual(["length", "innerDiameter", "outerDiameter"]);
    expect(result.type).toBe("pipe");
    expect(result.dimensions).toEqual({ length: 2000, innerDiameter: 20, outerDiameter: 25 });
  });

  test("Rod (Length + Radius)", () => {
    const mask = encodeMask(["length", "radius"]);
    const values = [1000, 10];
    const spec = { mask, values };
    const result = shapeFromSpec(spec);

    expect(result.type).toBe("rod");
    expect(result.dimensions).toEqual({ length: 1000, radius: 10 });
  });

  test("Sphere (Radius only)", () => {
    const mask = encodeMask(["radius"]);
    const values = [50];
    const spec = { mask, values };
    const result = shapeFromSpec(spec);

    expect(result.type).toBe("sphere");
    expect(result.dimensions).toEqual({ radius: 50 });
  });
});
