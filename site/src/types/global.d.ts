/*  Stub-types voor convert-units
    Hiermee weet TypeScript dat de module bestaat
    en dat de default-export een functie is.  */
declare module 'convert-units' {
  type Unit = string;
  interface ConvertFn {
    (value: number): {
      from(unit: Unit): {
        to(unit: Unit): number;
      };
    };
  }
  const convert: ConvertFn;
  export = convert;
  export default convert;
}
