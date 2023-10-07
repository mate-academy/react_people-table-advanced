// eslint-disable-next-line
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';

export const PeoplePage: React.FC<{
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  peopleFromServer: Person[] | undefined;
  errorMessage: string | undefined;
}> = ({
  isError, setIsError, isLoading, peopleFromServer, errorMessage,
}) => {
  const { slug = '' } = useParams();
  const [visiblePeople, setVisiblePeople] = useState(peopleFromServer || []);
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSort = searchParams.get('sort');
  const [sortUpdate, SetSortUpdate] = useState(initialSort);
  const [sortBefore, SetSortBefore] = useState(sortUpdate);
  const initialOrder = searchParams.get('order') || null;
  const [orderUpdate, SetOrderUpdate] = useState(initialOrder);
  const sortLane = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  const setSearchWith = (
    firstSearchParams: URLSearchParams,
    params: {
      [key: string]: string[] | string | null;
    },
  ) => {
    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === '') {
        firstSearchParams.delete(key);
      } else if (Array.isArray(value)) {
        firstSearchParams.delete(key);

        value.forEach((part) => {
          firstSearchParams.append(key, part);
        });
      } else {
        firstSearchParams.set(key, value);
      }
    });

    return firstSearchParams.toString();
  };

  const askProperty = (element: string) => {
    if (orderUpdate) {
      return {
        search: setSearchWith(searchParams, {
          sort: null,
          order: null,
        }),
      };
    }

    return {
      search: setSearchWith(searchParams, {
        sort: element,
        order: element === sortUpdate ? 'desc' : null,
      }),
    };
  };

  const doSortingNow = () => {
    if (peopleFromServer) {
      const resetSex = searchParams.get('sex') === null;
      const resetCenturies = searchParams.get('centuries') === null;
      const resetSearch = searchParams.get('search') === null;
      const resetSort = searchParams.get('sort') === null;

      const sortElement = (currentList: Person[]) => {
        if (resetSort) {
          return currentList;
        }

        const partOfSort = (one: number | string, two: number | string) => {
          if (typeof one === 'string' && typeof two === 'string') {
            return one.localeCompare(two);
          }

          if (typeof one === 'number' && typeof two === 'number') {
            return one - two;
          }

          return 0;
        };

        return currentList.sort((first: Person, second: Person) => {
          switch (initialSort) {
            case 'name':
            case 'sex':
            case 'born':
            case 'died':
              if (initialOrder) {
                return partOfSort(second[initialSort], first[initialSort]);
              }

              return partOfSort(first[initialSort], second[initialSort]);

            default:
              return 0;
          }
        });
      };

      let newVisiblePeople = [...peopleFromServer].filter((person) => {
        const statusSex = resetSex
          ? true
          : person.sex === searchParams.get('sex');
        const rawCenturies = Math.ceil(person.born / 100);
        const statusCenturies = resetCenturies
          ? true
          : searchParams.getAll('centuries').includes(`${rawCenturies}`);
        const statusSearch = resetSearch
          ? true
          : person.name
            .toLocaleLowerCase()
            .includes(searchParams.get('search')?.toLocaleLowerCase() || '');

        return statusSex && statusCenturies && statusSearch;
      });

      if (resetSex && resetCenturies && resetSearch) {
        newVisiblePeople = [...peopleFromServer];
      }

      setVisiblePeople(sortElement(newVisiblePeople));
    }
  };

  useEffect(() => {
    doSortingNow();
    SetSortUpdate(initialSort);
    SetSortBefore(sortUpdate);
    SetOrderUpdate(initialOrder);
  }, [searchParams]);

  return isLoading ? (
    <Loader setIsError={setIsError} isError={isError} />
  ) : (
    <div className="container">
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              setSearchWith={setSearchWith}
              setSearchParams={setSearchParams}
              currentSearchParams={searchParams}
            />
          </div>
          <div className="column">
            <div className="box table-container">
              {isError && (
                <p
                  data-cy={
                    peopleFromServer?.length === 0
                      ? 'noPeopleMessage'
                      : 'peopleLoadingError'
                  }
                  className="has-text-danger"
                >
                  {errorMessage}
                </p>
              )}

              {!isError && (
                <table
                  data-cy="peopleTable"
                  className="
                  table is-striped is-hoverable is-narrow is-fullwidth
                  "
                >
                  <thead>
                    <tr>
                      {sortLane.map(
                        (element) => {
                          const typeOfData = element.toLowerCase();

                          if (element === 'Mother' || element === 'Father') {
                            return <th key={element}>{element}</th>;
                          }

                          return (
                            <th key={element}>
                              {element}
                              <Link to={askProperty(typeOfData)}>
                                <span className="icon">
                                  <i
                                    className={classNames(
                                      'fas',
                                      {
                                        'fa-sort':
                                          sortUpdate !== `${typeOfData}`,
                                      },
                                      {
                                        'fa-sort-up':
                                          sortUpdate === `${typeOfData}`
                                          && orderUpdate === null,
                                      },
                                      {
                                        'fa-sort-down':
                                          sortBefore === `${typeOfData}`
                                          && orderUpdate === 'desc',
                                      },
                                    )}
                                  />
                                </span>
                              </Link>
                            </th>
                          );
                        },
                      )}
                    </tr>
                  </thead>

                  <tbody>
                    {visiblePeople
                      && visiblePeople.map((person: Person) => {
                        return (
                          <PeopleTable
                            person={person}
                            key={person.name}
                            selectedTodoId={slug}
                            visiblePeople={visiblePeople}
                          />
                        );
                      })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
