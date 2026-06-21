import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { ChangeEvent } from 'react';

function getVisiblePeople(
  people: Person[],
  query: string,
  sex: string,
  selectedCenturies: string[],
  order: string,
  sort: string,
): Person[] {
  let visiblePeople = [...people];
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery) {
    visiblePeople = visiblePeople.filter(person => {
      const name = person.name.toLowerCase();
      const motherName = person.motherName?.toLowerCase() || '';
      const fatherName = person.fatherName?.toLowerCase() || '';

      return (
        name.includes(normalizedQuery) ||
        motherName.includes(normalizedQuery) ||
        fatherName.includes(normalizedQuery)
      );
    });
  }

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (selectedCenturies.length > 0) {
    visiblePeople = visiblePeople.filter(person => {
      const century = Math.ceil(person.born / 100).toString();

      return selectedCenturies.includes(century);
    });
  }

  if (sort) {
    visiblePeople.sort((person1, person2) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return person1[sort].localeCompare(person2[sort]);

        case 'born':
        case 'died':
          return person1[sort] - person2[sort];

        default:
          return 0;
      }
    });

    if (order === 'desc') {
      visiblePeople.reverse();
    }
  }

  return visiblePeople;
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const order = searchParams.get('order') || '';
  const sort = searchParams.get('sort') || '';
  const selectedCenturies = searchParams.getAll('centuries');

  const errorMessage = 'Something went wrong';
  const hasNoPeople = !isLoading && people.length === 0 && !loadingError;

  const visiblePeople = getVisiblePeople(
    people,
    query,
    sex,
    selectedCenturies,
    order,
    sort,
  );

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(peopleFromApi => {
        setPeople(peopleFromApi);
        setLoadingError(null);
      })
      .catch(() => {
        setLoadingError(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const hasNoMatchingPeople =
    !isLoading &&
    !loadingError &&
    people.length > 0 &&
    visiblePeople.length === 0;

  const handleQueryChange = (InputEvent: ChangeEvent<HTMLInputElement>) => {
    const newParams = new URLSearchParams(searchParams);
    const newQuery = InputEvent.target.value;

    if (newQuery) {
      newParams.set('query', newQuery);
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !loadingError && people.length > 0 && (
              <PeopleFilters
                query={query}
                selectedCenturies={selectedCenturies}
                onQueryChange={handleQueryChange}
                sex={sex}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {loadingError && (
                <p data-cy="peopleLoadingError">{errorMessage}</p>
              )}
              {hasNoPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {hasNoMatchingPeople && (
                <p>There are no people matching the current search criteria</p>
              )}

              {visiblePeople.length > 0 && (
                <PeopleTable people={visiblePeople} sort={sort} order={order} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
