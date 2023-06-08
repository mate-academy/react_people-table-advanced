import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { Sort } from '../types/Sort';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const sortParams = searchParams.get('sort') || '';
  const orderParams = searchParams.get('order') || '';
  const sexParams = searchParams.get('sex') || '';
  const queryParams = searchParams.get('query') || '';
  const centuriesParams = searchParams.getAll('centuries') || [];

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(peopleFromData => setPeople(peopleFromData))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const includesQuery = (str: string | null) => {
    return str
      ? str.toLocaleLowerCase().includes(queryParams.toLocaleLowerCase())
      : false;
  };

  const getVisiblePeople = () => {
    if (!people) {
      return [];
    }

    let copyPeople = [...people];

    if (sortParams) {
      switch (sortParams) {
        case Sort.Born:
        case Sort.Died:
          copyPeople.sort((a, b) => a[sortParams] - b[sortParams]);
          break;

        case Sort.Name:
        case Sort.Sex:
          copyPeople.sort((a, b) => a[sortParams].localeCompare(b[sortParams]));
          break;

        default:
          break;
      }
    }

    if (sexParams) {
      copyPeople = copyPeople.filter(({ sex }) => sex === sexParams);
    }

    if (queryParams) {
      copyPeople = copyPeople.filter(({ name, motherName, fatherName }) => {
        return includesQuery(name)
          || includesQuery(motherName)
          || includesQuery(fatherName);
      });
    }

    if (centuriesParams.length) {
      copyPeople = copyPeople.filter(({ born }) => {
        return centuriesParams.includes(Math.ceil(born / 100).toString());
      });
    }

    return orderParams ? copyPeople.reverse() : copyPeople;
  };

  const visiblePeople = getVisiblePeople();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {(!hasError && people && !isLoading) && (
              <PeopleFilters />
            )}
          </div>
          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {(!hasError && !people?.length && !isLoading) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {(queryParams && !visiblePeople.length) && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!!visiblePeople.length && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
