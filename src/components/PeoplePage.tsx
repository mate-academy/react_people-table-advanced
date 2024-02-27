import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeoplePrepared } from '../utils/getPeoplePrepered';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { SearchParams, getSearchWith } from '../utils/searchHelper';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const selectedSex = searchParams.get('sex') || '';
  const selectedCenturies = searchParams.getAll('centuries') || [];
  const sortField = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';

  const preparedPeople = getPeoplePrepared(
    people,
    query,
    selectedSex,
    selectedCenturies,
    sortField,
    sortOrder,
  );

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: e.target.value });
  };

  const toggleSex = (sex: string | null) => {
    setSearchWith({ sex });
  };

  const toggleCentury = (cent: string | null) => {
    if (!cent) {
      setSearchWith({ centuries: null });

      return;
    }

    const cents = selectedCenturies.includes(cent)
      ? selectedCenturies.filter(century => century !== cent)
      : [...selectedCenturies, cent];

    setSearchWith({ centuries: cents });
  };

  const handleReset = () => {
    setSearchWith({
      sex: null,
      query: null,
      centuries: null,
    });
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                query={query}
                handleInputChange={handleInputChange}
                toggleSex={toggleSex}
                toggleCentury={toggleCentury}
                handleReset={handleReset}
              />
            </div>

            <div className="column">
              <div className="box table-container">
                {loading && <Loader />}

                {error && (
                  <p data-cy="peopleLoadingError">Something went wrong</p>
                )}

                {!loading && !people.length && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                {!loading && !preparedPeople.length && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}

                {!!preparedPeople.length && (
                  <PeopleTable
                    people={people}
                    preparedPeople={preparedPeople}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
