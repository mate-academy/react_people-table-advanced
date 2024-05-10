import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { SortTypes } from '../types/SortTypes';
import { addParents } from '../utils/addParents';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(result => {
        setPeople(result.map(person => addParents(person, result)));
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  const visiblePeople = useMemo(() => {
    let formattedPeople = [...people];

    const sortParam = searchParams.get('sort');

    switch (sortParam) {
      case SortTypes.Name:
      case SortTypes.Sex:
        formattedPeople.sort((a, b) =>
          a[sortParam].localeCompare(b[sortParam]),
        );
        break;

      case SortTypes.Born:
      case SortTypes.Died:
        formattedPeople.sort((a, b) => a[sortParam] - b[sortParam]);
        break;

      default:
        break;
    }

    if (searchParams.get('order') === 'desc') {
      formattedPeople.reverse();
    }

    const sexParam = searchParams.get('sex');

    if (sexParam) {
      formattedPeople = formattedPeople.filter(
        person => person.sex === sexParam,
      );
    }

    if (query) {
      formattedPeople = formattedPeople.filter(
        person =>
          person.name.toLowerCase().includes(query.toLowerCase()) ||
          person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
          person.fatherName?.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (centuries.length > 0) {
      formattedPeople = formattedPeople.filter(person =>
        centuries.includes(String(Math.floor(person.born / 100) + 1)),
      );
    }

    return formattedPeople;
  }, [people, searchParams, query, centuries]);

  const isValidToLoad =
    !isError && !isLoading && people.length > 0 && visiblePeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isError ? (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              ) : (
                <Fragment>
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <Fragment>
                      {!isLoading && people.length === 0 && (
                        <p data-cy="noPeopleMessage">
                          There are no people on the server
                        </p>
                      )}
                      {isValidToLoad ? (
                        <p>
                          There are no people matching the current search
                          criteria
                        </p>
                      ) : (
                        <PeopleTable people={visiblePeople} />
                      )}
                    </Fragment>
                  )}
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
