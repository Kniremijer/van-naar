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

// Helper to find the category for a given unit
function findCategoryForUnits(from?: Unit, to?: Unit): Category | undefined {
  for (const cat of Object.keys(units) as Category[]) {
    if (
      (from && Array.from(units[cat] as readonly Unit[]).includes(from)) &&
      (to && Array.from(units[cat] as readonly Unit[]).includes(to))
    ) {
      return cat;
    }
  }
  return undefined;
}

export default function Converter({
  defaultCategory = 'lengte',
  initialFrom,
  initialTo,
}: Props) {
  // Determine a valid category based on initialFrom/initialTo
  const detectedCategory =
    (initialFrom && initialTo && findCategoryForUnits(initialFrom, initialTo)) ||
    defaultCategory;

  const categories = Object.keys(units) as Category[];
  const validCategory = units[detectedCategory] ? detectedCategory : defaultCategory;

  // Only use initialFrom/initialTo if they are valid for the category
  const startFrom = initialFrom && Array.from(units[validCategory] as readonly Unit[]).includes(initialFrom)
    ? initialFrom
    : Array.from(units[validCategory] as readonly Unit[])[0];
  const startTo = initialTo && Array.from(units[validCategory] as readonly Unit[]).includes(initialTo)
    ? initialTo
    : Array.from(units[validCategory] as readonly Unit[])[1];

  // Use validCategory, startFrom, startTo for initial state
  const [category, setCategory] = useState<Category>(validCategory);
  const [fromUnit, setFromUnit] = useState<Unit>(startFrom);
  const [toUnit, setToUnit] = useState<Unit>(startTo);
  const [value, setValue] = useState<number>(1);
  const [result, setResult] = useState<string>('—');

  useEffect(() => {
    try {
      const f = category === 'temperatuur' ? fromUnit.toUpperCase() : fromUnit;
      const t = category === 'temperatuur' ? toUnit.toUpperCase() : toUnit;
      const output = convert(value).from(f).to(t);
      setResult(output.toString());
    } catch (err) {
      setResult('×'); // Ongeldige conversie
    }
  }, [category, fromUnit, toUnit, value]);

  const setCat = (e: h.JSX.TargetedEvent<HTMLSelectElement, Event>) => {
    const c = e.currentTarget.value as Category;
    setCategory(c);
    setFromUnit(units[c][0]);
    setToUnit(units[c][1]);
  };

  return (
    <section aria-label="Rekenmodule eenheden" class="calc-card" onSubmit={e => e.preventDefault()}>
      {/* ① Categorie */}
      <div class="grp">
        <h3>Categorie</h3>
        <select value={category} onInput={setCat} aria-label="Categorie">
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* ② Van / Naar */}
      <div class="units-row">
        <div>
          <h3>Van</h3>
          <select value={fromUnit} onInput={(e) => setFromUnit(e.currentTarget.value as Unit)} aria-label="Van eenheid">
            {units[category].map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>

        <div>
          <h3>Naar</h3>
          <select value={toUnit} onInput={(e) => setToUnit(e.currentTarget.value as Unit)} aria-label="Naar eenheid">
            {units[category].map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
      </div>

      {/* ③ Invoer & Uitkomst */}
      <div class="io-row" aria-live="polite">
        <div class="input-wrap">
          <input
            type="number"
            value={value}
            step="any"
            aria-label="Waarde invoer"
            onInput={(e) => setValue(parseFloat(e.currentTarget.value))}
          />
          <span class="unit">{fromUnit}</span>
        </div>

        <div class="equals">➝</div>

        <div class="input-wrap">
          <output>{result}</output>
          <span class="unit">{toUnit}</span>
        </div>
      </div>
    </section>
  );
}