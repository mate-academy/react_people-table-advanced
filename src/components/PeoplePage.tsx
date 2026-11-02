import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    getPeople()
      .then(data => {
        const peopleWithParents = data.map(person => ({
          ...person,
          mother: data.find(p => p.name === person.motherName),
          father: data.find(p => p.name === person.fatherName),
        }));

        setPeople(peopleWithParents);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const visiblePeople = people.filter(person => {
    const matchesQuery =
      person.name.toLowerCase().includes(query) ||
      person.motherName?.toLowerCase().includes(query) ||
      person.fatherName?.toLowerCase().includes(query);
    const matchesSex = !sex || person.sex === sex;
    const matchesCentury =
      centuries.length === 0 ||
      centuries.includes(String(Math.ceil(person.born / 100)));

    return matchesQuery && matchesSex && matchesCentury;
  });

  const sortedPeople = [...visiblePeople].sort((a, b) => {
    switch (sort) {
      case 'name':
      case 'sex':
        return a[sort].localeCompare(b[sort]);
      case 'born':
      case 'died':
        return a[sort] - b[sort];
      default:
        return 0;
    }
  });

  if (order === 'desc') {
    sortedPeople.reverse();
  }

  const noPeopleOnServer = !loading && !error && people.length === 0;
  const noPeopleMatchingFilters =
    !loading && !error && people.length > 0 && visiblePeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && !error && people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {noPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {noPeopleMatchingFilters && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loading && !error && people.length > 0 && (
                <PeopleTable people={sortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
