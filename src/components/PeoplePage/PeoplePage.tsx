import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleFilters } from '../PeopleFilters/PeopleFilters';
import { Loader } from '../Loader/Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredPeople
    = (!sex && !query && !centuries.length)
      ? people : (() => {
        let result = [...people];

        if (sex !== '') {
          result = result.filter(person => person.sex === sex);
        }

        if (query !== '') {
          result = result.filter(person => (
            [person.name, person.motherName, person.fatherName].some(name => {
              return name && name.toLowerCase().includes(query.toLowerCase());
            })));
        }

        if (centuries.length !== 0) {
          result = result.filter(person => {
            return centuries.includes(
              (Math.floor(person.born / 100) + 1).toString(),
            );
          });
        }

        return result;
      })();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && !errorMessage && !!people.length && (
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
              {loading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {!people.length && !loading && !errorMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!filteredPeople.length && !loading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loading && !errorMessage && !!people.length
              && !!filteredPeople.length && (
                <PeopleTable people={people} filteredPeople={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
