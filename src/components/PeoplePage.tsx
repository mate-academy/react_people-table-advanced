import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const peopleData = await getPeople();
        setPeople(peopleData);
      } catch {
        setErr('Failed to fetch data :(');
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  const getCentury = (year: number) => {
    return Math.ceil(year / 100);
  };

  const filteredPeople = people.filter((person) => {
    let match = true;

    if (sex && person.sex !== sex) {
      match = false;
    }

    if (centuries.length > 0) {
      const personCentury = getCentury(person.born);
      if (!centuries.includes(String(personCentury))) {
        match = false;
      }
    }

    if (query && !person.name.toLowerCase().includes(query.toLowerCase())) {
      match = false;
    }

    return match;
  });

  if (err) {
    return <p data-cy="noPeopleMessage">Something went wrong</p>;
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!loading && people.length === 0 && (
                <p data-cy="noPeopleMessage">There are no people on the server</p>
              )}

              {!loading && people.length > 0 && <PeopleTable people={filteredPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
