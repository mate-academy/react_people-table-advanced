/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import type { Person } from '../types';
import { SearchLink } from './SearchLink';

type SortField = 'name' | 'sex' | 'born' | 'died';
type SortOrder = 'desc' | null;

type PersonRow = Person & {
  sex?: string;
  born?: number;
  died?: number;
  motherName?: string | null;
  fatherName?: string | null;
};

type Props = {
  people: PersonRow[];
  selectedName?: string | null;
};

// slugify: имя → нижний регистр, пробелы → дефисы, + год рождения (если передан)
export function slugifyName(name: string, born?: number | null): string {
  const base = name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  return born ? `${base}-${born}` : base;
}

const SELECTORS: Record<
  SortField,
  (p: PersonRow) => string | number | undefined
> = {
  name: p => p.name,
  sex: p => p.sex,
  born: p => p.born,
  died: p => p.died,
};

function normalize(str?: string | null) {
  return (str ?? '').toLowerCase();
}

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedName = null,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = (searchParams.get('sort') as SortField | null) ?? null;
  const order: SortOrder = searchParams.get('order') === 'desc' ? 'desc' : null;
  const query = normalize(searchParams.get('query') ?? '');
  const centuries = searchParams
    .getAll('centuries')
    .map(Number)
    .filter(n => !Number.isNaN(n));

  // быстрый поиск человека по имени (берём первого, если в данных есть дубликаты)
  const findByName = React.useMemo(() => {
    const map = new Map<string, PersonRow[]>();

    people.forEach(p => {
      const key = (p.name || '').trim();

      if (!map.has(key)) {
        map.set(key, []);
      }

      map.get(key)!.push(p);
    });

    return (name?: string | null): PersonRow | undefined => {
      if (!name) {
        return undefined;
      }

      const arr = map.get(name.trim());

      return arr?.[0];
    };
  }, [people]);

  // фильтрация
  const filtered = React.useMemo(() => {
    const byQuery = (p: PersonRow) => {
      if (!query) {
        return true;
      }

      const fields = [p.name, p.motherName ?? '', p.fatherName ?? ''].map(
        normalize,
      );

      return fields.some(f => f.includes(query));
    };

    const byCenturies = (p: PersonRow) => {
      if (centuries.length === 0) {
        return true;
      }

      if (p.born === undefined || p.born === null) {
        return false;
      }

      const c = Math.ceil(p.born / 100);

      return centuries.includes(c);
    };

    return people.filter(p => byQuery(p) && byCenturies(p));
  }, [people, query, centuries]);

  // сортировка (после фильтрации)
  const sorted = React.useMemo(() => {
    if (!sort) {
      return filtered;
    }

    const s = [...filtered].sort((a, b) => {
      const av = SELECTORS[sort](a);
      const bv = SELECTORS[sort](b);

      if (typeof av === 'string' && typeof bv === 'string') {
        return normalize(av).localeCompare(normalize(bv));
      }

      const an = typeof av === 'number' ? av : Number.NaN;
      const bn = typeof bv === 'number' ? bv : Number.NaN;

      if (Number.isNaN(an) && Number.isNaN(bn)) {
        return 0;
      }

      if (Number.isNaN(an)) {
        return -1;
      }

      if (Number.isNaN(bn)) {
        return 1;
      }

      return an - bn;
    });

    if (order === 'desc') {
      s.reverse();
    }

    return s;
  }, [filtered, sort, order]);

  // 3-состояния: none → asc → desc → none
  const cycleSort = (field: SortField) => {
    let nextSort: SortField | null = field;
    let nextOrder: SortOrder = null;

    if (sort !== field) {
      nextSort = field;
      nextOrder = null;
    } else if (sort === field && order !== 'desc') {
      nextSort = field;
      nextOrder = 'desc';
    } else {
      nextSort = null;
      nextOrder = null;
    }

    const next = getSearchWith(searchParams, {
      sort: nextSort,
      order: nextOrder,
    });
    const nextParams = new URLSearchParams(next);

    if (!nextSort) {
      nextParams.delete('sort');
    }

    if (!nextOrder) {
      nextParams.delete('order');
    }

    setSearchParams(nextParams);
  };

  return (
    <div data-cy="peopleTable" style={{ flex: 1, overflowX: 'auto' }}>
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>
              <span>Name</span>
              <button
                type="button"
                onClick={() => cycleSort('name')}
                aria-label="Sort by name"
                data-cy="sortByName"
                style={{ marginLeft: 8 }}
              />
            </th>
            <th>
              <span>Sex</span>
              <button
                type="button"
                onClick={() => cycleSort('sex')}
                aria-label="Sort by sex"
                data-cy="sortBySex"
                style={{ marginLeft: 8 }}
              />
            </th>
            <th>
              <span>Born</span>
              <button
                type="button"
                onClick={() => cycleSort('born')}
                aria-label="Sort by born"
                data-cy="sortByBorn"
                style={{ marginLeft: 8 }}
              />
            </th>
            <th>
              <span>Died</span>
              <button
                type="button"
                onClick={() => cycleSort('died')}
                aria-label="Sort by died"
                data-cy="sortByDied"
                style={{ marginLeft: 8 }}
              />
            </th>
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {sorted.map((p, idx) => {
            const isSelected = !!selectedName && p.name === selectedName;

            // сам человек: имя + (если есть) год рождения
            const personSlug = slugifyName(p.name, p.born);

            // мать/отец: ищем их объект по имени; линк — только если нашли
            const mother = findByName(p.motherName ?? null);
            const father = findByName(p.fatherName ?? null);

            return (
              <tr
                key={`${p.name}-${idx}`}
                data-cy="person"
                className={isSelected ? 'has-background-warning' : undefined}
              >
                <td>
                  <SearchLink
                    to={`/people/${personSlug}`}
                    preserveSearch
                    className={p.sex === 'f' ? 'has-text-danger' : undefined}
                  >
                    {p.name}
                  </SearchLink>
                </td>

                <td>{p.sex ?? ''}</td>
                <td>{p.born ?? ''}</td>
                <td>{p.died ?? ''}</td>

                <td>
                  {p.motherName ? (
                    mother ? (
                      <SearchLink
                        to={`/people/${slugifyName(mother.name, mother.born)}`}
                        preserveSearch
                        className="has-text-danger"
                      >
                        {p.motherName}
                      </SearchLink>
                    ) : (
                      // если матери нет в таблице — показываем обычный текст
                      <>{p.motherName}</>
                    )
                  ) : (
                    '-'
                  )}
                </td>

                <td>
                  {p.fatherName ? (
                    father ? (
                      <SearchLink
                        to={`/people/${slugifyName(father.name, father.born)}`}
                        preserveSearch
                      >
                        {p.fatherName}
                      </SearchLink>
                    ) : (
                      // если отца нет в таблице — показываем обычный текст
                      <>{p.fatherName}</>
                    )
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {sorted.length === 0 && (
        <div style={{ padding: 16, color: '#777' }}>
          No people match your filters.
        </div>
      )}
    </div>
  );
};
