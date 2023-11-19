import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || 'All';
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((peopleFromServer) => setPeople(peopleFromServer))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const getFilteredPeople = () => {
    let filteredPeople = [...people];

    if (centuries.length) {
      filteredPeople = filteredPeople.filter(
        person => centuries.includes(
          Math.ceil(person.born / 100).toString(),
        ),
      );
    }

    if (sex !== 'All') {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (query) {
      const validQuery = query.toLocaleLowerCase().trim();

      filteredPeople = filteredPeople.filter(
        (person) => person.name.toLocaleLowerCase().includes(validQuery)
      || person.fatherName?.toLocaleLowerCase().includes(validQuery)
      || person.motherName?.toLocaleLowerCase().includes(validQuery),
      );
    }

    if (sort) {
      switch (sort) {
        case 'name':
        case 'sex':
          filteredPeople = filteredPeople.sort((person1, person2) => {
            return (order === 'desc')
              ? person2[sort].localeCompare(person1[sort])
              : person1[sort].localeCompare(person2[sort]);
          });
          break;
        case 'born':
        case 'died':
          filteredPeople = filteredPeople.sort((person1, person2) => {
            return (order === 'desc')
              ? person2[sort] - person1[sort]
              : person1[sort] - person2[sort];
          });
          break;
        default:
      }
    }

    return filteredPeople;
  };

  const visiblePeople = getFilteredPeople();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}
              {!isLoading && !isError && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!visiblePeople.length && !isLoading && (
                <p>There are no people matching the current search criteria</p>
              )}
              {!isLoading && !isError && !!visiblePeople.length && (
                <PeopleTable
                  people={people}
                  visiblePeople={visiblePeople}
                />
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
