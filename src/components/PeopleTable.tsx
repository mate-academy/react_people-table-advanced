import React from 'react';
import { Person } from '../types';
import { useParams, useSearchParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  filteredAndSortedPeople: Person[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ filteredAndSortedPeople }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  function setSortParms(field: string) {
    if (searchParams.has('order')) {
      return { sort: null, order: null };
    }

    if (searchParams.has('sort', field.toLowerCase())) {
      return { sort: field.toLowerCase(), order: 'desc' };
    }

    return { sort: field.toLowerCase(), order: null };
  }

  function getArrowClass(rowName: string) {
    if (
      searchParams.has('sort') &&
      !searchParams.has('order') &&
      rowName === searchParams.get('sort')
    ) {
      return '-up';
    }

    if (
      searchParams.has('sort') &&
      searchParams.has('order') &&
      rowName === searchParams.get('sort')
    ) {
      return '-down';
    }

    return '';
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['Name', 'Sex', 'Born', 'Died'].map(th => (
            <th key={th}>
              <span className="is-flex is-flex-wrap-nowrap">
                {th}
                <SearchLink params={setSortParms(th)}>
                  <span className="icon">
                    <i
                      className={`fas fa-sort${getArrowClass(th.toLowerCase())}`}
                    />
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
        {filteredAndSortedPeople.map(person => {
          const mother = filteredAndSortedPeople.find(
            peop => peop.name === person.motherName,
          );
          const father = filteredAndSortedPeople.find(
            peop => peop.name === person.fatherName,
          );

          return (
            <tr
              key={person.slug}
              className={slug === person.slug ? 'has-background-warning' : ''}
              data-cy="person"
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  person.motherName || '-'
                )}
              </td>

              <td>
                {father ? (
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
