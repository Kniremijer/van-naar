export const units = {
  lengte: ['mm', 'cm', 'dm', 'm', 'km'],
  temperatuur: ['c', 'f', 'k'],
  gewicht: ['mg', 'g', 'kg', 't'],
  volume: ['ml', 'cl', 'dl', 'l', 'm3'],
  tijd: ['ms', 's', 'min', 'h', 'd'],
  snelheid: ['mps', 'kmh', 'mph', 'kn'],
  energie: ['j', 'kj', 'cal', 'kcal'],
  druk: ['pa', 'kpa', 'bar', 'psi'],
  opslag: ['b', 'kb', 'mb', 'gb', 'tb'],
} as const;

export type Category = keyof typeof units;
export type Unit = (typeof units)[Category][number];
