import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { getVisiblePeople } from '../utils/getVisiblePeople';
import { SearchParams } from '../utils/enums';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const { slug } = useParams();
  const sex = searchParams.get(SearchParams.sex) || '';
  const query = searchParams.get(SearchParams.query) || '';
  const centuries = searchParams.getAll(SearchParams.centuries) || [];
  const sort = searchParams.get(SearchParams.sort) || '';
  const order = searchParams.get(SearchParams.order) || '';
  const visiblePeople = useMemo(
    () => getVisiblePeople(people, {
      sex,
      query,
      centuries,
      sort,
      order,
    }),
    [people, query, sex, centuries, sort, order],
  );

  const getPeopleFromServer = useCallback(() => {
    getPeople()
      .then((result) => setPeople(result))
      .catch(() => setIsError(true))
      .finally(() => setIsLoaded(true));
  }, []);

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  if (isLoaded && isError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (isLoaded && !people.length && !isError) {
    return (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        {isLoaded ? (
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            <div className="column">
              <div className="box table-container">
                <PeopleTable people={visiblePeople} selectedPerson={slug} />
              </div>
            </div>
          </div>
        ) : <Loader />}
      </div>
    </>
  );
};
