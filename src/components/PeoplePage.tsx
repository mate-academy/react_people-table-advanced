import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [visiblePeople, setVisiblePeople] = useState<Person[]>(people);

  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.get('centuries') || '';

  const loadPeople = async () => {
    setIsLoading(true);

    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
      setVisiblePeople(peopleFromServer);
    } catch {
      setHasError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadPeople();
  }, []);

  useEffect(() => {
    const newVisiblePeople = people
      .filter(person => {
        if (sex) {
          return person.sex === sex;
        }

        return true;
      })
      .filter(person => {
        if (centuries) {
          const livedIn = Math.ceil(person.born / 100);

          return centuries.includes(`${livedIn}`);
        }

        return true;
      })
      .filter(person => {
        if (query) {
          const lookForIn = (
            person.name
            + person.motherName
            + person.fatherName
          ).toLowerCase();

          return lookForIn.includes(query.toLowerCase());
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy) {
          switch (sortBy) {
            case 'born':
            case 'died':
              return a[sortBy] - b[sortBy];

            case 'name':
            case 'sex':
              return a[sortBy].localeCompare(b[sortBy]);
            default:
              return 0;
          }
        }

        return 0;
      });

    if (order) {
      newVisiblePeople.reverse();
    }

    setVisiblePeople(newVisiblePeople);
  }, [sortBy, order, sex, centuries, query]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!hasError
                && people.length > 0
                && visiblePeople.length > 0
                && !isLoading
                && (
                  <PeopleTable people={visiblePeople} />
                )}

              {!hasError
                && !isLoading
                && !people.length
                && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

              {!hasError
                && !isLoading
                && people.length > 0
                && !visiblePeople.length
                && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
