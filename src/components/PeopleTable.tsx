import { useCallback, useMemo } from 'react';
import { Person } from '../types/Person';
import cn from 'classnames';
import SexFilter from '../types/SexFilter';
import { useParams, useSearchParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type FilterTypesPeople = 'name' | 'sex' | 'born' | 'died';

type PeopleTableProps = {
  persons: Person[];
};

export const PeopleTable = ({ persons }: PeopleTableProps) => {
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams] = useSearchParams();

  // Читаємо всі параметри з URL
  const sortBy = searchParams.get('sort') as FilterTypesPeople | null;
  const sortOrder = searchParams.get('order') || 'asc';
  const sexFilter = (searchParams.get('sex') as SexFilter) || 'all';
  const inputFilterText = searchParams.get('query') || '';
  const centuriesFilter = searchParams.getAll('centuries');

  const byName = useMemo(
    () => new Map(persons.map(p => [p.name, p] as const)),
    [persons],
  );

  const nameSet = useMemo(() => {
    const s = new Set<string>();

    for (const p of persons) {
      if (p.name) {
        s.add(p.name);
      }
    }

    return s;
  }, [persons]);

  const highlightName = useCallback(
    (name: string | null) => !!name && nameSet.has(name),
    [nameSet],
  );

  const getSortIcon = useCallback(
    (filterType: FilterTypesPeople) => {
      if (sortBy !== filterType) {
        return 'fas fa-sort';
      }

      return sortOrder === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
    },
    [sortBy, sortOrder],
  );

  const sortedPeople = useMemo(() => {
    if (!sortBy) {
      return persons;
    }

    const direction = sortOrder === 'asc' ? 1 : -1;

    return [...persons].sort((a, b) => {
      switch (sortBy) {
        case 'name': {
          const an = a.name ?? '';
          const bn = b.name ?? '';

          return an.localeCompare(bn) * direction;
        }

        case 'sex': {
          const as = a.sex ?? '';
          const bs = b.sex ?? '';

          return as.localeCompare(bs) * direction;
        }

        case 'born': {
          const av = Number.isFinite(a.born as number) ? (a.born as number) : 0;
          const bv = Number.isFinite(b.born as number) ? (b.born as number) : 0;

          return (av - bv) * direction;
        }

        case 'died': {
          const av2 = Number.isFinite(a.died as number)
            ? (a.died as number)
            : 0;
          const bv2 = Number.isFinite(b.died as number)
            ? (b.died as number)
            : 0;

          return (av2 - bv2) * direction;
        }

        default:
          return 0;
      }
    });
  }, [persons, sortBy, sortOrder]);

  const getSortParams = (filterType: FilterTypesPeople) => {
    if (sortBy !== filterType) {
      // Встановлюємо нове сортування з порядком 'asc'
      return { sort: filterType, order: 'asc' };
    }

    if (sortOrder === 'asc') {
      // Змінюємо на 'desc'
      return { sort: filterType, order: 'desc' };
    }

    // Скидаємо сортування
    return { sort: null, order: null };
  };

  const filterTable = useMemo(() => {
    return sortedPeople.filter(p => {
      // Фільтр по статі
      if (sexFilter !== 'all' && p.sex !== sexFilter) {
        return false;
      }

      // Фільтр по імені (шукаємо в name, motherName, fatherName)
      if (inputFilterText) {
        const query = inputFilterText.toLowerCase();
        const matchesName = p.name?.toLowerCase().includes(query);
        const matchesMotherName = p.motherName?.toLowerCase().includes(query);
        const matchesFatherName = p.fatherName?.toLowerCase().includes(query);

        if (!matchesName && !matchesMotherName && !matchesFatherName) {
          return false;
        }
      }

      // Фільтр по століттях
      if (centuriesFilter.length > 0) {
        const century = Math.ceil(p.born / 100).toString();

        if (!centuriesFilter.includes(century)) {
          return false;
        }
      }

      return true;
    });
  }, [sortedPeople, sexFilter, inputFilterText, centuriesFilter]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink params={getSortParams('name')}>
                <span className="icon">
                  <i className={getSortIcon('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i className={getSortIcon('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i className={getSortIcon('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams('died')}>
                <span className="icon">
                  <i className={getSortIcon('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filterTable.map(person => {
          const isSelected = person.slug === slug;

          const motherName = person.motherName?.trim();
          const fatherName = person.fatherName?.trim();

          const mother = motherName ? byName.get(motherName) : undefined;
          const father = fatherName ? byName.get(fatherName) : undefined;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({ 'has-background-warning': isSelected })}
            >
              <td>
                <PersonLink
                  person={person}
                  className={person.sex === 'f' ? 'has-text-danger' : ''}
                />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {highlightName(person.motherName) && mother ? (
                  <PersonLink
                    person={mother}
                    className={
                      person.motherName === motherName ? 'has-text-danger' : ''
                    }
                  />
                ) : (
                  person.motherName || '-'
                )}
              </td>

              <td>
                {highlightName(person.fatherName) && father ? (
                  <PersonLink person={father} />
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
