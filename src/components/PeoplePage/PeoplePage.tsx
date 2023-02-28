/* eslint-disable no-console */
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { getParents } from '../../utils/getParents';
import { Loader } from '../Loader';
import { PeopleFilters } from '../PeopleFilters';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = React.memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { slug = '' } = useParams();

  const fetchPeople = useCallback(async () => {
    try {
      const peopleFromServer = await getPeople();

      const preparedPeople = peopleFromServer.map(person => ({
        ...person,
        mother: getParents(peopleFromServer, person.motherName),
        father: getParents(peopleFromServer, person.fatherName),
      }));

      setPeople(preparedPeople);
    } catch {
      console.warn('An occur error while loading people');
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPeople();
  }, []);

  const isPeopleVisible = !isLoading && Boolean(people.length);
  const hasErrorMessage = !people.length && !isLoading && !hasError;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isPeopleVisible && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isPeopleVisible && (
                <PeopleTable people={people} selectedSlug={slug} />
              )}

              {hasErrorMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
