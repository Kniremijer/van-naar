/* ──────────────────────────────────────────────────────────────
   Converter.tsx  ·  grote “kaart” volgens stijlgids
──────────────────────────────────────────────────────────────── */
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
  const startFrom  = initialFrom ?? units[defaultCategory][0];
  const startTo    = initialTo   ?? units[defaultCategory][1];

  const [category, setCategory] = useState<Category>(defaultCategory);
  const [fromUnit, setFromUnit] = useState<Unit>(startFrom);
  const [toUnit,   setToUnit]   = useState<Unit>(startTo);
  const [value,    setValue]    = useState<number>(1);
  const [result,   setResult]   = useState<string>('—');

  /* ── herberekenen ───────────────────────────────────────── */
  useEffect(() => {
    try {
      const f = category === 'temperatuur' ? fromUnit.toUpperCase() : fromUnit;
      const t = category === 'temperatuur' ? toUnit.toUpperCase()   : toUnit;
      setResult(convert(value).from(f).to(t).toString());
    } catch { setResult('×'); }
  }, [category, fromUnit, toUnit, value]);

  /* ── handlers ───────────────────────────────────────────── */
  const setCat = (e: h.JSX.TargetedEvent<HTMLSelectElement, Event>) => {
    const c = e.currentTarget.value as Category;
    setCategory(c);
    setFromUnit(units[c][0]);
    setToUnit(units[c][1]);
  };

  /* ── UI ─────────────────────────────────────────────────── */
  return (
    <section aria-label="Rekenmodule eenheden" class="calc-card" onSubmit={e => e.preventDefault()}>
      {/* ① Categorie */}
      <div class="grp">
        <h3>Categorie</h3>
        <select value={category} onInput={setCat} aria-label="Categorie">
          {categories.map(c => <option value={c}>{c}</option>)}
        </select>
      </div>

      {/* ② Van / Naar */}
      <div class="units-row">
        <div>
          <h3>Van</h3>
          <select value={fromUnit} onInput={(e: h.JSX.TargetedEvent<HTMLSelectElement, Event>) =>
              setFromUnit(e.currentTarget.value as Unit)} aria-label="Van eenheid">
            {units[category].map(u => <option value={u}>{u}</option>)}
          </select>
        </div>

        <div>
          <h3>Naar</h3>
          <select value={toUnit} onInput={(e: h.JSX.TargetedEvent<HTMLSelectElement, Event>) =>
              setToUnit(e.currentTarget.value as Unit)} aria-label="Naar eenheid">
            {units[category].map(u => <option value={u}>{u}</option>)}
          </select>
        </div>
      </div>

      {/* ③ Waarde & Resultaat */}
      <div class="io-row" aria-live="polite">
        <div class="input-wrap">
          <input type="number" value={value} step="any" aria-label="Waarde invoer"
            onInput={(e: h.JSX.TargetedEvent<HTMLInputElement, Event>) =>
              setValue(parseFloat(e.currentTarget.value))} />
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
