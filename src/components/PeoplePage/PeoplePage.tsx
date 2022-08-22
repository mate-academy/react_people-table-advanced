import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import debounce from 'lodash/debounce';

import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable';
import { NewPerson } from '../NewPerson';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const appliedQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(appliedQuery);

  const applyQuery = useCallback(
    debounce((newQuery: string) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      setSearchParams(searchParams);
    }, 500),
    [],
  );

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
    applyQuery(e.currentTarget.value);
  };

  const visiblePeople = people.filter(person => {
    const lowerQuery = appliedQuery.toLowerCase();

    return person.name.toLowerCase().includes(lowerQuery)
      || person.fatherName?.toLowerCase().includes(lowerQuery)
      || person.motherName?.toLowerCase().includes(lowerQuery);
  });

  useEffect(() => {
    getPeople()
      .then(res => {
        setPeople(res.map(person1 => {
          const result = person1;

          const mother = res.find(
            persone2 => persone2.name === person1.motherName,
          );

          const father = res.find(
            persone2 => persone2.name === person1.fatherName,
          );

          if (mother) {
            result.mother = mother;
          }

          if (father) {
            result.father = father;
          }

          return result;
        }));
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading && <Loader />}

      {error && (
        <p
          data-cy="peopleLoadingError"
          className="has-text-danger"
        >
          Something went wrong
        </p>
      )}

      {!isLoading && !error && people.length === 0 && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}

      {!isLoading && !error && people.length !== 0 && (
        <>
          <div className="block">
            <div className="box">
              <NewPerson people={people} setPeople={setPeople} />
            </div>
          </div>

          <div className="block">
            <div className="box table-container">
              <div className="field">
                <div className="control">
                  <input
                    type="text"
                    data-cy="filterInput"
                    className="input"
                    placeholder="Query"
                    value={query}
                    onChange={handleQueryChange}
                  />
                </div>
              </div>

              <PeopleTable people={visiblePeople} />
            </div>
          </div>
        </>
      )}
    </>
  );
};
