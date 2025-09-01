import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query');
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  const peopleMap = useMemo(
    () => new Map(people.map(p => [p.name, p])),
    [people],
  );

  const filteredPeople = useMemo(() => {
    let result = people;

    if (query) {
      result = result.filter(p =>
        [p.name, p.fatherName, p.motherName].some(name =>
          name?.includes(query),
        ),
      );
    }

    if (sex) {
      result = result.filter(p => p.sex === sex);
    }

    if (centuries.length > 0) {
      result = result.filter(p => {
        const personBornCentury = Math.ceil(Number(p.born) / 100);

        return centuries.includes(String(personBornCentury));
      });
    }

    return result;
  }, [people, sex, query, centuries]);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const isPeopleAreLoaded = people.length > 0 && !loading && !error;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isPeopleAreLoaded && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people.length === 0 && !loading && !error && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isPeopleAreLoaded && filteredPeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {isPeopleAreLoaded && filteredPeople.length > 0 && (
                <PeopleTable
                  peopleMap={peopleMap}
                  filteredPeople={filteredPeople}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
