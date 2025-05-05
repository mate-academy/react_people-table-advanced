import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name')?.toLowerCase() || '';
  const visiblePeople = name
    ? people?.filter(person => person.name.toLowerCase().includes(name))
    : people;

  useEffect(() => {
    getPeople()
      .then(data => setPeople(data))
      .catch(err => setError(err));
  }, []);

  return (
    <>
      <h1 className="title" data-cy="peoplePage">
        People Page
      </h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {error ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : people === null ? (
                <Loader />
              ) : people.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (visiblePeople ?? []).length === 0 ? (
                <p data-cy="noMatchingPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              ) : (
                <PeopleTable
                  people={visiblePeople ?? []}
                  selectedSlug={slug ?? ''}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
