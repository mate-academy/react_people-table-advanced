import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await getPeople();

        setPeople(response);
        setIsLoading(false);
      } catch {
        setError(true);
        setIsLoading(false);
      }
    })();
  }, []);

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');

  const filteredPeople = people
    .filter(person => {
      if (sex) {
        return person.sex === sex;
      }

      return true;
    })
    .filter(person => {
      if (query) {
        return (
          person.name.toLowerCase().includes(query.toLowerCase()) ||
          person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
          person.fatherName?.toLowerCase().includes(query.toLowerCase())
        );
      }

      return true;
    })
    .filter(person => {
      if (centuries.length > 0) {
        const century = Math.ceil(person.born / 100);

        return centuries.includes(String(century));
      }

      return true;
    });

  const shouldShowLengthError = people.length === 0 && !error;
  const shouldRenderPeople = !isLoading && !error && people.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {error && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      Something went wrong
                    </p>
                  )}

                  {shouldShowLengthError && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}
                  {shouldRenderPeople && (
                    <PeopleTable people={filteredPeople} />
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

<p>There are no people matching the current search criteria</p>;
