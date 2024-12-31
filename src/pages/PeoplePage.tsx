import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { getPeople } from '../api';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
import { peopleFilter } from '../utils/peopleFilter';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [peopleLoadingError, setPeopleLoadingError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setPeopleLoadingError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = peopleFilter(
    people,
    sex,
    query,
    centuries,
    sort,
    order,
  );

  const showFilters = !!people.length && !isLoading;
  const isEmptyMessageVisible = !people.length && !isLoading;
  const isPeopleLoad = peopleLoadingError && !isLoading;
  const isEmpty = !filteredPeople.length && !isLoading;
  const hasPeople = !!filteredPeople.length && !isLoading;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {showFilters && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isPeopleLoad && (
                <p data-cy="peopleLoadingError">{peopleLoadingError}</p>
              )}

              {isEmptyMessageVisible && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isEmpty && (
                <p>There are no people matching the current search criteria</p>
              )}

              {hasPeople && <PeopleTable people={filteredPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};