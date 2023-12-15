import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person, PersonsKeys } from '../../types';
import { PersonLink } from '../PersonLink';
import { getSearchWith } from '../../utils/search';

const sortingParameters = ['name', 'sex', 'born', 'died'];

type Props = {
  people: Person[],
  searchParams: URLSearchParams,
  sort: PersonsKeys | '',
  order: string,
};

export const PeopleTable: React.FC<Props> = ({
  people,
  searchParams,
  sort,
  order,
}) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortingParameters.map(parameter => (
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                {parameter[0].toLocaleUpperCase() + parameter.slice(1)}
                {order === 'desc' && sort === parameter
                  ? (
                    <Link
                      to={{
                        search:
                          getSearchWith(
                            { sort: null, order: null },
                            searchParams,
                          ),
                      }}
                    >
                      <span className="icon">
                        <i className="fas fa-sort-down" />
                      </span>
                    </Link>
                  ) : (
                    <Link
                      to={{
                        search: getSearchWith(
                          (sort === '' || sort !== parameter)
                            ? { sort: parameter, order: null }
                            : { order: 'desc' },
                          searchParams,
                        ),
                      }}
                    >
                      <span className="icon">
                        <i className={classNames('fas', {
                          'fa-sort': sort !== parameter,
                          'fa-sort-up': sort === parameter && order !== 'desc',
                        })}
                        />
                      </span>
                    </Link>
                  )}
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>

        {people.map((person) => (
          <PersonLink
            person={person}
            people={people}
            key={person.name}
          />
        ))}
      </tbody>
    </table>
  );
};
