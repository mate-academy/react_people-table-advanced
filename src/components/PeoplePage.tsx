import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '.././types';
import { getPeople } from '.././api';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    setError(false);
    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const query = searchParams.get('query')?.trim().toLowerCase() || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order') === 'desc' ? -1 : 1;

  const visiblePeople = people.filter(person => {
    const matchesQuery =
      person.name.toLowerCase().includes(query) ||
      (person.motherName?.toLowerCase().includes(query) ?? false) ||
      (person.fatherName?.toLowerCase().includes(query) ?? false);
    const matchesSex = !sex || person.sex === sex;
    const matchesCentury =
      centuries.length === 0 ||
      centuries.includes(String(Math.ceil(person.born / 100)));

    return matchesQuery && matchesSex && matchesCentury;
  });

  if (sort === 'name' || sort === 'sex') {
    visiblePeople.sort((a, b) => a[sort].localeCompare(b[sort]) * order);
  } else if (sort === 'born' || sort === 'died') {
    visiblePeople.sort((a, b) => (a[sort] - b[sort]) * order);
  }

  return (
    <>
      <h1 className="title">People Page</h1>

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
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!loading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && !error && people.length > 0 && (
                <PeopleTable people={visiblePeople} allPeople={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
