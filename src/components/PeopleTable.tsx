import React, { ReactNode } from 'react';
import cn from 'classnames';
import { Loader } from './Loader';
import { Person } from '../types';
import { Link, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  isPeopleLoading: boolean;
  hasError: boolean;
  selectedPersonId: Person['slug'] | undefined;
  getCellWithMothername: (p: Person) => string | ReactNode;
  getCellWithFathername: (p: Person) => string | ReactNode;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  isPeopleLoading,
  hasError,
  selectedPersonId,
  getCellWithMothername,
  getCellWithFathername,
}) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const sortParams = (value: string) => {
    if (
      searchParams.has('sort') &&
      searchParams.has('order') &&
      value === sort
    ) {
      return { sort: null, order: null };
    }

    return sort === value
      ? { sort, order: 'desc' }
      : { sort: value, order: null };
  };

  const getSortIconClass = (field: string) => {
    if (sort !== field || !sort) {
      return 'fa-sort';
    }

    return order === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
  };

  return (
    <div className="column">
      <div className="box table-container">
        {isPeopleLoading ? (
          <Loader />
        ) : hasError ? (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        ) : people.length === 0 ? (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        ) : (
          <table
            data-cy="peopleTable"
            // eslint-disable-next-line max-len
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Name
                    <SearchLink params={sortParams('name')}>
                      <span className="icon">
                        <i className={cn('fas', getSortIconClass('name'))} />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Sex
                    <SearchLink params={sortParams('sex')}>
                      <span className="icon">
                        <i className={cn('fas', getSortIconClass('sex'))} />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Born
                    <SearchLink params={sortParams('born')}>
                      <span className="icon">
                        <i className={cn('fas', getSortIconClass('born'))} />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Died
                    <SearchLink params={sortParams('died')}>
                      <span className="icon">
                        <i className={cn('fas', getSortIconClass('died'))} />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>Mother</th>

                <th>Father</th>
              </tr>
            </thead>

            <tbody>
              {people.map(pers => (
                <tr
                  data-cy="person"
                  key={pers.slug}
                  className={cn({
                    'has-background-warning': selectedPersonId === pers.slug,
                  })}
                >
                  <td>
                    <Link
                      to={pers.slug}
                      className={cn({
                        'has-text-danger': pers.sex === 'f',
                      })}
                    >
                      {pers.name}
                    </Link>
                  </td>

                  <td>{pers.sex}</td>
                  <td>{pers.born}</td>
                  <td>{pers.died}</td>
                  <td>{getCellWithMothername(pers)}</td>
                  <td>{getCellWithFathername(pers)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
