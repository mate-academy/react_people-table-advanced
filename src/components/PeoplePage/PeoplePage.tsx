import { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types/Person';
import { PeopleTable } from '../PeopleTable';
import { Loader } from '../Loader';
import { PeopleFilters } from '../PeopleFilters';
import { useSearchParams } from 'react-router-dom';
import { Params } from '../../types/Params';
import { getSearchWith } from '../../utils/getSearchWith';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const sex = useMemo(() => {
    return searchParams.get('sex') || '';
  }, [searchParams]);

  const query = useMemo(() => {
    return searchParams.get('query') || '';
  }, [searchParams]);

  const centuries = useMemo(() => {
    return searchParams.getAll('centuries') || [];
  }, [searchParams]);

  function setSearchWith(paramsToUpdate: Params) {
    const search = getSearchWith(paramsToUpdate, searchParams);

    setSearchParams(search);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: event.target.value || null });
  }

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const peopleWithParents = useMemo(() => {
    function getFather(fatherName: string | null) {
      return people.find(person => fatherName === person.name) || null;
    }

    function getMother(motherName: string | null) {
      return people.find(person => motherName === person.name) || null;
    }

    return people.map(person => ({
      ...person,
      father: getFather(person.fatherName),
      mother: getMother(person.motherName),
    }));
  }, [people]);

  const filteredPeople = useMemo(() => {
    let internalPeople = peopleWithParents;

    if (sex) {
      internalPeople = peopleWithParents.filter(person => {
        switch (sex) {
          case 'm':
            return person.sex === 'm';

          case 'f':
            return person.sex === 'f';

          default:
            return true;
        }
      });
    }

    if (query) {
      internalPeople = internalPeople.filter(person => {
        const normalizedQuery = query.toLowerCase();

        return (
          person.name.toLowerCase().includes(normalizedQuery) ||
          person.fatherName?.toLowerCase().includes(normalizedQuery) ||
          person.motherName?.toLowerCase().includes(normalizedQuery)
        );
      });
    }

    if (centuries.length) {
      internalPeople = internalPeople.filter(person => {
        const personCentury = Math.ceil(person.born / 100);

        return centuries.some(century => +century === personCentury);
      });
    }

    return internalPeople;
  }, [peopleWithParents, sex, query, centuries]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && (
              <PeopleFilters
                onChange={handleQueryChange}
                query={query}
                searchParams={searchParams}
                sex={sex}
                centuries={centuries}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {!isLoading &&
                !errorMessage &&
                (!people.length ? (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                ) : (
                  <PeopleTable
                    people={filteredPeople}
                    searchParams={searchParams}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
