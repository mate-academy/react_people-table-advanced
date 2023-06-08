import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { sortedPeoples, filterPeoples } from '../utils';

export const PeoplePage = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || null;
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') === 'desc' || null;

  const findPerson = (personName: string | null, array: Person[]) => {
    return array.find((people: Person) => people.name === personName);
  };

  const loadPeoples = async () => {
    try {
      setIsLoading(true);
      const peopleData = await getPeople();

      setPeoples(peopleData.map(people => ({
        ...people,
        mother: findPerson(people.motherName, peopleData),
        father: findPerson(people.fatherName, peopleData),
        motherName: people.motherName || '-',
        fatherName: people.fatherName || '-',
      })));
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPeoples = useMemo(() => {
    return filterPeoples(peoples, sex, centuries, query);
  }, [peoples, query, sex, centuries]);

  const sortPeoples = useMemo(() => {
    return sortedPeoples(filteredPeoples, sort, order);
  }, [sort, filteredPeoples, order]);

  useEffect(() => {
    loadPeoples();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {peoples.length > 0 && (
              <PeopleFilters
                query={query}
                centuries={centuries}
                sex={sex}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {(!isLoading && peoples.length === 0 && !hasError) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {(!hasError && sortPeoples.length === 0 && !isLoading) && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}

              {!hasError && sortPeoples.length > 0 && (
                <PeopleTable
                  peoples={sortPeoples}
                  sort={sort}
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
