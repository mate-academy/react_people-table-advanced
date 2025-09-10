import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

type SortableKeys = 'name' | 'sex' | 'born' | 'died';

export const PeoplePage = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const activeCenturies = searchParams.getAll('centuries');

  useEffect(() => {
    const loadPeople = async () => {
      setLoading(true);
      try {
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch {
        setError('Something went wrong!');
      } finally {
        setLoading(false);
      }
    };

    loadPeople();
  }, []);

  const sort = searchParams.get('sort') as SortableKeys | null;
  const order = searchParams.get('order');

  let visiblePeople = [...people];

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (activeCenturies.length > 0) {
    visiblePeople = visiblePeople.filter(person =>
      activeCenturies.includes(String(Math.floor(person.born / 100) + 1)),
    );
  }

  if (query) {
    visiblePeople = visiblePeople.filter(person =>
      [person.name, person.motherName, person.fatherName]
        .filter((name): name is string => Boolean(name))
        .some(name => name.toLowerCase().includes(query.toLowerCase())),
    );
  }

  if (sort) {
    visiblePeople.sort((a, b) => {
      if (a[sort] > b[sort]) {
        return order === 'desc' ? -1 : 1;
      }

      if (a[sort] < b[sort]) {
        return order === 'desc' ? 1 : -1;
      }

      return 0;
    });
  }

  return (
    <section>
      <div className="container">
        <h1 className="title">People Page</h1>
      </div>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && !error && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!error && !loading && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!error && !loading && visiblePeople.length === 0 && (
                <p data-cy="noMatchingPeople">
                  No people match the current filters. Try adjusting your search
                  or filters.
                </p>
              )}
              {!error && !loading && people.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
