/* eslint-disable @typescript-eslint/indent */
import { Loader } from './Loader/Loader';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const [error, setError] = useState('');
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const selectedCenturies = searchParams.getAll('centuries') || [];
  const selectedSex = searchParams.get('sex') || '';
  const name = searchParams.get('query') || '';

  const filteredHumans = people.filter(person =>
    person.name.toLowerCase().includes(name.toLowerCase()),
  );

  const handleNameFilterChange = () => {
    return filteredHumans;
  };

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(e => {
        setError(`Something went wrong: ${e.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredPeople = filteredHumans.filter(person => {
    const isMatchingCenturies =
      selectedCenturies.length === 0 ||
      selectedCenturies.includes(Math.ceil(person.born / 100).toString());

    const isMatchingSex = selectedSex === '' || person.sex === selectedSex;

    return isMatchingCenturies && isMatchingSex;
  });

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && (
              <PeopleFilters onNameChange={handleNameFilterChange} />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {!filteredPeople.length && !isLoading && !error && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!!filteredPeople.length && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
