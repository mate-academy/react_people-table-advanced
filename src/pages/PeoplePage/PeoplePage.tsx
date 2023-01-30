import React, {
  useState,
  useEffect,
  useMemo,
  memo,
} from 'react';
import { useSearchParams } from 'react-router-dom';

import { PeopleFilters } from '../../components/PeopleFilters/PeopleFilters';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types/Person';

export const PeoplePage: React.FC = memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query')?.toLowerCase();

  const loadPeople = async () => {
    try {
      setIsLoading(true);

      const loadedPeople = await getPeople();

      setPeople(loadedPeople);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
      setIsLoadingFinish(true);
    }
  };

  useEffect(() => {
    setIsError(false);
    setIsLoadingFinish(false);
    loadPeople();
  }, []);

  const visiblePeople = useMemo(() => (
    people.filter(person => {
      const isSexMatch = sex
        ? person.sex === sex
        : true;

      const isQueryMatch = query
        ? person.name.toLowerCase().includes(query)
          || person.motherName?.toLowerCase().includes(query)
          || person.fatherName?.toLowerCase().includes(query)
        : true;

      const isCenturyMatch = centuries.length
        ? centuries.includes(String(Math.floor(person.born / 100) + 1))
        : true;

      return isSexMatch && isQueryMatch && isCenturyMatch;
    })), [people, sex, query, centuries]);

  const isNoPeopleOnServer = useMemo(() => (
    isLoadingFinish && !isError && !people.length
  ), [isLoadingFinish, isError, people]);

  const isNoPeopleMatchSearchParams = useMemo(() => (
    visiblePeople.length === 0 && isLoadingFinish && !isError
  ), [visiblePeople, isLoadingFinish, isError]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && isLoadingFinish && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {isNoPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isNoPeopleMatchSearchParams && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}

              {visiblePeople.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
