import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';
import { preparePeople } from '../services/preparePeople';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { Loader } from './Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    getPeople()
      .then((peopleFromServer) => {
        setLoading(true);
        setPeople(peopleFromServer);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const preparedPeople = useMemo(() => {
    return preparePeople(people, {
      query,
      centuries,
      sex,
      sort,
      order,
    });
  }, [people, query, centuries, sex, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && !isError && (
              <PeopleFilters />
            )}

          </div>

          <div className="column">
            <div className="box table-container">
              {loading ? (
                <Loader />
              ) : (
                <>
                  {isError && (
                    <p data-cy="peopleLoadingError">Something went wrong</p>
                  )}

                  {!loading && preparedPeople.length === 0 && (
                    <p data-cy="noPeopleMessage">
                      There are no people matching the current search criteria
                    </p>
                  )}

                  {preparedPeople.length !== 0 && people.length !== 0 && (
                    <PeopleTable
                      people={preparedPeople}
                    />
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
