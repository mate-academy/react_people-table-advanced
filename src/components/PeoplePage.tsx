import { getPeople } from '../api';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Outlet, useSearchParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const [allPeople, setAllPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [peopleToDisplay, setPeopleToDisplay] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;
  const sex = searchParams.get('sex') || null;
  const centuries = searchParams.getAll('centuries') || null;
  const query = searchParams.get('query') || null;

  useEffect(() => {
    getPeople()
      .then(data => {
        if (data.length === 0) {
          setIsEmpty(true);
          setHasError(false);
        } else {
          setAllPeople(data);
          setIsEmpty(false);
          setHasError(false);
        }
      })
      .catch(() => {
        setHasError(true);
        setIsEmpty(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const keys = Array.from(searchParams.keys());

    if (
      keys.includes('sort') ||
      keys.includes('sex') ||
      keys.includes('centuries') ||
      keys.includes('query')
    ) {
      let sortedPeople = [...allPeople];

      if (keys.includes('centuries')) {
        sortedPeople =
          centuries.length === 0
            ? allPeople
            : allPeople.filter(person => {
              return centuries.some(century => {
                const start = (+century - 1) * 100 + 1;
                const end = +century * 100;

                return person.born >= start && person.born <= end;
              });
            });
      }

      if (sex === 'f' || sex === 'm') {
        sortedPeople = sortedPeople.filter(person => person.sex === sex);
      }

      if (keys.includes('sort')) {
        if (sort === 'sex') {
          sortedPeople = sortedPeople.sort((a, b) =>
            a.sex.localeCompare(b.sex),
          );
        }

        if (sort === 'name') {
          sortedPeople = sortedPeople.sort((a, b) =>
            a.name.localeCompare(b.name),
          );
        }

        if (sort === 'born') {
          sortedPeople = sortedPeople.sort((a, b) => a.born - b.born);
        }

        if (sort === 'died') {
          sortedPeople = sortedPeople.sort((a, b) => a.died - b.died);
        }

        if (keys.includes('order') && order === 'desc') {
          sortedPeople = sortedPeople.reverse();
        }
      }

      if (query) {
        sortedPeople = sortedPeople.filter(person =>
          person.name.toLowerCase().includes(query?.toLowerCase()),
        );
      }

      setPeopleToDisplay(sortedPeople);
    } else {
      setPeopleToDisplay(allPeople);
    }
  }, [searchParams, allPeople, sort, order, query, sex, centuries]);

  return (
    <>
      <Outlet />
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isLoading ? (
            <div className="column">
              <div className="box table-container">
                <Loader />
              </div>
            </div>
          ) : (
            <>
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>

              <div className="column">
                <div className="box table-container">
                  {hasError && (
                    <p data-cy="peopleLoadingError">Something went wrong</p>
                  )}

                  {isEmpty && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {query && peopleToDisplay.length === 0 ? (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  ) : (
                    <PeopleTable peopleToDisplay={peopleToDisplay} />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
