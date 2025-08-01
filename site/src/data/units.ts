export const units = {
  lengte: ['mm', 'cm', 'dm', 'm', 'dam', 'hm', 'km'],
  temperatuur: ['c', 'f', 'k'],
} as const;

export type Category = keyof typeof units;
export type Unit = (typeof units)[Category][number];
