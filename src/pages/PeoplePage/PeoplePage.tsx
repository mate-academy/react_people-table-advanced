import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getPeople } from '../../api';
import { getPersonWithPerents } from '../../helpers/getPersonWithPerents';
import { Person } from '../../types';
import { Loader } from '../../components/Loader';
import { ErrorMessages } from '../../types/ErrorMessages';
import { PeopleTable } from '../../components/PeopleTable';
import { PeopleFilters } from '../../components/PeopleFilters';
import { getPreparedPersons } from '../../helpers/getPreparedPersons';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();

  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const sortField = searchParams.get('sort') as keyof Person || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => (
        setPeople(getPersonWithPerents(peopleFromServer))
      ))
      .catch(() => setIsError(true))
      .finally(() => setIsLoadingData(false));
  }, []);

  const visiblePersons = getPreparedPersons(
    people,
    centuries,
    query,
    sex,
    sortField,
    order,
  );

  return (
    <>
      <h1 className="title">
        People Page
      </h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isError ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {ErrorMessages.NOT_LOADED_PEOPLE}
                </p>
              ) : (
                <>
                  {isLoadingData && (
                    <Loader />
                  )}

                  {!isLoadingData && (
                    <PeopleTable people={visiblePersons} />
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
