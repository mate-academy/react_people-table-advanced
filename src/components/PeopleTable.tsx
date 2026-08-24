import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types/Person';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[];
}

type SortField = 'name' | 'sex' | 'born' | 'died';

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: selectedSlug } = useParams<{ slug?: string }>();
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort') as SortField | null;
  const currentOrder = searchParams.get('order');

  const getSortParams = (field: SortField) => {
    if (currentSort !== field) {
      return { sort: field, order: null };
    }

    if (currentOrder !== 'desc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIconClass = (field: SortField) => {
    if (currentSort !== field) {
      return 'fas fa-sort';
    }

    if (currentOrder === 'desc') {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort-up';
  };

  const peopleMap = new Map(people.map(p => [p.name, p]));

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {(['name', 'sex', 'born', 'died'] as SortField[]).map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field.charAt(0).toUpperCase() + field.slice(1)}
                <SearchLink params={getSortParams(field)}>
                  <span className="icon">
                    <i className={getSortIconClass(field)} />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = person.motherName
            ? peopleMap.get(person.motherName)
            : null;
          const father = person.fatherName
            ? peopleMap.get(person.fatherName)
            : null;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': person.slug === selectedSlug,
              })}
            >
              <td>
                <SearchLink
                  to={`/people/${person.slug}`}
                  className={classNames({
                    'has-text-danger': person.sex === 'f',
                  })}
                >
                  {person.name}
                </SearchLink>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <SearchLink
                    to={`/people/${mother.slug}`}
                    className="has-text-danger"
                  >
                    {mother.name}
                  </SearchLink>
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <SearchLink to={`/people/${father.slug}`}>
                    {father.name}
                  </SearchLink>
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
