import { useEffect, useState } from 'react';

import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { getPeople } from '../api';
import { useParams } from 'react-router-dom';
import { Loader } from './Loader';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const { slug } = useParams<{ slug?: string }>();

  const noMatches =
    !isLoading &&
    !isErrorMessage &&
    people.length > 0 &&
    filteredPeople.length === 0;

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(data => {
        setPeople(data);
        setFilteredPeople(data);
      })
      .catch(() => setIsErrorMessage(true))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (slug) {
      setSelectedSlug(slug);
    }
  }, [slug]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters people={people} setPeople={setFilteredPeople} />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isErrorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!people.length && !isLoading && !isErrorMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {noMatches && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !isErrorMessage && filteredPeople.length > 0 && (
                <PeopleTable
                  people={filteredPeople}
                  selectedSlug={selectedSlug}
                  onSelectPerson={setSelectedSlug}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
