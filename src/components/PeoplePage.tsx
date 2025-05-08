import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useState, useEffect } from 'react';
import { wait, getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setHasError(false);
        await wait(2000);
        const peopleServer = await getPeople();

        setPeople(peopleServer);
      } catch (error) {
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCentury = (year: number): number => {
    return Math.floor((year - 1) / 100) + 1;
  };

  const sex = searchParams.get('sex') || '';
  const century = searchParams.get('centuries') || '';
  const name = searchParams.get('name') || '';

  const filteredPeople = people.filter(person => {
    const matchesSex = !sex || person.sex === sex;
    const matchesName =
      !name || person.name.toLowerCase().includes(name.toLowerCase());
    const matchesCentury =
      !century || getCentury(person.born) === Number(century);

    return matchesSex && matchesName && matchesCentury;
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}
              {!loading && hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}
              {!loading && people.length === 0 && !hasError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!loading && filteredPeople.length === 0 && !hasError && (
                <p>There are no people matching the current search criteria</p>
              )}
              {!loading && filteredPeople.length > 0 && !hasError && (
                <PeopleTable peopleResults={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
