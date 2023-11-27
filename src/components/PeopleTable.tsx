import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useMemo } from 'react';
import { Person } from '../types';
import { peopleFilter } from '../utils/filterFunction';
import { SearchLink } from './SearchLink';

const sortingField = ['name', 'sex', 'born', 'died'];

type Props = {
  allPeople :Person[];
};

export const PeopleTable: React.FC<Props> = ({ allPeople }) => {
  const { slug } = useParams();

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const setSortType = (value: string) => {
    if (sort === value && !order) {
      return {
        sort: value,
        order: 'desc',
      };
    }

    if (sort === value && order) {
      return {
        sort: null,
        order: null,
      };
    }

    return {
      sort: value,
      order: null,
    };
  };

  const visiblePeople = useMemo(() => (
    peopleFilter(allPeople,
      {
        query,
        sex,
        centuries,
        sort,
        order,
      })
  ), [query, sex, centuries, sort, order]);

  if (visiblePeople.length === 0) {
    return (
      <p>No results for your search</p>
    );
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortingField.map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field[0].toUpperCase() + field.slice(1)}
                <SearchLink
                  params={setSortType(`${field}`)}
                >
                  <span className="icon">
                    <i className={classNames('fas fa-sort', {
                      'fa-sort-up': sort === field && order !== 'desc',
                      'fa-sort-down': sort === field && order === 'desc',
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
        {visiblePeople.map(person => (
          <tr
            key={person.slug}
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
            data-cy="person"
          >
            <td>
              <Link
                to={`/people/${person.slug}`}
                onClick={() => person.slug === slug}
                className={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {
                person.mother?.slug ? (
                  <Link
                    to={`/people/${person.mother?.slug}`}
                    className="has-text-danger"
                    onClick={() => slug === person.mother?.slug}
                  >
                    {person.mother?.name}
                  </Link>
                ) : (
                  <p>{person.motherName ? person.motherName : '-'}</p>
                )
              }

            </td>
            <td>
              {
                person.father?.slug ? (
                  <Link
                    to={`/people/${person.father?.slug}`}
                    onClick={() => slug === person.father?.slug}
                  >
                    {person.fatherName ? person.fatherName : '-'}
                  </Link>
                ) : (
                  <p>{person.fatherName ? person.fatherName : '-'}</p>
                )
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
