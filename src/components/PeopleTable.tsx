import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { getSearchWith } from '../utils/searchHelper';

interface Props {
  people: Person[];
}

type SortField = 'name' | 'sex' | 'born' | 'died';

const findPerson = (
  people: Person[],
  name: string | null,
  personObj?: Person,
): Person | null => {
  if (!name && !personObj) {
    return null;
  }

  return (
    people.find(
      p => p.name === name || (personObj && p.slug === personObj.slug),
    ) || null
  );
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const { slug } = useParams<{ slug: string }>();

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const getSortSearch = (field: SortField) => {
    if (currentSort !== field) {
      return getSearchWith(searchParams, { sort: field, order: null });
    }

    if (currentOrder !== 'desc') {
      return getSearchWith(searchParams, { sort: field, order: 'desc' });
    }

    return getSearchWith(searchParams, { sort: null, order: null });
  };

  const getSortIconClass = (field: SortField) => {
    if (currentSort !== field) {
      return 'fa-sort';
    }

    return currentOrder === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
  };

  const columns: { label: string; field: SortField }[] = [
    { label: 'Name', field: 'name' },
    { label: 'Sex', field: 'sex' },
    { label: 'Born', field: 'born' },
    { label: 'Died', field: 'died' },
  ];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columns.map(({ label, field }) => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {label}
                <Link to={{ search: getSortSearch(field) }}>
                  <span className="icon">
                    <i className={`fas ${getSortIconClass(field)}`} />
                  </span>
                </Link>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const motherName = person.motherName || person.mother?.name || null;
          const fatherName = person.fatherName || person.father?.name || null;

          const mother = findPerson(people, motherName, person.mother);
          const father = findPerson(people, fatherName, person.father);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? <PersonLink person={mother} /> : motherName || '-'}
              </td>
              <td>
                {father ? <PersonLink person={father} /> : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
