import { useEffect, useMemo, useState } from 'react';

import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { TablePeople } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { useSearchParams } from 'react-router-dom';
import { toFlilterPeople } from './toFilterPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [newError, setNewError] = useState(false);
  const [load, setLoad] = useState(true);
  const [searchParams] = useSearchParams();

  const order = searchParams.get('order') || '';
  const sort = searchParams.get('sort') || '';
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  useEffect(() => {
    getPeople()
      .then((peopleFromServer) => {
        setPeople(peopleFromServer);
      })
      .catch(() => {
        setNewError(true);
      })
      .finally(() => {
        setLoad(false);
      });
  }, []);

  const filterPeople = useMemo(() => (
    toFlilterPeople(
      people,
      order,
      sort,
      query,
      sex,
      centuries,
    )
  ), [
    people,
    order,
    sort,
    query,
    sex,
    centuries,
  ]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!load && !newError && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {load ? (
                <Loader />
              ) : (
                <>
                  {newError && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      Something went wrong
                    </p>
                  )}

                  {filterPeople.length === 0 && !load && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {filterPeople.length > 0 && people.length > 0 && (
                    <TablePeople people={filterPeople} />
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
