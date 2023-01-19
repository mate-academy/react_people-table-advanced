import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../../components/PeopleFilters';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [serchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => {
        setTimeout(() => setHasError(false), 3000);
        setHasError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const query = serchParams.get('query') || '';
  const centuries: string[] = serchParams.getAll('centuries') || [];
  const sexValue = serchParams.get('sex') || '';
  const hasTable = people.length > 0;
  const hasPeopleMessage = !hasTable && !isLoading && !hasError;

  const isIncludeName = (name: string | null) => (name
    ? name.toLowerCase().includes(query.toLocaleLowerCase())
    : false);
  const isIncludeCenturies = (year: number) => centuries.includes(`${Math.round(year / 100)}`);

  const visiblePeople = people.filter(person => {
    const hasQuery = !query
      ? true
      : isIncludeName(person.name)
        || isIncludeName(person.fatherName)
        || isIncludeName(person.motherName);

    const hasSexValue = !sexValue
      ? true
      : person.sex === sexValue;

    const hasCenturies = !centuries.length
      ? true
      : isIncludeCenturies(person.born) || isIncludeCenturies(person.died);

    return hasQuery && hasSexValue && hasCenturies;
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {hasTable
              && (
                <PeopleFilters
                  query={query}
                  centuries={centuries}
                  sexValue={sexValue}
                  serchParams={serchParams}
                  setSearchParams={setSearchParams}
                />
              )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (<Loader />)}

              {hasError && (
                <p data-cy="peopleLoadingError">
                  Something went wrong
                </p>
              )}

              {hasPeopleMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {false && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}

              {hasTable && (
                <PeopleTable
                  people={visiblePeople}
                  serchParams={serchParams}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
