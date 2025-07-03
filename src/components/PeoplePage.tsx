/* eslint-disable */
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { filter } from 'cypress/types/bluebird';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);

    const fetchPeople = async () => {
      try {
        const response = await fetch(
          'https://mate-academy.github.io/react_people-table/api/people.json',
        );

        const data = await response.json();

        setPeople(data);
      } catch {
        setError('Something went wrong');
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 400);
      }
    };

    fetchPeople();
  }, []);

  const query = searchParams.get('query')?.toLowerCase() || '';
  const selectedSex = searchParams.get('sex');
  const selectedCenturies = searchParams.getAll('centuries');

  const filteredPeople = people.filter(person => {
    const nameMatch = person.name.toLowerCase().includes(query);
    const sexMatch = !selectedSex || person.sex.toLowerCase().includes(selectedSex);
    const centuryMatch =
      selectedCenturies.length === 0 ||
      selectedCenturies.includes(String(person.century));

    return nameMatch && sexMatch && centuryMatch;
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              isLoading={isLoading}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {error && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      {error}
                    </p>
                  )}
                  {!error && people.length === 0 && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}
                  {!error && people.length > 0 && filteredPeople.length > 0 && (
                    <PeopleTable people={filteredPeople} searchParams={searchParams} />
                  )}
                  {!error &&
                    people.length > 0 &&
                    filteredPeople.length === 0 && (
                    <p>
                        There are no people matching the current search criteria
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
