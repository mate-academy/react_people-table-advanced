import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getFilteredPeople } from '../utils/getFilteredPeople';
import { Order } from '../types/Order';
import { SortType } from '../types/SortType';
import { SexFilter } from '../types/SexFilter';
import { Person } from '../types';
import { getPeople } from '../api';
import { getSearchWith } from '../utils/searchHelper';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') as SexFilter;
  const sort = searchParams.get('sort') as SortType;
  const order = searchParams.get('order') as Order;
  const centuries = searchParams.getAll('centuries') || [];

  const visiblePeople = useMemo(() => {
    return getFilteredPeople(people, {
      query,
      sex,
      sort,
      order,
      centuries,
    });
  }, [people, searchParams]);

  const fetchPeople = async () => {
    setIsLoading(true);
    setError(false);

    try {
      const peopleFormServer = await getPeople();
      const childrenWithParents = peopleFormServer.map(person => ({
        ...person,
        father: peopleFormServer
          .find(father => father.name === person.fatherName),
        mother: peopleFormServer
          .find(mother => mother.name === person.motherName),
      }));

      setPeople(childrenWithParents);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const hadndleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value }),
    );
  };

  const handleSexFilter = (current: string) => {
    setSearchParams(getSearchWith(searchParams, { current }));
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && (
              <PeopleFilters
                query={query}
                centuries={centuries}
                sex={sex}
                handleQuery={hadndleQuery}
                handleSexFilter={handleSexFilter}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading
                ? <Loader />
                : (
                  <>
                    {error && (
                      <p
                        data-cy="peopleLoadingError"
                        className="has-text-danger"
                      >
                        Something went wrong
                      </p>
                    )}

                    {!people.length && !error && (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
                    )}

                    {!!visiblePeople.length && !error ? (
                      <PeopleTable people={visiblePeople} />
                    ) : (
                      <p>
                        There are no people matching the current search criteria
                      </p>
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
