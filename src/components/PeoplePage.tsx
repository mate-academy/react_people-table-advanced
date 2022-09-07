import {
  FC, useEffect, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { filtredPeople } from '../utils/filterHelper';

export const PeoplePage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoad, setIsLoad] = useState(false);
  const [errorLoad, setErroreLoad] = useState(false);
  const [isActiveSort, setIsActiveSort] = useState(false);

  const query = searchParams.get('query') || null;
  const sexFilter = searchParams.get('sexFilter') || null;
  const centuries = searchParams.getAll('centuries') || [];

  const order = searchParams.get('order') || null;
  const sort = searchParams.get('sort') || null;

  useEffect(() => {
    setIsLoad(true);
    getPeople()
      .then((res) => {
        setPeople(res);
      })
      .catch(() => setErroreLoad(true))
      .finally(() => setIsLoad(false));
  }, []);

  const isQueryInclude = (queryInclude: string) => {
    return people.some(person => person.name
      .toLowerCase().includes(queryInclude.toLowerCase()));
  };

  const activateSort = (param: boolean) => setIsActiveSort(param);

  const updateSearch = (
    params: { [key: string]: string[] | string | null },
  ) => {
    Object.entries(params).forEach(([key, value]) => {
      if (!value) {
        searchParams.delete(key);
      } else if (Array.isArray(value)) {
        searchParams.delete(key);

        value.forEach(part => {
          searchParams.append(key, part);
        });
      } else {
        searchParams.set(key, value);
      }
    });
    setSearchParams(searchParams);
  };

  const preparedPeople = filtredPeople(
    people, query, sexFilter, centuries, order, sort,
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {(people.length > 0)
            && (
              <PeopleFilters updateSearch={updateSearch} />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoad && <Loader />}

              {errorLoad && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people && !isLoad && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {(!isLoad) && (
                <PeopleTable
                  people={preparedPeople}
                  isActiveSort={isActiveSort}
                  updateSearch={updateSearch}
                  activateSort={activateSort}
                />
              )}

              { query
              && !isQueryInclude(query)
              && people.length > 0
               && (
                 <p>
                   There are no people matching the current search criteria
                 </p>
               )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
