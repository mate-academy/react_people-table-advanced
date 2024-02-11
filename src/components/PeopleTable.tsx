import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { SearchLink } from './SearchLink';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[],
};

const SORT = ['name', 'sex', 'born', 'died'];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const isSorted = searchParams.get('sort');
  const isReversed = searchParams.get('order') === 'desc';

  let sortedPeople = [...people].sort((a, b) => {
    switch (isSorted) {
      case 'name':
      case 'sex':
        return a[isSorted].localeCompare(b[isSorted]);

      case 'born':
      case 'died':
        return a[isSorted] - b[isSorted];

      default:
        return 0;
    }
  });

  if (isReversed) {
    sortedPeople = sortedPeople.reverse();
  }

  const getSortParams = (param: string) => {
    return {
      sort: param === isSorted && isReversed ? null : param,
      order: param === isSorted && !isReversed ? 'desc' : null,
    };
  };

  return (
    <>
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {SORT.map(field => (
              <th key={field}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {field[0].toUpperCase() + field.slice(1)}
                  <SearchLink params={getSortParams(field)}>
                    <span className="icon">
                      <i className={classNames('fas', {
                        'fa-sort': field !== isSorted,
                        'fa-sort-up': field === isSorted && !isReversed,
                        'fa-sort-down': field === isSorted && isReversed,
                      })}
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
          {sortedPeople.map(person => (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': person.slug === slug,
              })}
            >
              <td aria-label="Link">
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td aria-label="Link">
                {person.mother
                  ? <PersonLink person={person.mother} />
                  : person.motherName || '-'}
              </td>
              <td aria-label="Link">
                {person.father
                  ? <PersonLink person={person.father} />
                  : person.fatherName || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!people.length && (
        <article className="message is-info">
          <div className="message-header">
            <p>Info</p>
          </div>

          <div className="message-body">
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          </div>
        </article>
      )}
    </>

  );
};
