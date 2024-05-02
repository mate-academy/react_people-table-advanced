import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { getPeopleWithParents } from '../helpers';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
import { getFilteredPeople } from '../utils/getFilteredPeople';
import { getSortedPeople } from '../utils/getSortedPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasLoadingError, setHasLoadingError] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');
  const sortBy = searchParams.get('sort');
  const order = searchParams.get('order');
  //   // eslint-disable-next-line no-console
  //   console.log('started filtering');

  //   let filteredPersons = [...people];
  //   const centuries = searchParams.getAll('centuries');

  //   if (nameFilter) {
  //     filteredPersons = filteredPersons.filter((currentPerson: Person) => {
  //       // Does their name match the query
  //       return (
  //         currentPerson.name.toLowerCase().includes(nameFilter.toLowerCase()) ||
  //         currentPerson.motherName
  //           ?.toLowerCase()
  //           .includes(nameFilter.toLowerCase()) ||
  //         currentPerson.fatherName
  //           ?.toLowerCase()
  //           .includes(nameFilter.toLowerCase())
  //       );
  //     });
  //   }

  //   if (centuries.length > 0 && centuries.length < 5) {
  //     filteredPersons = filteredPersons.filter((currentPerson: Person) => {
  //       const centuryBorn = Math.ceil(currentPerson.born / 100).toString();

  //       return centuries.includes(centuryBorn);
  //     });
  //   }

  //   return filteredPersons;
  // }, [nameFilter, people, searchParams]);

  const filteredPeople = getFilteredPeople(people, query, centuries, sex);

  const sortedPeople = getSortedPeople(filteredPeople, sortBy, order);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((peopleFromApi: Person[]) =>
        setPeople(getPeopleWithParents(peopleFromApi)),
      )
      .catch(() => setHasLoadingError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasLoadingError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!people.length && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!people.length && !!searchParams.keys.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!!people.length && <PeopleTable people={sortedPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
