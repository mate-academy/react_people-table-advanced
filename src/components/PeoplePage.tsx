import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { useParams } from 'react-router-dom';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const { slug } = useParams<{ slug?: string }>();

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
              ) : (
                <PeopleTable people={people} selectedSlug={slug ?? ''} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
