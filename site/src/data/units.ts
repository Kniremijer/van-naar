export const units = {
  lengte: ['mm', 'cm', 'm', 'km', 'in', 'ft', 'yd', 'mi'],
  gewicht: ['mg', 'g', 'kg', 't', 'oz', 'lb'],
  temperatuur: ['C', 'F', 'K'],
  volume: ['ml', 'l', 'm3', 'floz', 'cup', 'pt', 'qt', 'gal', 'tsp', 'tbsp'],
  tijd: ['ms', 's', 'min', 'h', 'd'],
  energie: ['J', 'kJ', 'cal', 'kcal', 'Wh', 'kWh'],
  snelheid: ['m/s', 'km/h', 'mph', 'ft/s', 'knot'],
  oppervlakte: ['mm2', 'cm2', 'm2', 'km2', 'in2', 'ft2', 'yd2', 'acre', 'ha']
} as const;

export type Category = keyof typeof units;
export type Unit = (typeof units)[Category][number];