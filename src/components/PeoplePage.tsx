import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { useEffect, useMemo, useState } from 'react';
import { PeopleTable } from './PeopleTable';
import React from 'react';
import { PeopleFilters } from './Filters/PeopleFilters';
import { useSearchParams } from 'react-router-dom';
import { filteredPeople } from './Filters/fillteredPeople';

const mapPeople = (people: Person[]) => {
  return people.map(person => {
    const mother = people.find(p => p.name === person.motherName) || undefined;
    const father = people.find(p => p.name === person.fatherName) || undefined;

    return {
      ...person,
      mother,
      father,
    };
  });
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;
  const query = searchParams.get('query') || '';
  const filterBySex = searchParams.get('sex');
  const filterByCenturies = searchParams.getAll('centuries');

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then((peopleFromServer: Person[]) => {
        const mappedPeople = mapPeople(peopleFromServer);

        setPeople(mappedPeople);
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  const visiblePeople = useMemo(() => {
    return filteredPeople(people, {
      query,
      filterBySex,
      filterByCenturies,
      sort,
      order,
    });
  }, [query, filterBySex, filterByCenturies, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && !error &&  (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && !loading && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {!people.length && !loading && !error && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && !error && visiblePeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loading && !error && people.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
