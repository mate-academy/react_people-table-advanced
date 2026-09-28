import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { getVisiblePeople } from '../utils/peopleHelper';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let isCancelled = false;

    getPeople()
      .then(loadedPeople => {
        if (isCancelled) {
          return;
        }

        const peopleByName = new Map(
          loadedPeople.map(person => [person.name, person]),
        );

        setPeople(
          loadedPeople.map(person => ({
            ...person,
            mother: peopleByName.get(person.motherName || ''),
            father: peopleByName.get(person.fatherName || ''),
          })),
        );
      })
      .catch(() => {
        if (!isCancelled) {
          setHasError(true);
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  const hasPeople = !isLoading && !hasError && people.length > 0;
  const visiblePeople = getVisiblePeople(people, searchParams);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {hasPeople && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {hasPeople &&
                (visiblePeople.length > 0 ? (
                  <PeopleTable people={visiblePeople} />
                ) : (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
