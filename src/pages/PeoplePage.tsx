import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { getSearchWith } from '../utils/searchHelper';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const centuries = searchParams.getAll('centuries') || '';
  const sex = searchParams.get('sex') || '';

  const loadPeople = async () => {
    setIsLoading(true);
    setIsInitialized(false);
    setIsError(false);

    try {
      const getPeopleFromServer = await getPeople();
      const peopleWithParent = getPeopleFromServer.map(person => {
        const mother = getPeopleFromServer.find(
          mom => mom.name === person.motherName,
        );
        const father = getPeopleFromServer.find(
          dad => dad.name === person.fatherName,
        );

        return (
          {
            ...person,
            mother,
            father,
          }
        );
      });

      setPeople(peopleWithParent);
      setIsInitialized(true);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onQueryChange = (search: string) => {
    setSearchParams(getSearchWith(
      (searchParams), ({ query: search || null }),
    ));
  };

  const filterByCenturies = (centuryArray: string[]) => {
    const currentPeople = [...people];

    if (!centuryArray.length) {
      return currentPeople;
    }

    const firstTwoCharsOfBorn = centuryArray.map(num => {
      const number = +num - 1;

      return number.toString();
    });

    return currentPeople.filter(person => firstTwoCharsOfBorn.includes(
      person.born.toString().slice(0, 2),
    ));
  };

  const filterBySex = (arrayPeople: Person[], sexFilter: string) => {
    if (!sexFilter) {
      return arrayPeople;
    }

    return arrayPeople.filter(person => person.sex === sexFilter);
  };

  const reorderPeople = (
    search: string,
    sorted: string,
    reverse: string,
    century: string[],
    sexFilter: string,
  ) => {
    const peopleFilteredByCentury = filterByCenturies(century);
    const peopleFilteredBySex = filterBySex(peopleFilteredByCentury, sexFilter);

    peopleFilteredBySex.sort((p1, p2) => {
      switch (sorted) {
        case 'name':
          return p1.name.localeCompare(p2.name);
        case 'sex':
          return p1.sex.localeCompare(p2.sex);
        case 'born':
          return p1.born - p2.born;
        case 'died':
          return p1.died - p2.died;
        default:
          return 0;
      }
    });

    if (reverse) {
      peopleFilteredBySex.reverse();
    }

    return peopleFilteredBySex.filter(person => {
      return person.name.toLowerCase().includes(search)
        || person.fatherName?.toLowerCase().includes(search)
        || person.motherName?.toLowerCase().includes(search);
    });
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const isNoPeopleOnServer = !people.length && isInitialized;
  const visiblePeople = reorderPeople(query, sort, order, centuries, sex);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                query={query}
                setQuery={onQueryChange}
                centuries={centuries}
                sex={sex}
                searchParams={searchParams}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && (<Loader />)}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isNoPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length > 0 && (
                <>
                  <PeopleTable
                    people={visiblePeople}
                    sort={sort}
                    order={order}
                    searchParams={searchParams}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
