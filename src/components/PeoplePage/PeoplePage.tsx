import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { preparePeople, getCentury } from '../../helper';
import { SearchParams } from '../../types/SearchParams';
import { Sort } from '../../types/Sort';
import { Person } from '../../types/Person';
import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  let currentPeople = [...people];

  const sexParams = searchParams.get(SearchParams.Sex);
  const queryParams = searchParams.get(SearchParams.Query);
  const centuriesParams = searchParams.getAll(SearchParams.Centurie);
  const sortParams = searchParams.get(SearchParams.Sort);
  const orderParams = searchParams.get(SearchParams.Order) === 'desc';

  if (sexParams) {
    currentPeople = currentPeople.filter(({ sex }) => sex === sexParams);
  }

  if (centuriesParams.length > 0) {
    currentPeople = currentPeople.filter(
      person => centuriesParams.includes(
        getCentury(person).toString(),
      ),
    );
  }

  if (queryParams) {
    const lowerQuery = queryParams.toLocaleLowerCase();

    currentPeople = currentPeople.filter(({
      name,
      motherName,
      fatherName,
    }) => {
      return [name, motherName || '', fatherName || '']
        .join('\n')
        .toLocaleLowerCase()
        .includes(lowerQuery);
    });
  }

  if (sortParams) {
    currentPeople.sort((a, b) => {
      switch (sortParams) {
        case Sort.Name:
        case Sort.Sex:
          return a[sortParams].localeCompare(b[sortParams]);

        case Sort.Born:
        case Sort.Died:
          return a[sortParams] - b[sortParams];

        default:
          return 0;
      }
    });

    if (orderParams) {
      currentPeople.reverse();
    }
  }

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((resp) => setPeople(preparePeople<Person>(resp)))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {!isLoading && isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !isError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !isError && people.length > 0 && (
                <PeopleTable people={currentPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
