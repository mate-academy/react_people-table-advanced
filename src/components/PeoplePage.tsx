import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();
  const query = (searchParams.get('query') || '').toLowerCase();
  const centuries = (searchParams.getAll('centuries') || []).map(
    value => +value,
  );
  const sex = searchParams.get('sex') || '';

  useEffect(() => {
    getPeople()
      .then(data => setPeople(data))
      .catch(() => setHasError(true))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const visiblePeople = people.filter(person => {
    const queryResult = query
      ? person.name.toLowerCase().includes(query) ||
        person.motherName?.toLowerCase().includes(query) ||
        person.fatherName?.toLowerCase().includes(query)
      : true;
    const centuriesResult = centuries.length
      ? centuries.includes(+`${person.born}`.slice(0, 2) + 1)
      : true;
    const sexResult = sex ? person.sex === sex : true;

    return queryResult && centuriesResult && sexResult;
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading ? (
                <Loader />
              ) : hasError ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : !people.length ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
