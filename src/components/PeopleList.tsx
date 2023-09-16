import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PeopleItem } from './PeopleItem';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[],
  peopleFromSesver: Person[],
};

export const PeopleList: React.FC<Props> = ({
  people,
  peopleFromSesver,
}) => {
  const [sortPeople, setSortPeople] = useState<Person[]>(people);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getSearchSort = useCallback((value: string) => {
    if (sort !== value) {
      return { sort: value, order: null };
    }

    return (!order)
      ? { sort: value, order: 'desc' }
      : { sort: null, order: null };
  }, [sort, order]);

  const handlerSortPeople = useCallback((
    sortParam: 'name' | 'sex' | 'born' | 'died',
  ) => {
    return [...people].sort((a, b) => {
      if (typeof a[sortParam] === 'string') {
        const personA = a[sortParam].toString();
        const personB = b[sortParam].toString();

        return personA.localeCompare(personB);
      }

      const personA = +a[sortParam];
      const personB = +b[sortParam];

      return personA - personB;
    });
  }, [people]);

  const getSortedPeople = useCallback(() => {
    let sortedPeople = [...people];

    if (sort) {
      switch (sort) {
        case 'name':
          sortedPeople = handlerSortPeople('name');
          break;

        case 'sex':
          sortedPeople = handlerSortPeople('sex');
          break;

        case 'born':
          sortedPeople = handlerSortPeople('born');
          break;

        case 'died':
          sortedPeople = handlerSortPeople('died');
          break;

        default:
          sortedPeople = people;
      }

      return order ? sortedPeople.reverse() : sortedPeople;
    }

    return sortedPeople;
  }, [sort, people, order]);

  useEffect(() => {
    setSortPeople(getSortedPeople());
  }, [searchParams, people]);

  return (
    <>
      {!peopleFromSesver.length && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}
      {(!people.length && !!peopleFromSesver.length) ? (
        <p>There are no people matching the current search criteria</p>
      ) : (
        <>
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
                      params={getSearchSort('name')}
                    >
                      <span className="icon">
                        <i className={classNames(
                          'fas', {
                            'fa-sort': sort !== 'name',
                            'fa-sort-up': sort === 'name' && !order,
                            'fa-sort-down': sort === 'name' && order,
                          },
                        )}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>
                <th>
                  Sex
                  <SearchLink
                    params={getSearchSort('sex')}
                  >
                    <span className="icon">
                      <i className={classNames(
                        'fas', {
                          'fa-sort': sort !== 'sex',
                          'fa-sort-up': sort === 'sex' && !order,
                          'fa-sort-down': sort === 'sex' && order,
                        },
                      )}
                      />
                    </span>
                  </SearchLink>
                </th>
                <th>
                  Born
                  <SearchLink
                    params={getSearchSort('born')}
                  >
                    <span className="icon">
                      <i className={classNames(
                        'fas', {
                          'fa-sort': sort !== 'born',
                          'fa-sort-up': sort === 'born' && !order,
                          'fa-sort-down': sort === 'born' && order,
                        },
                      )}
                      />
                    </span>
                  </SearchLink>
                </th>
                <th>
                  Died
                  <SearchLink
                    params={getSearchSort('died')}
                  >
                    <span className="icon">
                      <i className={classNames(
                        'fas', {
                          'fa-sort': sort !== 'died',
                          'fa-sort-up': sort === 'died' && !order,
                          'fa-sort-down': sort === 'died' && order,
                        },
                      )}
                      />
                    </span>
                  </SearchLink>
                </th>
                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>

            <tbody>
              {sortPeople.map(pers => (
                <PeopleItem
                  key={pers.slug}
                  human={pers}
                  people={people}
                />
              ))}
            </tbody>
          </table>
        </>
      )}

    </>
  );
};
