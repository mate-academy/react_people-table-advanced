import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { filterPeople } from '../utils/filteredPeople';
import { PeopleTable } from '../components/PeopleTable';
import { ParamsSearch } from '../types/ParamsSearch';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll(ParamsSearch.CENTENARY) || [];
  const query = searchParams.get(ParamsSearch.QUERY) || '';
  const sex = searchParams.get(ParamsSearch.SEX) || '';
  const sort = searchParams.get(ParamsSearch.SORT) || '';
  const order = searchParams.get(ParamsSearch.ORDER) || '';

  const preperedPeople = useMemo(() => filterPeople(people, {
    sex, query, order, centuries, sort,
  }), [people, sex, query, order, centuries, sort]);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            {loading && (<Loader />)}

            {errorMessage && !loading && (
              <p data-cy="peopleLoadingError">
                Something went wrong
              </p>
            )}

            {!errorMessage && !loading && people.length === 0 && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}

            {!loading && !errorMessage && preperedPeople.length < 1 && (
              <p>
                There are no people matching the current search criteria
              </p>
            )}

            <div className="column">
              <div className="box table-container">

                {!loading && !errorMessage && preperedPeople.length > 0 && (
                  <PeopleTable
                    people={preperedPeople}
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
