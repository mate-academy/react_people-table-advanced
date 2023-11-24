import React from 'react';
import classNames from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const [searchParams] = useSearchParams();
  const currentSortField = searchParams.get('sort') || '';
  const isReversed = searchParams.get('order') === 'desc';

  const getSortParams = (field: string) => {
    if (field === currentSortField && !isReversed) {
      return { sort: field, order: 'desc' };
    }

    if (field === currentSortField && isReversed) {
      return { sort: null, order: null };
    }

    return { sort: field, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="
        table
        is-striped
        is-hoverable
        is-narrow
        is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            Name
            <SearchLink
              params={getSortParams('name')}
            >
              <span className="icon">
                <i className="fas fa-sort" />
              </span>
            </SearchLink>
          </th>
          <th>
            Sex
            <SearchLink
              params={getSortParams('sex')}
            >
              <span className="icon">
                <i className="fas fa-sort" />
              </span>
            </SearchLink>
          </th>
          <th>
            Born
            <SearchLink
              params={getSortParams('born')}
            >
              <span className="icon">
                <i className="fas fa-sort" />
              </span>
            </SearchLink>
          </th>
          <th>
            Died
            <SearchLink
              params={getSortParams('died')}
            >
              <span className="icon">
                <i className="fas fa-sort" />
              </span>
            </SearchLink>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <Link
                className={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
                to={`../${person.slug}`}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? (
                <Link
                  className="has-text-danger"
                  to={`../${person.mother?.slug}`}
                >
                  {person.motherName}
                </Link>
              ) : (
                person.motherName || '-'
              )}
            </td>
            <td>
              {person.father ? (
                <Link to={`../${person.father?.slug}`}>
                  {person.fatherName}
                </Link>
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
