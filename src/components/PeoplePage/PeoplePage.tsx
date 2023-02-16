import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { SortPeople } from '../../utils/sortPeople';
import { Loader } from '../Loader';
import { PeopleFilters } from '../PeopleFilter/PeopleFilters';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadPeople = async () => {
    setIsLoading(true);

    try {
      const loadedPeople = await getPeople();

      setPeople(loadedPeople);
      setIsLoaded(true);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const [searchParams] = useSearchParams();
  const query = (searchParams.get('query') || '').toLowerCase().trim();
  const centuries = searchParams.getAll('centuries');

  const sortField = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const sex = searchParams.get('sex');

  const filterByQuery = (
    person: Person,
  ) => person.name.toLowerCase().includes(query)
  || person.motherName?.toLowerCase().includes(query)
    || person.fatherName?.toLowerCase().includes(query);

  const filterByCentury = (person: Person) => (
    centuries.length
      ? centuries.includes(String(Math.ceil(person.died / 100)))
      : true);

  const filterBySex = (person: Person) => (
    sex
      ? person.sex === sex
      : true
  );

  const visiblePeople = people.filter(
    person => filterByQuery(person)
      && filterByCentury(person)
      && filterBySex(person),
  );

  SortPeople(visiblePeople, sortField, order);

  const isSearchNotFound = isLoaded && visiblePeople.length === 0 && !isLoading;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isLoaded && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

          )}
          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {people.length === 0 && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isSearchNotFound && (
                <p>There are no people matching the current search criteria</p>
              )}

              {isLoaded && visiblePeople.length > 0 && (
                <PeopleTable
                  people={visiblePeople}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
