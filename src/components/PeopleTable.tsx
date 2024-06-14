import React, { useCallback, useMemo } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[];
  selectedPerson?: Person | null;
  errorMessage: boolean;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPerson = null,
  errorMessage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort' || null);
  const order = searchParams.get('order' || null);

  const sortPeopleBy = useCallback(() => {
    const sortedPeople = [...people];

    if (sort) {
      sortedPeople.sort((person1, person2) => {
        const value1 = person1[sort as keyof Person];
        const value2 = person2[sort as keyof Person];

        if (typeof value1 === 'string' && typeof value2 === 'string') {
          return order === 'desc'
            ? value2.localeCompare(value1)
            : value1.localeCompare(value2);
        }

        if (typeof value1 === 'number' && typeof value2 === 'number') {
          return order === 'desc' ? value2 - value1 : value1 - value2;
        }

        return 0;
      });
    }

    return sortedPeople;
  }, [sort, order, people]);

  const checkNameParams = useCallback(
    (param: string) => {
      if (sort === param && !order) {
        // If acs, switch to desc
        setSearchParams(
          getSearchWith(searchParams, { sort: param, order: 'desc' }),
        );
      } else if (sort === param && order === 'desc') {
        // If sorted desc, remove sort
        setSearchParams(
          getSearchWith(searchParams, { sort: null, order: null }),
        );
      } else {
        // set sort to param
        setSearchParams(
          getSearchWith(searchParams, { sort: param, order: null }),
        );
      }
    },
    [searchParams, order, setSearchParams, sort],
  );

  const preparedPeople = useMemo(() => sortPeopleBy(), [sortPeopleBy]);

  return (
    <div className="column">
      <div className="box table-container">
        {errorMessage && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {people.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <a onClick={() => checkNameParams('name')}>
                    <span className="icon">
                      <i
                        className={`fas fa-sort${sort === 'name' ? (order === 'desc' ? '-down' : '-up') : ''}`}
                      />
                    </span>
                  </a>
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <a
                    onClick={() => {
                      checkNameParams('sex');
                    }}
                  >
                    <span className="icon">
                      <i
                        className={`fas fa-sort${sort === 'sex' ? (order === 'desc' ? '-down' : '-up') : ''}`}
                      />
                    </span>
                  </a>
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <a onClick={() => checkNameParams('born')}>
                    <span className="icon">
                      <i
                        className={`fas fa-sort${sort === 'born' ? (order === 'desc' ? '-down' : '-up') : ''}`}
                      />
                    </span>
                  </a>
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <a onClick={() => checkNameParams('died')}>
                    <span className="icon">
                      <i
                        className={`fas fa-sort${sort === 'died' ? (order === 'desc' ? '-down' : '-up') : ''}`}
                      />
                    </span>
                  </a>
                </span>
              </th>
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {preparedPeople.map(person => (
              <PersonLink
                person={person}
                key={person.slug}
                people={people}
                isSelected={
                  selectedPerson && selectedPerson.slug === person.slug
                }
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
