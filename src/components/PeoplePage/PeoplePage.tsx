import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { filterPeople } from '../../utils/filterPeople';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const order = searchParams.get('order');
  const sort = searchParams.get('sort');

  const [
    peopleFromServer,
    setPeopleFromServer,
  ] = useState<Person[] | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(setPeopleFromServer)
      .catch(() => setIsError(true));
  }, []);

  const filteredPeople = filterPeople({
    peopleFromServer, query, sex, centuries, sort, order,
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">

          {peopleFromServer && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {(!peopleFromServer && !isError) && (
                <Loader />
              )}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {(peopleFromServer && !peopleFromServer?.length) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!!filteredPeople?.length && (
                <PeopleTable
                  people={filteredPeople}
                  peopleFromServer={peopleFromServer}
                />
              )}

              {(filteredPeople && !filteredPeople.length) && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
