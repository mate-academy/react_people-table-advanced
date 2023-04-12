import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

import { Person } from '../types';
import { getPeople } from '../api';
import { PeoplePageContainer } from './PeoplePageContainer';

export const PeoplePage = () => {
  const [allPeople, setAllPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [wasRequest, setWasRequest] = useState(false);

  const loadPeople = async () => {
    try {
      const people = await getPeople();

      setAllPeople(people);
    } catch {
      setError('Unable to upload people');
    } finally {
      setWasRequest(true);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  if (!allPeople.length && wasRequest && !error) {
    return (
      <PeoplePageContainer>
        <p
          data-cy="noPeopleMessage"
          className="has-text-primary is-size-3"
        >
          There are no people on the server
        </p>
      </PeoplePageContainer>
    );
  }

  if (error) {
    return (
      <PeoplePageContainer>
        <p
          data-cy="peopleLoadingError"
          className="has-text-danger is-size-3"
        >
          {error}
        </p>
      </PeoplePageContainer>
    );
  }

  return (
    <PeoplePageContainer>
      {!allPeople.length ? (
        <Loader />
      ) : (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            <div className="column">
              <div className="box table-container">
                <PeopleTable allPeople={allPeople} />
              </div>
            </div>
          </div>
        </div>
      )}
    </PeoplePageContainer>
  );
};
