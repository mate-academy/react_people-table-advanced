/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]); // Инициализация пустым массивом
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [peopleLoadingError, setPeopleLoadingError] = useState<boolean>(false);
  const [selectedPersonSlug, setSelectedPersonSlug] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/people')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load people');
        }

        return response.json();
      })
      .then(data => setPeople(data))
      .catch(() => setPeopleLoadingError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSelectPerson = (slug: string) => {
    setSelectedPersonSlug(slug);
  };

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
              {isLoading && <Loader />}

              {peopleLoadingError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length > 0 && (
                <PeopleTable
                  people={people}
                  selectedPersonSlug={selectedPersonSlug}
                  onSelectPerson={handleSelectPerson}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
