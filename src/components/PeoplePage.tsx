import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { getVisiblePeople } from '../utils/getVisiblePeople';
import { Person } from '../types/Person';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query')?.trim().toLocaleLowerCase();
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => setIsLoad(false));
  }, []);

  const visiblePeople = getVisiblePeople(
    people,
    sex,
    query,
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
            {people && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoad && <Loader />}
              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}
              {people && <PeopleTable people={visiblePeople} />}
              {!isLoad && !error && !people && (
                <p data-cy="noPeopleMessage">no people</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
