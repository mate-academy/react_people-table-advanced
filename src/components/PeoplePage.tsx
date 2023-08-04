import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { preparePeople } from '../utils/people';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  const preparedPeople = React.useMemo(() => {
    return preparePeople(people, {
      query,
      sex,
      centuries,
      sort,
      order,
    });
  }, [people, query, sex, centuries, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && !errorMessage && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading ? (
                <Loader />
              ) : (
                <>
                  {errorMessage && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      {errorMessage}
                    </p>
                  )}

                  {!errorMessage && people.length === 0 && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {!errorMessage && preparedPeople.length === 0 && (
                    <p data-cy="noPeopleMessage">
                      There are no people matching the current search criteria
                    </p>
                  )}

                  {!errorMessage && preparedPeople.length > 0 && (
                    <PeopleTable people={preparedPeople} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
