import { useEffect, useState } from 'react';

import { Person } from '../types';
import { getPeople } from '../api';
import { useParams, useSearchParams } from 'react-router-dom';
import { getFilteredPeople } from '../utils/getFilteredPeople';
import { getPeopleWithChildren } from '../utils/getPeopleWithChildren';

import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { ErrorMessage } from '../components/ErrorMessage';
import { PeopleFilters } from '../components/PeopleFilters';
import { NoPeopleMessage } from '../components/NoPeopleMessage';
import { NoMatchingMessage } from '../components/NoMatchingMessage';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const { slug } = useParams();

  const selectedPersonSlug = slug ? slug : '';

  const canShowNoPeopleMessage = people.length === 0 && !loading;

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  const sex = searchParams.get('sex') || '';

  const centuries = searchParams.getAll('centuries') || [];

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);

    if (event.target.value === '') {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const toggleCenturies = (century: string) => {
    const params = new URLSearchParams(searchParams);

    let newCenturies = centuries;

    if (centuries.includes(century)) {
      newCenturies = centuries.filter(newCentury => newCentury !== century);

      params.delete('centuries');

      newCenturies.forEach(newCentury =>
        params.append('centuries', newCentury),
      );
    } else {
      params.append('centuries', century);
    }

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

  const handleResetParam = (param: string) => {
    const params = new URLSearchParams(searchParams);

    params.delete(param);
    setSearchParams(params);
  };

  const filteredPeople = getFilteredPeople(query, sex, centuries, people);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(true))
      .finally(() => {
        setPeople(current => getPeopleWithChildren(current));
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
                onResetParam={handleResetParam}
                toggleCenturies={toggleCenturies}
                onQueryChange={handleQueryChange}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {errorMessage && <ErrorMessage />}

              {canShowNoPeopleMessage && <NoPeopleMessage />}

              {!loading && !filteredPeople.length && <NoMatchingMessage />}

              {!loading && !!filteredPeople.length && (
                <PeopleTable
                  people={filteredPeople}
                  selectedPersonSlug={selectedPersonSlug}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
