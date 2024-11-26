import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { PeopleFilteredContext } from '../contsxts/PeopleFilteredContext';
import { useSearchParams } from 'react-router-dom';
import { SortBy } from '../types/SortType';

type Props = {
  peoples: Person[];
};

const PersonLink: React.FC<{
  name: string | null | undefined;
  person?: Person;
}> = ({ name, person }) =>
  person ? (
    <Link
      to={`/people/${person.slug}`}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
    >
      {name}
    </Link>
  ) : (
    name || '-'
  );

export const PeopleTable: React.FC<Props> = ({ peoples }) => {
  const { peoplesFiltered } = useContext(PeopleFilteredContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') as SortBy | null;
  const order = searchParams.get('order') as 'asc' | 'desc' | null;
  const { slug } = useParams();
  const selectedName = slug;

  const logicClassNames = (name: SortBy) =>
    cn('fas', {
      'fa-sort': sortBy !== name || order === null,
      'fa-sort-up': sortBy === name && order === 'asc',
      'fa-sort-down': sortBy === name && order === 'desc',
    });

  const sortedPeople = React.useMemo(() => {
    if (!sortBy || !order) {
      return peoplesFiltered;
    }

    return [...peoplesFiltered].sort((a, b) => {
      const valA = a[sortBy];
      const valB = b[sortBy];

      if (valA == null && valB != null) {
        return order === 'asc' ? -1 : 1;
      }

      if (valA != null && valB == null) {
        return order === 'asc' ? 1 : -1;
      }

      if (valA == null && valB == null) {
        return 0;
      }

      if (typeof valA === 'string' && typeof valB === 'string') {
        return order === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      if (typeof valA === 'number' && typeof valB === 'number') {
        return order === 'asc' ? valA - valB : valB - valA;
      }

      return 0;
    });
  }, [peoplesFiltered, sortBy, order]);

  const handleSort = (selectedSort: SortBy) => {
    const newOrder =
      sortBy === selectedSort
        ? order === 'asc'
          ? 'desc'
          : order === 'desc'
            ? null
            : 'asc'
        : 'asc';

    const params = new URLSearchParams(searchParams);

    if (newOrder) {
      params.set('sortBy', selectedSort);
      params.set('order', newOrder);
    } else {
      params.delete('sortBy');
      params.delete('order');
    }

    setSearchParams(params);
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span
              className="is-flex is-flex-wrap-nowrap"
              onClick={() => handleSort('name')}
            >
              Name
              <span className="icon">
                <i className={logicClassNames('name')} />
              </span>
            </span>
          </th>

          <th>
            <span
              className="is-flex is-flex-wrap-nowrap"
              onClick={() => handleSort('sex')}
            >
              Sex
              <span className="icon">
                <i className={logicClassNames('sex')} />
              </span>
            </span>
          </th>

          <th>
            <span
              className="is-flex is-flex-wrap-nowrap"
              onClick={() => handleSort('born')}
            >
              Born
              <span className="icon">
                <i className={logicClassNames('born')} />
              </span>
            </span>
          </th>

          <th>
            <span
              className="is-flex is-flex-wrap-nowrap"
              onClick={() => handleSort('died')}
            >
              Died
              <span className="icon">
                <i className={logicClassNames('died')} />
              </span>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          const mother = peoples.find(p => p.name === person.motherName);
          const father = peoples.find(p => p.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.name}
              className={cn({
                'has-background-warning': selectedName === person.slug,
              })}
            >
              <td>
                <PersonLink name={person.name} person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                <PersonLink name={person.motherName} person={mother} />
              </td>
              <td>
                <PersonLink name={person.fatherName} person={father} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
