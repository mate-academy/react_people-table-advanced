import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PeopleFilters } from '../../components/PeopleFilters';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { preparePeople } from '../../utils/preparePeople';

export const PeoplePage: React.FC = () => {
  const [searchParam] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const options = {
    sex: searchParam.get('sex'),
    query: searchParam.get('query'),
    centuries: searchParam.getAll('centuries'),
    sort: searchParam.get('sort'),
    order: searchParam.get('order'),
  };

  useEffect(() => {
    setErrorMessage('');
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

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
              {isLoading ? (
                <Loader />
              ) : errorMessage ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              ) : !people.length ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <PeopleTable people={preparePeople(people, options)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
