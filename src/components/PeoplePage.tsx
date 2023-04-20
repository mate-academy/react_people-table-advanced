import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters/PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { filterPeople } from './FilteredPeople';
import { FilterType } from '../types/FilterType';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();

  const sex = searchParams.get(FilterType.SEX) || null;
  const query = searchParams.get(FilterType.QUERY) || null;
  const centuries = searchParams.getAll(FilterType.CENTURIES) || [];
  const order = searchParams.get(FilterType.ORDER) || null;
  const sort = searchParams.get(FilterType.SORT) || null;

  const visiblePeople: Person[] = useMemo(() => (
    filterPeople({
      people,
      sex,
      query,
      centuries,
      order,
      sort,
    })
  ), [people, sex, query, centuries, order, sort]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsInitialized(false);
      setError(false);

      try {
        const peopleFromServer = await getPeople();

        const peopleWithParents = peopleFromServer.map((person) => {
          const mother = peopleFromServer
            .find(mom => mom.name === person.motherName);
          const father = peopleFromServer
            .find(fath => fath.name === person.fatherName);

          return (
            {
              ...person,
              mother,
              father,
            }
          );
        });

        setPeople(peopleWithParents);
        setIsInitialized(true);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const noPeopleOnServer = isInitialized && !visiblePeople.length;
  const noMatchingPeopleOnServer = !isLoading && !visiblePeople.length;

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

              {isLoading && (
                <Loader />
              )}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {noPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {noMatchingPeopleOnServer && (
                <p>There are no people matching the current search criteria</p>
              )}

              {visiblePeople.length > 0
                && <PeopleTable people={visiblePeople} />}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
