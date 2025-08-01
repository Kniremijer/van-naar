/* ----------------------------------------------------------------
   src/components/Converter.tsx   –  v2 met start-eenheden
----------------------------------------------------------------- */
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import convert from 'convert-units';

import { units } from '../data/units';
import type { Category, Unit } from '../data/units';

interface Props {
  defaultCategory?: Category;
  initialFrom?: Unit;
  initialTo?: Unit;
}

export default function Converter({
  defaultCategory = 'lengte',
  initialFrom,
  initialTo,
}: Props) {
  const categories = Object.keys(units) as Category[];

  /* bepaal startwaarden */
  const startFrom = initialFrom ?? units[defaultCategory][0];
  const startTo   = initialTo   ?? units[defaultCategory][1];

  const [category, setCategory] = useState<Category>(defaultCategory);
  const [fromUnit, setFromUnit] = useState<Unit>(startFrom);
  const [toUnit, setToUnit]     = useState<Unit>(startTo);
  const [value, setValue]       = useState<number>(1);
  const [result, setResult]     = useState<string>('—');

  /* herberekenen */
  useEffect(() => {
    try {
      const f = category === 'temperatuur' ? fromUnit.toUpperCase() : fromUnit;
      const t = category === 'temperatuur' ? toUnit.toUpperCase()   : toUnit;
      const r = convert(value).from(f).to(t).toString();
      setResult(r);
    } catch {
      setResult('×');
    }
  }, [category, fromUnit, toUnit, value]);

  /* handlers */
  const handleCat = (e: h.JSX.TargetedEvent<HTMLSelectElement, Event>) => {
    const newCat = e.currentTarget.value as Category;
    setCategory(newCat);
    setFromUnit(units[newCat][0]);
    setToUnit(units[newCat][1]);
  };

  return (
    <div class="flex flex-wrap gap-2 items-center">
      <label>
        Categorie&nbsp;
        <select value={category} onInput={handleCat}>
          {categories.map(c => <option value={c}>{c}</option>)}
        </select>
      </label>

      <input type="number" value={value} step="any"
        onInput={(e: h.JSX.TargetedEvent<HTMLInputElement, Event>) =>
          setValue(parseFloat(e.currentTarget.value))} />

      <select value={fromUnit}
        onInput={(e: h.JSX.TargetedEvent<HTMLSelectElement, Event>) =>
          setFromUnit(e.currentTarget.value as Unit)}>
        {units[category].map(u => <option value={u}>{u}</option>)}
      </select>

      <span>=</span>

      <output>{result}</output>

      <select value={toUnit}
        onInput={(e: h.JSX.TargetedEvent<HTMLSelectElement, Event>) =>
          setToUnit(e.currentTarget.value as Unit)}>
        {units[category].map(u => <option value={u}>{u}</option>)}
      </select>
    </div>
  );
}
