import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { useLocation, useParams } from 'react-router-dom';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const currentPerson = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { search } = useLocation();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredPeople = useMemo(() => {
    const searchParams = new URLSearchParams(search);
    const sexFilter = searchParams.get('sex');
    const queryFilter = searchParams.get('query');
    const centuriesFilter = searchParams.getAll('centuries');

    return people.filter(person => {
      if (sexFilter && person.sex !== sexFilter) {
        return false;
      }

      if (
        queryFilter &&
        !person.name.toLowerCase().includes(queryFilter.toLowerCase()) &&
        !person.motherName?.toLowerCase().includes(queryFilter.toLowerCase()) &&
        !person.fatherName?.toLowerCase().includes(queryFilter.toLowerCase())
      ) {
        return false;
      }

      if (centuriesFilter && centuriesFilter.length > 0) {
        const birthCentury = Math.ceil(person.born / 100).toString(); // Століття як рядок

        if (!centuriesFilter.includes(birthCentury)) {
          return false;
        } // Якщо століття не в масиві, виключаємо
      }

      return true;
    });
  }, [search, people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people.length === 0 && !isError && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {filteredPeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {filteredPeople.length > 0 && (
                <PeopleTable
                  people={people}
                  filteredPeople={filteredPeople}
                  currentPerson={currentPerson.personSlug}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
