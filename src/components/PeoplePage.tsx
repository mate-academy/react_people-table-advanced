import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person, SortType } from '../types';
import { getPeople } from '../api';

function filterPeople(
  people: Person[],
  sex: string | null,
  query: string | null,
  centuries: string[],
): Person[] {
  let filtered = [...people];

  if (sex) {
    filtered = filtered.filter(person => person.sex === sex);
  }

  if (query) {
    filtered = filtered.filter(person => {
      const { name, motherName, fatherName } = person;
      const chekingString = (name + motherName + fatherName).toLowerCase();

      return chekingString.includes(query.toLowerCase());
    });
  }

  if (centuries.length > 0) {
    const getCentury = (person: Person) => {
      return Math.ceil(person.born / 100).toString();
    };

    filtered = filtered.filter(person => (
      centuries.includes(getCentury(person))
    ));
  }

  return filtered;
}

function sortPeople(
  people: Person[],
  sort: string | null,
  order: string | null,
) {
  const sorted = [...people];

  if (sort) {
    switch (sort) {
      case SortType.Name:
      case SortType.Sex:
        sorted.sort((prevPerson, nextPerson) => (
          prevPerson[sort].localeCompare(nextPerson[sort])
        ));
        break;

      case SortType.Born:
      case SortType.Died:
        sorted.sort((prevPerson, nextPerson) => (
          prevPerson[sort] - nextPerson[sort]
        ));
        break;

      default:
        break;
    }
  }

  if (order === 'desc') {
    sorted.reverse();
  }

  return sorted;
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    setIsLoading(true);

    const getPeopleFromServer = async () => {
      try {
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getPeopleFromServer();
  }, []);

  const filteredPeople = useMemo(() => {
    return filterPeople(people, sex, query, centuries);
  }, [people, sex, query, centuries]);

  const sortedPeople = useMemo(() => {
    return sortPeople(filteredPeople, sort, order);
  }, [filteredPeople, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading
                ? <Loader />
                : (
                  <>
                    {isError && (
                      <p data-cy="peopleLoadingError">Something went wrong</p>
                    )}

                    {people.length <= 0 && (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
                    )}

                    {filteredPeople.length <= 0 && (
                      <p>
                        There are no people matching the current search criteria
                      </p>
                    )}

                    {!isError && sortedPeople.length > 0 && (
                      <PeopleTable people={sortedPeople} />
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
