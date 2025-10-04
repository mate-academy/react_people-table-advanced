// src/components/PeopleTable.tsx
import React, { useMemo, useEffect, useState } from 'react';
import { Person } from '../types/Person';
import './PeopleTable.scss';
import { SortHeader } from './SortHeader';
import {
  readSearchParamsFromHash,
  buildPeopleHashFromParams,
} from '../utils/hash';

type Props = {
  people: Person[] | null;
  loading: boolean;
  error: string | null;
  sexFilter: string | null;
  query: string;
  centuryFilters: string[];
};

function currentSelectedSlugFromHash(): string | null {
  const hash = typeof window !== 'undefined' ? window.location.hash : '';
  const cleanHash = hash.split('?')[0];
  const parts = cleanHash.split('/');

  if (parts.length > 2 && parts[1] === 'people') {
    return parts[2];
  }

  const params = readSearchParamsFromHash();

  return params.get('selected');
}

function applySortExplicit(field: string) {
  const params = readSearchParamsFromHash();
  const currentField = params.get('sort');
  const currentOrder = params.get('order');

  if (currentField !== field) {
    params.set('sort', field);
    params.delete('order');
  } else {
    if (!currentOrder) {
      params.set('order', 'desc');
    } else if (currentOrder === 'desc') {
      params.delete('sort');
      params.delete('order');
    } else {
      params.set('order', 'desc');
    }
  }

  params.delete('sortCycle');

  const newHash = buildPeopleHashFromParams(params);

  if (newHash !== (typeof window !== 'undefined' ? window.location.hash : '')) {
    history.replaceState(null, '', newHash);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }
}

export const PeopleTable: React.FC<Props> = ({
  people,
  error,
  sexFilter,
  query,
  centuryFilters = [],
}) => {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(
    currentSelectedSlugFromHash(),
  );

  useEffect(() => {
    const onHashChange = () => {
      const fromHash = currentSelectedSlugFromHash();

      setSelectedSlug(fromHash);
    };

    window.addEventListener('hashchange', onHashChange);

    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const slug = currentSelectedSlugFromHash();

    setSelectedSlug(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (people && people.length) {
      const slugFromHash = currentSelectedSlugFromHash();

      if (slugFromHash) {
        setSelectedSlug(slugFromHash);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [people]);

  const params = readSearchParamsFromHash();
  const sortField = params.get('sort');
  const orderParam = params.get('order');
  const sortOrder: 'asc' | 'desc' | null =
    sortField && !orderParam
      ? 'asc'
      : orderParam === 'desc'
        ? 'desc'
        : orderParam === 'asc'
          ? 'asc'
          : null;

  const normalize = (s: unknown) =>
    s === null || s === undefined ? null : String(s).trim();

  const filteredPeople = useMemo(() => {
    if (!people) {
      return [];
    }

    const includes = (s?: string | null) =>
      (s ?? '').toString().toLowerCase().includes(query.toLowerCase());

    const filtered = people.filter(p => {
      const matchesQuery =
        !query ||
        includes(p.name) ||
        includes(p.motherName) ||
        includes(p.fatherName);

      const sexValue = String(p.sex ?? '')
        .trim()
        .toLowerCase();
      const matchesSex =
        !sexFilter ||
        (sexFilter === 'm' && sexValue.startsWith('m')) ||
        (sexFilter === 'f' && sexValue.startsWith('f'));

      const bornCentury = Math.floor((p.born ?? 0) / 100) + 1;
      const matchesCentury =
        centuryFilters.length === 0 ||
        centuryFilters.includes(String(bornCentury));

      return matchesQuery && matchesSex && matchesCentury;
    });

    if (!sortField) {
      return filtered;
    }

    return [...filtered].sort((a, b) => {
      const getValue = (person: Person) => {
        switch (sortField) {
          case 'name':
            return person.name ?? '';
          case 'sexo':
            return person.sex ?? '';
          case 'born':
            return person.born ?? 0;
          case 'died':
            return person.died ?? 0;
          case 'mother':
            return person.motherName ?? '';
          case 'father':
            return person.fatherName ?? '';
          default:
            return '';
        }
      };

      const aVal = getValue(a);
      const bVal = getValue(b);

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
      }

      return sortOrder === 'desc'
        ? String(bVal).localeCompare(String(aVal))
        : String(aVal).localeCompare(String(bVal));
    });
  }, [people, query, sexFilter, centuryFilters, sortField, sortOrder]);

  // não renderizar tabela quando não há dados carregados, quando a lista está vazia ou quando há erro
  if (
    !people ||
    (Array.isArray(people) && people.length === 0) ||
    Boolean(error)
  ) {
    return null;
  }

  return (
    <table
      className="table is-striped is-hoverable is-fullwidth"
      data-cy="peopleTable"
    >
      <thead>
        <tr>
          <SortHeader
            field="name"
            label="Name"
            sortField={sortField}
            sortOrder={sortOrder}
            applySortExplicit={applySortExplicit}
          />
          <SortHeader
            field="sexo"
            label="Sex"
            sortField={sortField}
            sortOrder={sortOrder}
            applySortExplicit={applySortExplicit}
          />
          <SortHeader
            field="born"
            label="Born"
            sortField={sortField}
            sortOrder={sortOrder}
            applySortExplicit={applySortExplicit}
          />
          <SortHeader
            field="died"
            label="Died"
            sortField={sortField}
            sortOrder={sortOrder}
            applySortExplicit={applySortExplicit}
          />
          <th>
            <span className="is-flex is-align-items-center nowrap">Mother</span>
          </th>
          <th>
            <span className="is-flex is-align-items-center nowrap">Father</span>
          </th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map((person, idx) => {
          const key = person.id ?? person.slug ?? `person-${idx}`;

          const isSelected =
            normalize(selectedSlug) !== null &&
            normalize(selectedSlug) === normalize(person.slug);

          const sexRaw = (person.sex ?? '').toString().trim().toLowerCase();
          const isFemale = sexRaw.startsWith('f');
          const isMale = sexRaw.startsWith('m');

          const nameClass = isFemale
            ? 'has-text-danger'
            : isMale
              ? 'has-text-link'
              : '';

          const motherClass = isFemale ? 'has-text-danger' : '';
          const fatherClass = isMale ? 'has-text-link' : '';

          return (
            <tr
              key={key}
              data-cy="person"
              className={isSelected ? 'is-selected has-background-warning' : ''}
            >
              <td>
                <a
                  className={`is-clickable ${nameClass}`}
                  onClick={() => {
                    const clickParams = readSearchParamsFromHash();

                    clickParams.delete('page');
                    const qs = clickParams.toString();
                    const newHash = qs
                      ? `#/people/${person.slug}?${qs}`
                      : `#/people/${person.slug}`;

                    history.replaceState(null, '', newHash);
                    window.dispatchEvent(new HashChangeEvent('hashchange'));
                    setSelectedSlug(person.slug);
                  }}
                >
                  {person.name}
                </a>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td className={motherClass}>{person.motherName}</td>
              <td className={fatherClass}>{person.fatherName}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PeopleTable;
