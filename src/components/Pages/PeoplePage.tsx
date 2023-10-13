import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Person } from '../../types';
import { getPeople } from '../../api';
import {
  getFilteredPeople,
  getPreparedPeople,
} from '../../utils/functions';
import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorHappened, setIsErrorHappened] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  const { search } = useLocation();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((peopleFromServer) => {
        setPeople(getPreparedPeople(peopleFromServer));
      })
      .catch(() => setIsErrorHappened(true))
      .finally(() => setIsLoading(false));
  }, []);

  const params = new URLSearchParams(search);

  const sex = params.get('sex') || '';
  const centuries = params.getAll('centuries') || [];
  const query = params.get('query') || '';
  const sort = params.get('sort') || '';
  const order = params.get('order') || '';

  const preparedPeople = getFilteredPeople(
    people,
    sex,
    centuries,
    query,
    sort,
    order,
  );

  const isPeopleNotExist = !isLoading
    && !isErrorHappened
    && !preparedPeople.length;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!!people.length && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isErrorHappened && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isPeopleNotExist && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!!preparedPeople.length && (
                <PeopleTable
                  people={preparedPeople}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
