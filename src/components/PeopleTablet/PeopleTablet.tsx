import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[];
  person?: string;
};

export const PeopleTablet: React.FC<Props> = ({ people, person }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order') || 'asc';

  const handleSort = (field: string) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order') || 'asc';

    const newParams = new URLSearchParams(searchParams);

    if (currentSort !== field) {
      newParams.set('sort', field);
      newParams.set('order', 'asc');
    } else if (currentOrder === 'asc') {
      newParams.set('order', 'desc');
    } else {
      newParams.delete('sort');
      newParams.delete('order');
    }

    setSearchParams(newParams);
  };

  const sortedPeople = React.useMemo(() => {
    if (!sortField) {
      return people;
    }

    const sorted = [...people].sort((a, b) => {
      const aVal = a[sortField as keyof Person];
      const bVal = b[sortField as keyof Person];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return aVal.localeCompare(bVal);
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return aVal - bVal;
      }

      return 0;
    });

    return sortOrder === 'desc' ? sorted.reverse() : sorted;
  }, [people, sortField, sortOrder]);

  const getSortIcon = (field: string) => {
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
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['name', 'sex', 'born', 'died'].map(field => (
            <th key={field}>
              <span className="is-flex is-align-items-center">
                {field.charAt(0).toUpperCase() + field.slice(1)}
                <button
                  onClick={() => handleSort(field)}
                  className="button is-white is-small ml-2"
                >
                  {getSortIcon(field)}
                </button>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(human => (
          <tr
            key={human.slug}
            data-cy="person"
            className={person === human.slug ? 'has-background-warning' : ''}
          >
            <td>
              <Link
                to={`/people/${human.slug}`}
                className={human.sex === 'f' ? 'has-text-danger' : ''}
              >
                {human.name}
              </Link>
            </td>
            <td>{human.sex}</td>
            <td>{human.born}</td>
            <td>{human.died}</td>
            <td>
              <PersonLink personName={human.motherName} people={people} />
            </td>
            <td>
              <PersonLink personName={human.fatherName} people={people} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
