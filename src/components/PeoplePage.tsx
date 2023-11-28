import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { getVisiblePeople } from '../utils/GetVisiblePeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const { personId } = useParams();
  const [errorMessage, setErrorMessage] = useState(false);
  const [isPeopleLoading, setIsPeopleLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const visiblePeople = getVisiblePeople(people, {
    sex, centuries, query, sort, order,
  });

  const loadPeople = async () => {
    setIsPeopleLoading(true);

    try {
      const peopleData = await getPeople();

      setPeople(peopleData);
    } catch {
      setErrorMessage(true);
    } finally {
      setIsPeopleLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people && !isPeopleLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {errorMessage && !isPeopleLoading && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {people.length === 0 && !isPeopleLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {visiblePeople.length === 0 && !isPeopleLoading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isPeopleLoading && visiblePeople.length > 0 && (
                <PeopleTable
                  visiblePeople={visiblePeople}
                  people={people}
                  personId={personId}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
