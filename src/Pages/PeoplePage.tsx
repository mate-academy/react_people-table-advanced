import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { preparePeople } from '../utils/preparePeople';
import { FilterParams, Sex } from '../types/FilterParams';
import { SortParams } from '../types/SortParams';
import { SortField } from '../types/SortField';
import { SortOrder } from '../types/SortOrder';
import { Person } from '../types/Person';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const [searchParams] = useSearchParams();

  const filterParams: FilterParams = {
    query: searchParams.get('query') || '',
    centuries: searchParams.getAll('centuries') || [],
    sex: searchParams.get('sex') as Sex,
  };

  const sortParams: SortParams = {
    sortField: searchParams.get('sort') as SortField,
    sortOrder: searchParams.get('order') as SortOrder,
  };

  const preparedPeople = preparePeople(people, filterParams, sortParams);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading
                ? (<Loader />)
                : (
                  <>
                    {!!errorMessage && (
                      <p
                        data-cy="peopleLoadingError"
                        className="has-text-danger"
                      >
                        {errorMessage}
                      </p>
                    )}

                    {!people.length
                      && !errorMessage
                      && (
                        <p data-cy="noPeopleMessage">
                          There are no people on the server
                        </p>
                      )}

                    {!preparedPeople.length && !errorMessage && (
                      <p data-cy="noPeopleMessage">
                        There are no people matching the current search criteria
                      </p>
                    )}

                    {!!preparedPeople.length && (
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
