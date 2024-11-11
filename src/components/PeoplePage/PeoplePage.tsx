import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { useLocation } from 'react-router-dom';
import { prepearePeopleList } from '../../utils/prepearePeopleList';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { search } = useLocation();

  useEffect(() => {
    setErrorMessage('');

    getPeople()
      .then(setPeople)
      .catch(loadingError => {
        setErrorMessage('Something went wrong');

        throw loadingError;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const visiblePeopleList: Person[] = prepearePeopleList(people, search);
  const hasError = !isLoading && errorMessage.length > 0;
  const isNotPeopleForShow =
    !isLoading && people.length > 0 && visiblePeopleList.length === 0;
  const isPeopleTableShow = !isLoading && visiblePeopleList.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {!isLoading && !people && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isNotPeopleForShow && (
                <p>There are no people matching the current search criteria</p>
              )}

              {isPeopleTableShow && (
                <PeopleTable peopleList={visiblePeopleList} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
