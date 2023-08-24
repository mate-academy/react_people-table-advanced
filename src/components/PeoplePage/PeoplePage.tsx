import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PesonRow } from '../PersonRow/PesonRow';
import { PeopleFilters } from '../PeopleFilters/PeopleFilters';
import { getPreparedPeople } from '../../utils/getProparedPeople';
import { Sex } from '../../types/Sex';
import { SearchLink } from '../SearchLink/SearchLink';

enum ErrorMessages {
  NONE = '',
  DATA = 'Something went wrong',
  NO_PEOPLE = 'There are no people on the server',
}

const sortOptions = ['Name', 'Sex', 'Born', 'Died'];

export const PeoplePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { selectedPerson } = useParams<string>();

  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(ErrorMessages.NONE);

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (event.target.value.trim() === '') {
      params.delete('query');
    } else {
      params.set('query', event.target.value);
    }

    setSearchParams(params);
  };

  const toggleSortOption = (sortField: string) => {
    const firstClick = sort !== sortField;
    const secondClick = (sort === sortField) && !order;

    if (firstClick) {
      return {
        sort: sortField,
        order: null,
      };
    }

    if (secondClick) {
      return {
        sort,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
  };

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then((peopleFromServer) => {
        if (peopleFromServer.length === 0) {
          setErrorMessage(ErrorMessages.NO_PEOPLE);

          return;
        }

        const peopleWithParents = getPreparedPeople(peopleFromServer);

        setPeople(peopleWithParents);
      })
      .catch(() => setErrorMessage(ErrorMessages.DATA))
      .finally(() => setLoading(false));
  }, []);

  const filteredPeople = useMemo(() => {
    let peopleToFilter = [...people];

    if (query) {
      const lowerQuery = query.toLowerCase();

      peopleToFilter = peopleToFilter.filter(person => {
        return person.name.toLowerCase().includes(lowerQuery)
          || person.motherName?.toLowerCase().includes(lowerQuery)
          || person.fatherName?.toLowerCase().includes(lowerQuery);
      });
    }

    if (sex) {
      peopleToFilter = peopleToFilter.filter(person => {
        switch (sex) {
          case Sex.FEMALE:
            return person.sex === Sex.FEMALE;
          case Sex.MALE:
            return person.sex === Sex.MALE;
          default:
            return true;
        }
      });
    }

    if (sort) {
      peopleToFilter = peopleToFilter.sort((person1, person2) => {
        switch (sort) {
          case 'name':
          case 'sex':
            return person1[sort].localeCompare(person2[sort]);

          case 'born':
          case 'died':
            return person1[sort] - person2[sort];

          default:
            return 0;
        }
      });
    }

    if (order === 'desc') {
      peopleToFilter = peopleToFilter.reverse();
    }

    if (centuries.length > 0) {
      peopleToFilter = peopleToFilter.filter(person => {
        return centuries.includes(
          Math.ceil(person.born / 100).toString(),
        );
      });
    }

    return peopleToFilter;
  }, [people, query, sex, centuries, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {
            !loading && !errorMessage && (
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters
                  query={query}
                  centuries={centuries}
                  sex={sex}
                  handleQueryChange={handleQueryChange}
                />
              </div>
            )
          }

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {
                errorMessage && (
                  <>
                    {errorMessage === ErrorMessages.DATA && (
                      <p
                        data-cy="peopleLoadingError"
                        className="has-text-danger"
                      >
                        {ErrorMessages.DATA}
                      </p>
                    )}
                    {errorMessage === ErrorMessages.NO_PEOPLE && (
                      <p data-cy="noPeopleMessage">
                        {ErrorMessages.NO_PEOPLE}
                      </p>
                    )}
                  </>
                )
              }

              {
                !loading && !errorMessage && (
                  <table
                    data-cy="peopleTable"
                    className="
                      table
                      is-striped
                      is-hoverable
                      is-narrow
                      is-fullwidth
                    "
                  >
                    <thead>
                      <tr>
                        {sortOptions.map(option => {
                          return (
                            <th>
                              <span className="is-flex is-flex-wrap-nowrap">
                                {option}
                                <SearchLink
                                  params={
                                    toggleSortOption(option.toLowerCase())
                                  }
                                >
                                  <span className="icon">
                                    <i className={classNames('fas', {
                                      'fa-sort': sort !== option.toLowerCase(),
                                      'fa-sort-up':
                                        !order && sort === option.toLowerCase(),
                                      'fa-sort-down':
                                        order && sort === option.toLowerCase(),
                                    })}
                                    />
                                  </span>
                                </SearchLink>
                              </span>
                            </th>
                          );
                        })}

                        <th>Mother</th>
                        <th>Father</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredPeople.map((person) => (
                        <PesonRow
                          key={person.slug}
                          person={person}
                          selectedPerson={selectedPerson}
                        />
                      ))}
                    </tbody>
                  </table>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
