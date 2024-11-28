import { useEffect, useState } from 'react';

import { Person } from '../types';
import { getPeople } from '../api';
import { useParams, useSearchParams } from 'react-router-dom';
import { getFilteredPeople } from '../utils/getFilteredPeople';
import { personsWithParents } from '../utils/PeopleData';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from './PeopleFilters';
export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { slug } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  const sex = searchParams.get('sex') || '';

  const centuries = searchParams.getAll('centuries') || [];

  const chooseCenturies = (century: string) => {
    const params = new URLSearchParams(searchParams);

    if (centuries.includes(century)) {
      params.delete('centuries', century);
    } else {
      params.append('centuries', century);
    }

    setSearchParams(params);
  };

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);

    if (event.target.value === '') {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const handleReset = (param: string) => {
    const params = new URLSearchParams(searchParams);

    params.delete(param);
    setSearchParams(params);
  };

  const handleSexChange = (sexFilter: string) => {
    const params = new URLSearchParams(searchParams);

    if (sexFilter === '') {
      params.delete('sex');
    } else {
      params.set('sex', sexFilter);
    }

    setSearchParams(params);
  };

  const filteredPeople = getFilteredPeople(query, sex, centuries, people);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => {
        setPeople(current => personsWithParents(current));
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && (
              <PeopleFilters
                sex={sex}
                query={query}
                centuries={centuries}
                onSexChange={handleSexChange}
                onReset={handleReset}
                setCenturies={chooseCenturies}
                onQueryChange={handleQuery}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people.length === 0 && !loading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && !filteredPeople.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loading && !!filteredPeople.length && (
                <PeopleTable
                  people={filteredPeople}
                  selectedPersonSlug={slug ? slug : ''}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
