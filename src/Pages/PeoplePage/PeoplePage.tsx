import { useEffect, useMemo, useState } from 'react';
import { Loader } from '../../components/Loader';
import { PeopleFilters } from '../../components/PeopleFilters';
import { PeopleTable } from '../../components/PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const peopleToShow = useMemo(() => {
    const sexParam = searchParams.get('sex');
    const queryParam = searchParams.get('query')?.toLowerCase();
    const centuriesParam = searchParams.getAll('centuries');
    const sortParam = searchParams.get('sort');
    const orderParam = searchParams.get('order');

    const visiblePeople = people
      .filter(person => sexParam === null || person.sex === sexParam)
      .filter(
        person =>
          queryParam == null ||
          person.name.toLowerCase().includes(queryParam) ||
          person.motherName?.toLowerCase().includes(queryParam) ||
          person.fatherName?.toLowerCase().includes(queryParam),
      )
      .filter(
        person =>
          centuriesParam.length === 0 ||
          centuriesParam.includes(Math.ceil(person.born / 100).toString()),
      );

    if (sortParam) {
      visiblePeople.sort((personA, personB) => {
        const valueA = personA[sortParam as keyof typeof personA];
        const valueB = personB[sortParam as keyof typeof personB];

        let result = 0;

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          result = valueA.localeCompare(valueB);
        }

        if (typeof valueA === 'number' && typeof valueB === 'number') {
          result = valueA - valueB;
        }

        if (orderParam === 'desc') {
          result = result * -1;
        }

        return result;
      });
    }

    return visiblePeople;
  }, [searchParams, people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !hasError && people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length > 0 && peopleToShow.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !hasError && peopleToShow.length > 0 && (
                <PeopleTable people={peopleToShow} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
