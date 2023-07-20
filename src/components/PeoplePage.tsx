import {
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { PersonLink } from './PersonLink';
import { getVisiblePeople } from '../utils/getVisiblePeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    const handleAddPeople = async () => {
      try {
        const res = await getPeople();

        setPeople(res);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    handleAddPeople();
  }, []);

  const findParent = useCallback((parentName: string) => {
    const parent = people.find(person => person.name === parentName);

    if (!parent) {
      return parentName;
    }

    return (
      <PersonLink person={parent} />
    );
  }, [people]);

  const visiblePeople = useMemo(() => {
    const params = {
      sex,
      query,
      centuries,
      sort,
      order,
    };

    return getVisiblePeople(people, params);
  }, [sex, people, centuries, query, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {isError && (
                    <p data-cy="peopleLoadingError">Something went wrong</p>
                  )}

                  {!people.length && !isError && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {!visiblePeople.length && (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )}
                  {visiblePeople.length > 0 && (
                    <PeopleTable
                      people={visiblePeople}
                      findParent={findParent}
                    />
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
