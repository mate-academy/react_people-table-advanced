import { useSearchParams } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { getPeople } from '../../api';
import { getFilteredPeople } from '../../utils/getFilteredPeople';
import { Person } from '../../types/Person';
import { ErrorType } from '../../types/ErrorType';
import { FilterType } from '../../types/FilterType';
import { Loader } from '../Loader';
import { PeopleFilters } from '../PeopleFilters';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<ErrorType>(ErrorType.NONE);
  const [isLoaded, setIsLoaded] = useState(false);

  const [searchParams] = useSearchParams();

  const sex = searchParams.get(FilterType.SEX) || null;
  const query = searchParams.get(FilterType.QUERY) || null;
  const centuries = searchParams.getAll(FilterType.CENTURIES) || [];
  const order = searchParams.get(FilterType.ORDER) || null;
  const sort = searchParams.get(FilterType.SORT) || null;

  const visiblePeople: Person[] = useMemo(() => (
    getFilteredPeople(
      people,
      sex,
      query,
      centuries,
      order,
      sort,
    )
  ), [sex, query, centuries, order, sort]);

  const getPeopleFromServer = async () => {
    try {
      setIsLoaded(true);
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch {
      setError(ErrorType.UPLOAD_ERROR);
    } finally {
      setIsLoaded(false);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoaded && error === ErrorType.NONE && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoaded && (
                <Loader />
              )}

              {error !== ErrorType.NONE && (
                <p
                  data-cy="peopleLoadingError"
                  className="has-text-danger"
                >
                  Something went wrong
                </p>
              )}

              {!isLoaded && !visiblePeople.length && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}

              {!isLoaded && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {error === ErrorType.NONE && !!visiblePeople.length && (
                <PeopleTable
                  people={visiblePeople}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
