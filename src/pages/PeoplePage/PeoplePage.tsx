/* eslint-disable */
import { PeopleFilters } from '../../components/PeopleFilters';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { useEffect, useState, useMemo } from 'react';
import { getPeople } from '../../services/api';
import { Person } from '../../types';
import { FilterType } from '../../types/FilterType';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  const sexFilter = searchParams.get('sex') || FilterType.ALL;
  const nameFilter = searchParams.get('name') || '';

  const filteredPeople = useMemo(() => {
    const centuryFilter =
      searchParams.get('centuries')?.split(',').map(Number) || [];

    return people.filter(person => {
      if (sexFilter !== FilterType.ALL) {
        if (
          !person.sex
            .toLowerCase()
            .includes(sexFilter.toLowerCase().substring(0, 1))
        ) {
          return false;
        }
      }

      if (
        nameFilter &&
        !person.name.toLowerCase().includes(nameFilter.toLowerCase())
      ) {
        return false;
      }

      if (centuryFilter.length > 0) {
        const personCentury = Math.floor(person.born / 100) + 1;

        if (!centuryFilter.includes(personCentury)) {
          return false;
        }
      }

      return true;
    });
  }, [people, sexFilter, nameFilter, searchParams]);

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');

    getPeople()
      .then(response => {
        const processedPeople = response.map(person => ({
          ...person,
          sex: String(person.sex || '').toLowerCase(),
        }));

        setPeople(processedPeople);
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
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

              {!isLoading && errorMessage && (
                <p data-cy="peopleLoadingError">{errorMessage}</p>
              )}

              {!isLoading && !errorMessage && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading &&
                !errorMessage &&
                people.length > 0 &&
                filteredPeople.length === 0 && (
                  <p data-cy="noMatchingPeopleMessage">
                    There are no people matching the current search criteria
                  </p>
                )}

              {!isLoading && !errorMessage && filteredPeople.length > 0 && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
