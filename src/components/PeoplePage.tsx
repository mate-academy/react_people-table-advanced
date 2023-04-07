import { useState, useEffect, useMemo } from 'react';
import { useMatch, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const match = useMatch('/people/:personId');
  const selectedPersonId = match?.params.personId || '';
  const [searchParams] = useSearchParams();
  const currentGender = searchParams.get('sex');
  const pickedCenturies = searchParams.getAll('centuries');
  const sortName = searchParams.get('sort');
  const order = searchParams.get('order');
  const query = searchParams.get('query');

  useEffect(() => {
    setIsLoading(true);
    getPeople().then(result => {
      setPeople(result);
    })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = useMemo(() => {
    const filteredArray = (currentGender)
      ? people.filter(person => (person.sex === currentGender))
      : [...people];
    const filteredByCentury = (pickedCenturies.length > 0)
      ? filteredArray.filter(person => (
        pickedCenturies.includes(Math.ceil(person.born / 100).toString())))
      : filteredArray;

    if (query !== '' && query !== null) {
      const normalizedQuery = query.toLowerCase();

      return filteredByCentury.filter(person => (
        person.name.toLowerCase().includes(normalizedQuery)
          || person.motherName?.toLowerCase().includes(normalizedQuery)
          || person.fatherName?.toLowerCase().includes(normalizedQuery)));
    }

    return filteredByCentury;
  }, [currentGender, pickedCenturies, people, query]);

  const sortedPeople = useMemo(() => {
    if (sortName) {
      return [...visiblePeople].sort((a, b) => {
        const curr = a[sortName as keyof typeof a];
        const next = b[sortName as keyof typeof b];

        if (typeof curr === 'string' && typeof next === 'string') {
          if (order === 'desc') {
            return next.localeCompare(curr);
          }

          return curr.localeCompare(next);
        }

        if (typeof curr === 'number' && typeof next === 'number') {
          if (order === 'desc') {
            return next - curr;
          }

          return curr - next;
        }

        return 0;
      });
    }

    return visiblePeople;
  }, [sortName, order, visiblePeople]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading
                ? <Loader />
                : (
                  <div className="box table-container">
                    {isError && (
                      <p
                        data-cy="peopleLoadingError"
                        className="has-text-danger"
                      >
                        Something went wrong
                      </p>
                    )}

                    {people.length === 0 && (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
                    )}

                    {!visiblePeople.length ? (
                      <p>
                        There are no people matching the current search criteria
                      </p>
                    )
                      : (
                        <PeopleTable
                          people={sortedPeople}
                          personId={selectedPersonId}
                        />
                      )}
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
