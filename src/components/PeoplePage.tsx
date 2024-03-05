import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { SearchParams, getSearchWith } from '../utils/searchHelper';
import { SortField, getPeoplePrepeared } from '../utils/getPeoplePrepeared';
import { getPeople } from '../api';
import { ErrorMessage } from './ErrorMessage';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const selectedSex = searchParams.get('sex') || '';
  const selectedCenturies = searchParams.getAll('centuries') || [];
  const sortFieldParam = searchParams.get('sort') || '';
  const sortField = sortFieldParam as SortField | '';
  const sortOrder = searchParams.get('order') || '';

  const prepearedPeople = getPeoplePrepeared({
    people,
    query,
    selectedSex,
    centuries: selectedCenturies,
    sortField: sortField !== '' ? sortField : null,
    sortOrder,
  });

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

  const toggleCentuary = (cent: string | null) => {
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
                toggleCentuary={toggleCentuary}
                toggleSex={toggleSex}
                handleReset={handleReset}
              />
            </div>

            <div className="column">
              <div className="box table-container">
                {loading && <Loader />}

                {error && (
                  <ErrorMessage
                    data-cy="peopleLoadingError"
                    message="Something went wrong"
                  />
                )}

                {!loading && !people.length && (
                  <ErrorMessage
                    data-cy="noPeopleMessage"
                    message="There are no people on the server"
                  />
                )}
                {!loading && !prepearedPeople && (
                  // eslint-disable-next-line max-len
                  <ErrorMessage message="There are no people matching the current search criteria" />
                )}

                {!!prepearedPeople.length && (
                  <PeopleTable
                    people={people}
                    prepearedPeople={prepearedPeople}
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
