import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleFilters } from '../PeopleFilters/PeopleFilters';
import { Loader } from '../Loader/Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasErrorMessage, setHasErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setHasErrorMessage('Something went wrong'))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredPeople
    = (!sex && !query && !centuries.length)
      ? people : (() => {
        let result = [...people];

        if (sex) {
          result = result.filter(person => person.sex === sex);
        }

        if (query) {
          result = result.filter(person => (
            [person.name, person.motherName, person.fatherName].some(name => {
              return name && name.toLowerCase().includes(query.toLowerCase());
            })));
        }

        if (centuries.length) {
          result = result.filter(person => {
            return centuries.includes(
              (Math.floor(person.born / 100) + 1).toString(),
            );
          });
        }

        return result;
      })();

  const showPeopleTable = !isLoading && !hasErrorMessage
  && !!people.length && !!filteredPeople.length;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !hasErrorMessage && !!people.length && (
              <PeopleFilters
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                sex={sex}
                query={query}
                centuries={centuries}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasErrorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {hasErrorMessage}
                </p>
              )}

              {!people.length && !isLoading && !hasErrorMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!filteredPeople.length && !isLoading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {showPeopleTable && (
                <PeopleTable people={people} filteredPeople={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
