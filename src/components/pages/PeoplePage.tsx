import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { ErrorComponent } from '../ErrorComponent';
import { EmptyComponent } from '../EmptyComponent';
import { PeopleComponent } from '../PeopleComponent';
import { getPeople } from '../../api';
import { getPreparedPeopleAPI } from '../../utils/PeopleHelpers';
import { EmptySearch } from '../EmptySearch/EmptySearch';
import { getPreparedPeople } from '../../utils/getPreparedPeople';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((response) => {
        setPeople(getPreparedPeopleAPI(response));
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const isDisplayErrorMessage = errorMessage && !isLoading;
  const isNoPeopleOnServer = !people.length && !isLoading && !errorMessage;
  const isPeopleOnServer = !!people.length && !errorMessage;

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const preparedPeople = getPreparedPeople(
    people,
    query,
    sex,
    centuries,
    sort,
    order,
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isDisplayErrorMessage && (
                <ErrorComponent errorMessage={errorMessage} />
              )}

              {isNoPeopleOnServer && <EmptyComponent />}

              {!preparedPeople.length && !isLoading && <EmptySearch />}

              {isPeopleOnServer && !!preparedPeople.length
                && <PeopleComponent people={preparedPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
