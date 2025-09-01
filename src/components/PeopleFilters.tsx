import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import type { Person } from '../types';

type PersonRow = Person & {
  sex?: string;
  born?: number;
  died?: number;
  motherName?: string | null;
  fatherName?: string | null;
  id?: string | number;
  slug?: string;
};

type Props = {
  people: PersonRow[];
};

function bornCentury(year?: number | null): number | null {
  if (year === undefined || year === null) {
    return null;
  }

  return Math.ceil(year / 100);
}

export const PeopleFilters: React.FC<Props> = ({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { allCenturies, selectedCenturies } = useMemo(() => {
    const set = new Set<number>();

    people.forEach(p => {
      const c = bornCentury(p.born);

      if (c) {
        set.add(c);
      }
    });
    const all = Array.from(set).sort((a, b) => a - b);
    const selected = (searchParams.getAll('centuries') || [])
      .map(Number)
      .filter(n => !Number.isNaN(n));

    return { allCenturies: all, selectedCenturies: selected };
  }, [people, searchParams]);

  const query = searchParams.get('query') ?? '';

  const toggleCentury = (cent: number) => {
    const current = new Set<number>(selectedCenturies);

    if (current.has(cent)) {
      current.delete(cent);
    } else {
      current.add(cent);
    }

    const next = getSearchWith(searchParams, { centuries: [] });
    const nextParams = new URLSearchParams(next);

    nextParams.delete('centuries');

    Array.from(current)
      .sort((a, b) => a - b)
      .forEach(c => nextParams.append('centuries', String(c)));

    setSearchParams(nextParams);
  };

  const clearCenturies = () => {
    const next = getSearchWith(searchParams, { centuries: [] });
    const nextParams = new URLSearchParams(next);

    nextParams.delete('centuries');
    setSearchParams(nextParams);
  };

  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const next = getSearchWith(searchParams, {
      query: val.trim() ? val : null,
    });

    setSearchParams(next);
  };

  if (people.length === 0) {
    return null;
  }

  return (
    <aside
      className="people-filters"
      style={{ minWidth: 260, paddingRight: 16 }}
    >
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="nameFilter">
          <strong>Name filter</strong>
        </label>
        <input
          id="nameFilter"
          type="text"
          value={query}
          onChange={onQueryChange}
          placeholder="Search name / mother / father"
          style={{ width: '100%', marginTop: 4 }}
        />
      </div>

      <div style={{ marginBottom: 8 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <strong>Centuries</strong>
          <button type="button" onClick={clearCenturies}>
            Clear
          </button>
        </div>

        {allCenturies.length === 0 && (
          <div style={{ color: '#888' }}>No centuries in data</div>
        )}

        <div style={{ display: 'grid', gap: 6, marginTop: 8 }}>
          {allCenturies.map(c => {
            const checked = selectedCenturies.includes(c);

            return (
              <label
                key={c}
                style={{ display: 'flex', gap: 8, alignItems: 'center' }}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleCentury(c)}
                />
                <span>{c}th</span>
              </label>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
