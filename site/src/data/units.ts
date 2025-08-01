// src/data/units.ts
/**
 * Eén plaats om alle ondersteunde eenheden te definiëren.
 * Je kunt later categorieën of aliasen toevoegen.
 */
export const units = {
  lengte: ['mm', 'cm', 'm', 'km'],
  gewicht: ['mg', 'g', 'kg', 'ton'],
  temperatuur: ['C', 'F', 'K']
} as const;

export type Category = keyof typeof units;
