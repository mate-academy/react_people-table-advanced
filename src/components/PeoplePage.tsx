/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types/Person';

type OptionTypes = {
  sex: string,
  centuries: string[],
  query: string,
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const peopleFilter = (data: Person[]) => {
    const options:OptionTypes = {
      sex: searchParams.get('sex') ?? '',
      centuries: searchParams.getAll('centuries'),
      query: searchParams.get('query') ?? '',
    };

    const result = data.filter(item => {
      if (item.sex !== options.sex && options.sex) {
        return false;
      }

      if (
        !item.name.toLocaleLowerCase()
          .includes(options.query.toLocaleLowerCase())
          && options.query) {
        return false;
      }

      if (options.centuries.length > 0) {
        let status = false;

        options.centuries.forEach(centuries => {
          if (Math.ceil(item.born / 100) === +centuries) {
            status = true;
          }
        });

        if (!status) {
          return false;
        }

        return item;
      }

      return item;
    });

    return result;
  };

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((data) => setPeople(data))
      .catch(error => {
        setIsError(true);
        throw error;
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = peopleFilter(people);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!!filteredPeople.length && (
              <PeopleFilters
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {!people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!filteredPeople.length && isLoading && <Loader />}
              {!filteredPeople.length && !isLoading && (
                <p>There are no people matching the current search criteria</p>
              )}
              {!!filteredPeople.length && (
                <PeopleTable
                  people={filteredPeople}
                  searchParams={searchParams}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
