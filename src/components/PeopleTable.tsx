import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

interface PeopleTableProps {
  people: Person[],
}

const getSortParams = (sortType:any, isReversed:any, newSort:any) => {
  const sortParams = {
    sort: '',
    order: '',
  };

  if (sortType !== newSort && !isReversed) {
    sortParams.sort = newSort;
  }

  if (sortType === newSort && !isReversed) {
    sortParams.sort = newSort;
    sortParams.order = 'desc';
  }

  if (isReversed) {
    sortParams.order = '';
    sortParams.sort = '';
  }

  return sortParams;
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = (props: PeopleTableProps) => {
  const [URLSearchParams] = useSearchParams();
  const { people } = props;
  const { slug } = useParams();
  const isReversed = URLSearchParams.get('order');
  const sortType = URLSearchParams.get('sort');

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
              <SearchLink
                params={getSortParams(sortType, isReversed, 'name')}
              >
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sortType !== 'name',
                    'fa-sort-up': sortType === 'name' && !isReversed,
                    'fa-sort-down': sortType === 'name' && isReversed,
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={getSortParams(sortType, isReversed, 'sex')}
              >
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sortType !== 'sex',
                    'fa-sort-up': sortType === 'sex' && !isReversed,
                    'fa-sort-down': sortType === 'sex' && isReversed,
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={getSortParams(sortType, isReversed, 'born')}
              >
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sortType !== 'born',
                    'fa-sort-up': sortType === 'born' && !isReversed,
                    'fa-sort-down': sortType === 'born' && isReversed,
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={getSortParams(sortType, isReversed, 'died')}
              >
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sortType !== 'died',
                    'fa-sort-up': sortType === 'died' && !isReversed,
                    'fa-sort-down': sortType === 'died' && isReversed,
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <>
            <tr
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
              data-cy="person"
            >
              <td>
                <Link
                  to={`/people/${person.slug}`}
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
                {person.mother
                  ? (
                    <Link
                      to={`/people/${person.mother?.slug}`}
                      className="has-text-danger"
                    >
                      {person.motherName}
                    </Link>
                  )
                  : person.motherName}
                {!person.motherName && '-'}
              </td>
              <td>
                {person.father
                  ? (
                    <Link
                      to={`/people/${person.father?.slug}`}
                    >
                      {person.fatherName}
                    </Link>
                  )
                  : person.fatherName}
                {!person.fatherName && '-'}
              </td>
            </tr>
          </>
        ))}

      </tbody>
    </table>
  );
};
