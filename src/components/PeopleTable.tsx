import { useState, useEffect, useMemo } from 'react';
import cn from 'classnames';
import { Person } from '../types';
import { getPeople, matchParents } from '../utils';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';
import { usePeopleListContext } from '../context/PeopleListContext';
import { Sex } from '../types/SexFilter';
import { SearchLink } from './SearchLink';
import { Categories } from '../types/SortCategory';
import { Order } from '../types/Order';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  const {
    sexFilter, query, centuriesFilter, sortBy, order,
  } = usePeopleListContext();

  const handleSort = (category: Categories) => {
    if (category !== sortBy) {
      return { sort: category, order: Order.ASC };
    }

    if (category === sortBy && order === Order.ASC) {
      return { sort: category, order: Order.DESC };
    }

    return { sort: null, order: null };
  };

  const loadData = async () => {
    setIsLoading(false);

    try {
      setIsLoading(true);
      const response = await getPeople();
      const peopleWithParents = matchParents(response as Person[]);

      setPeople(peopleWithParents);
    } catch (error) {
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const peopleToRender = useMemo(() => {
    // FILTER BY SEX
    let filteredPeople = people?.filter(person => {
      switch (sexFilter) {
        case null:
          return person;
        case Sex.MALE:
          return person.sex === Sex.MALE;
        case Sex.FEMALE:
          return person.sex === Sex.FEMALE;
        default:
          return person;
      }
    });

    // FILTER BY QUERY
    if (query) {
      filteredPeople = filteredPeople?.filter(person => {
        const name = person.name.toLocaleLowerCase();
        const motherName = person.motherName?.toLocaleLowerCase();
        const fatherName = person.fatherName?.toLocaleLowerCase();
        const searchedQuery = query.toLocaleLowerCase().trim();

        if (name.includes(query)
          || motherName?.includes(searchedQuery)
          || fatherName?.includes(searchedQuery)) {
          return true;
        }

        return false;
      });
    }

    // FILTER BY CENTURY
    if (centuriesFilter.length) {
      filteredPeople = filteredPeople?.filter(person => {
        const century = Math.ceil(person.died / 100);

        return centuriesFilter.includes(String(century));
      });
    }

    // SORT
    if (sortBy) {
      filteredPeople = filteredPeople?.sort((personA, personB) => {
        switch (sortBy) {
          case Categories.NAME:
            return personA.name.localeCompare(personB.name);
          case Categories.SEX:
            return personA.sex.localeCompare(personB.sex);
          case Categories.BORN:
            return personA.born - personB.born;
          case Categories.DIED:
            return personA.died - personB.died;
          default:
            return 0;
        }
      });

      // ORDER
      if (order === Order.DESC) {
        filteredPeople = filteredPeople?.reverse();
      }
    }

    return filteredPeople;
  }, [centuriesFilter, order, people, query, sexFilter, sortBy]);

  return (
    <div className="block">
      {isLoading && <Loader />}

      {showError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {people !== null && !people.length && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}

      {/* <p>There are no people matching the current search criteria</p> */}

      {
        peopleToRender && (
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
                      params={handleSort(Categories.NAME)}
                    >
                      <span className="icon">
                        <i className={cn(
                          'fas',
                          {
                            'fa-sort': sortBy !== Categories.NAME,
                            // eslint-disable-next-line max-len
                            'fa-sort-up': sortBy === Categories.NAME && order === Order.ASC,
                            // eslint-disable-next-line max-len
                            'fa-sort-down': sortBy === Categories.NAME && order === Order.DESC,
                          },
                        )}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Sex
                    <SearchLink params={handleSort(Categories.SEX)}>
                      <span className="icon">
                        <i className={cn(
                          'fas',
                          {
                            'fa-sort': sortBy !== Categories.SEX,
                            // eslint-disable-next-line max-len
                            'fa-sort-up': sortBy === Categories.SEX && order === Order.ASC,
                            // eslint-disable-next-line max-len
                            'fa-sort-down': sortBy === Categories.SEX && order === Order.DESC,
                          },
                        )}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Born
                    <SearchLink params={handleSort(Categories.BORN)}>
                      <span className="icon">
                        <i className={cn(
                          'fas',
                          {
                            'fa-sort': sortBy !== Categories.BORN,
                            // eslint-disable-next-line max-len
                            'fa-sort-up': sortBy === Categories.BORN && order === Order.ASC,
                            // eslint-disable-next-line max-len
                            'fa-sort-down': sortBy === Categories.BORN && order === Order.DESC,
                          },
                        )}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Died
                    <SearchLink params={handleSort(Categories.DIED)}>
                      <span className="icon">
                        <i className={cn(
                          'fas',
                          {
                            'fa-sort': sortBy !== Categories.DIED,
                            // eslint-disable-next-line max-len
                            'fa-sort-up': sortBy === Categories.DIED && order === Order.ASC,
                            // eslint-disable-next-line max-len
                            'fa-sort-down': sortBy === Categories.DIED && order === Order.DESC,
                          },
                        )}
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
              {
                peopleToRender.map(person => (
                  <PersonLink key={person.slug} person={person} />
                ))
              }
            </tbody>
          </table>
        )
      }
    </div>
  );
};
