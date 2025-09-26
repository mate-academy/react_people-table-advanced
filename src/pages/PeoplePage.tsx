import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const PeoplePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = (searchParams.get('query') || '').toLowerCase();
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  useEffect(() => {
    getPeople()
      .then(data => {
        setPeople(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  type SearchParamsType = {
    query?: string | null;
    sex?: string | null;
    centuries?: string[] | null;
  };

  function setSearchWith(params: SearchParamsType) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: event.target.value || null });
  }

  const filteredPeople = people.filter(person => {
    const century = Math.ceil(+person.born / 100).toString();

    const matchesQuery = [
      person.name,
      person.motherName,
      person.fatherName,
    ].some(f => f && f.toLowerCase().includes(query));

    const matchesSex = sex === '' || sex === person.sex;

    const matchesCentury =
      centuries.length === 0 || centuries.includes(century);

    return matchesCentury && matchesSex && matchesQuery;
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && !error && (
              <PeopleFilters
                query={query}
                sex={sex}
                centuries={centuries}
                handleQueryChange={handleQueryChange}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {people.length === 0 && !loading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && filteredPeople.length === 0 && people.length > 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loading && !error && <PeopleTable people={filteredPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
