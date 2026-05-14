/* eslint-disable @typescript-eslint/indent */
import { useState, useEffect } from 'react';
import { PeopleTable } from '../../components/PeopleTable';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleFilters } from '../PeopleFilters/PeopleFilters';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query');
  const filteredPeople = people.filter(person => {
    const centry = Math.ceil(person.born / 100);
    const sexMatch = sex === null || person.sex === sex;
    const centuryMatch =
      centuries.includes(String(centry)) || centuries.length === 0;
    const queryMatch =
      query === null ||
      person.name.toLowerCase().includes(query.toLowerCase()) ||
      person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
      person.fatherName?.toLowerCase().includes(query.toLowerCase());

    return sexMatch && centuryMatch && queryMatch;
  });

  useEffect(() => {
    const loadingPeople = async () => {
      setIsLoading(true);
      try {
        const data = await getPeople();

        setPeople(data);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadingPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading && <Loader />}
      {hasError && <p data-cy="peopleLoadingError">Something went wrong</p>}
      {!isLoading && !hasError && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}
      {!isLoading && !hasError && people.length > 0 && (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
            <div className="column">
              {filteredPeople.length === 0 ? (
                <p>There are no people matching the current search criteria</p>
              ) : (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
