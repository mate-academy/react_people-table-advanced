import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters/PeopleFilters';
import { filteredPeople } from '../utils/filteredPeople';
import { sortPeople } from '../utils/sortPeople';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sortType = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getAllPeople = async () => {
    setLoading(true);
    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch (error) {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const filterPeople = () => {
    return filteredPeople(people, sex, query, centuries);
  };

  const visiblePeople = () => {
    return sortPeople(filterPeople(), sortType, order);
  };

  useEffect(() => {
    getAllPeople();
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
                sex={sex}
                centuries={centuries}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !isError && people.length === 0 && (
                <p
                  data-cy="noPeopleMessage"
                >
                  There are no people on the server
                </p>
              )}

              {!isLoading && !isError && people.length > 0 && (
                <PeopleTable
                  people={visiblePeople()}
                  sortType={sortType}
                  order={order}
                />
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
