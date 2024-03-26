import { PeopleFilters } from '../PeopleFilters/PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { useSearchParams } from 'react-router-dom';
import { getPreparedPeople } from '../../utils/getPreparedPeople';
import { SortType } from '../../types/SortType';

export const PeoplePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState('');

  const currentSex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const currentCentury = searchParams.getAll('centuries') || [];
  const sortType = searchParams.get('sort')?.toLowerCase() || '';
  const sortDirection = searchParams.get('order') || '';

  const preparedPeople = getPreparedPeople(
    people,
    sortType as SortType,
    !!sortDirection,
  );

  useEffect(() => {
    const fetchPeople = async () => {
      setError('');

      try {
        const data = await getPeople();

        setPeople(data);
      } catch {
        setError('something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  let filteredPeople = preparedPeople.filter(({ sex }) =>
    currentSex ? sex === currentSex : true,
  );

  if (query) {
    filteredPeople = filteredPeople.filter(({ name }) =>
      name.toLocaleLowerCase().includes(query.toLocaleLowerCase().trim()),
    );
  }

  if (!!currentCentury.length) {
    filteredPeople = filteredPeople.filter(({ born }) =>
      currentCentury.includes(String(Math.ceil(born / 100))),
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters
                  currentSex={currentSex}
                  currentCentury={currentCentury}
                  query={query}
                />
              </div>

              <div className="column">
                {isError && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    {isError}
                  </p>
                )}

                {!people?.length && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                {!!people.length && (
                  <PeopleTable
                    filteredPeople={filteredPeople}
                    people={people}
                    sortType={sortType}
                    sortDirection={sortDirection}
                  />
                )}

                {!filteredPeople.length && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
