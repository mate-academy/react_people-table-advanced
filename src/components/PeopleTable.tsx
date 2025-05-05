import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import '../App.scss';

interface PeopleTableProps {
  people: Person[];
  selectedSlug: string;
}

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  selectedSlug,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sexFilter = searchParams.get('sex') ?? 'all';
  const nameFilter = searchParams.get('name') ?? '';
  const centuries = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  const filtered = people.filter(p => {
    if (sexFilter !== 'all' && p.sex !== sexFilter) {
      return false;
    }

    const term = nameFilter.toLowerCase();
    const matchesName =
      !nameFilter ||
      p.name.toLowerCase().includes(term) ||
      p.motherName?.toLowerCase().includes(term) ||
      p.fatherName?.toLowerCase().includes(term);

    if (!matchesName) {
      return false;
    }

    if (centuries.length > 0) {
      const century = Math.floor((p.born - 1) / 100) + 1;

      return centuries.includes(String(century));
    }

    return true;
  });

  const sorted = React.useMemo(() => {
    if (!sortField) {
      return filtered;
    }

    const list = [...filtered];

    list.sort((a, b) => {
      const aVal = a[sortField as keyof Person] as string | number | undefined;
      const bVal = b[sortField as keyof Person] as string | number | undefined;

      const aCompare = typeof aVal === 'string' ? aVal.toLowerCase() : aVal;
      const bCompare = typeof bVal === 'string' ? bVal.toLowerCase() : bVal;

      if (aCompare == null || bCompare == null) {
        return 0;
      }

      if (aCompare < bCompare) {
        return sortOrder === 'desc' ? 1 : -1;
      }

      if (aCompare > bCompare) {
        return sortOrder === 'desc' ? -1 : 1;
      }

      return 0;
    });

    return list;
  }, [filtered, sortField, sortOrder]);

  const cycleSort = (field: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.get('sort');
    const order = params.get('order');

    if (current !== field) {
      params.set('sort', field);
      params.set('order', 'asc');
    } else if (order !== 'desc') {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  };

  const renderIcon = (field: string) => {
    if (sortField !== field) {
      return <i className="fas fa-sort" />;
    }

    return sortOrder === 'asc' ? (
      <i className="fas fa-sort-up" />
    ) : (
      <i className="fas fa-sort-down" />
    );
  };

  return (
    <div className="block">
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            <th onClick={() => cycleSort('name')} style={{ cursor: 'pointer' }}>
              <span className="is-flex is-flex-wrap-nowrap">
                Name
                <span className="icon ml-1 sort-icon">
                  {renderIcon('name')}
                </span>
              </span>
            </th>
            <th onClick={() => cycleSort('sex')} style={{ cursor: 'pointer' }}>
              <span className="is-flex is-flex-wrap-nowrap">
                Sex
                <span className="icon ml-1 sort-icon">{renderIcon('sex')}</span>
              </span>
            </th>
            <th onClick={() => cycleSort('born')} style={{ cursor: 'pointer' }}>
              <span className="is-flex is-flex-wrap-nowrap">
                Born
                <span className="icon ml-1 sort-icon">
                  {renderIcon('born')}
                </span>
              </span>
            </th>
            <th onClick={() => cycleSort('died')} style={{ cursor: 'pointer' }}>
              <span className="is-flex is-flex-wrap-nowrap">
                Died
                <span className="icon ml-1 sort-icon">
                  {renderIcon('died')}
                </span>
              </span>
            </th>
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(p => {
            const mother = people.find(x => x.name === p.motherName);
            const father = people.find(x => x.name === p.fatherName);
            const isSelected = p.slug === selectedSlug;

            return (
              <tr
                key={p.slug}
                data-cy="person"
                className={isSelected ? 'has-background-warning' : ''}
              >
                <td>
                  <PersonLink person={p} />
                </td>
                <td>{p.sex}</td>
                <td>{p.born}</td>
                <td>{p.died}</td>
                <td>
                  {p.motherName ? (
                    mother ? (
                      <PersonLink person={mother} />
                    ) : (
                      <span>{p.motherName}</span>
                    )
                  ) : (
                    <span>-</span>
                  )}
                </td>
                <td>
                  {p.fatherName ? (
                    father ? (
                      <PersonLink person={father} />
                    ) : (
                      <span>{p.fatherName}</span>
                    )
                  ) : (
                    <span>-</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
