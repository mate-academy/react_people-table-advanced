import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { PeopleItem } from './PeopleItem';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[],
};

export const PeopleList: React.FC<Props> = ({
  people,
}) => {
  const [sortPeople, setSortPeople] = useState<Person[]>(people);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';

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
      const personA = a[sortParam];
      const personB = b[sortParam];

      if (typeof personA === 'string' && typeof personB === 'string') {
        return personA.localeCompare(personB);
      }

      return (+personA) - (+personB);
    });
  }, [people]);

  const getSortedPeople = useCallback(() => {
    let sortedPeople = [...people];

    if (sort) {
      switch (sort) {
        case 'name':
        case 'sex':
        case 'born':
        case 'died':
          sortedPeople = handlerSortPeople(sort);
          break;

        default:
          sortedPeople = people;
      }

      return order ? sortedPeople.reverse() : sortedPeople;
    }

    return sortedPeople;
  }, [sort, people, order]);

  const getFilteredPeople = useCallback((sortedPeoples: Person[]) => {
    return sortedPeoples
      .filter(person => {
        const normalizeQuery = query.trim().toLocaleLowerCase();
        const { name, motherName, fatherName } = person;

        if (normalizeQuery) {
          if (!!motherName
            && motherName.toLocaleLowerCase().includes(normalizeQuery)
          ) {
            return true;
          }

          if (!!fatherName
            && fatherName.toLocaleLowerCase().includes(normalizeQuery)
          ) {
            return true;
          }

          return name.toLocaleLowerCase().includes(normalizeQuery);
        }

        return true;
      })
      .filter(person => {
        if (sex) {
          return person.sex === sex;
        }

        return true;
      })
      .filter(person => {
        if (!!centuries && !!centuries.length) {
          const { born } = person;
          const bornCentury = Math.ceil(+born / 100);

          return centuries.includes(bornCentury.toString());
        }

        return true;
      });
  }, [query, sex, centuries]);

  useEffect(() => {
    setSortPeople(getFilteredPeople(getSortedPeople()));
  }, [searchParams, people]);

  return (
    <>
      {!people.length && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}
      {(!sortPeople.length) ? (
        <p>There are no people matching the current search criteria</p>
      ) : (
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
                      <i className={cn(
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
                    <i className={cn(
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
                    <i className={cn(
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
                    <i className={cn(
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
      )}

    </>
  );
};
