import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { personSlug } = useParams();

  useEffect(() => {
    getPeople()
      .then(res => {
        setPeople(res);
        setIsLoading(false);
        setIsLoaded(true);
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isLoading
            && <Loader />}
          {hasError
            && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

          {people.length === 0 && !hasError && isLoaded
            && (
              <p data-cy="noPeopleMessage" className="has-text-danger">
                no people
              </p>
            )}

          {isLoaded
            && (
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>
            )}

          {isLoaded && people.length > 0
            && (
              <PeopleTable people={people} selectedSlug={personSlug} />
            )}
        </div>
      </div>
    </>
  );
};
