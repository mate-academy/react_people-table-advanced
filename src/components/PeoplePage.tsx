import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { getSearchWith } from '../utils/searchHelper';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [hasLoadingError, setLoadingError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';

  const loadPeople = async () => {
    try {
      setLoading(true);

      const peopleFromServer = await getPeople();
      const peopleWithParentsLink = peopleFromServer.map(person => {
        const mother = peopleFromServer.find(m => person.motherName === m.name);
        const father = peopleFromServer.find(f => person.fatherName === f.name);

        return { ...person, mother, father };
      });

      setPeople(peopleWithParentsLink);
    } catch (error) {
      setLoadingError(true);
    } finally {
      setLoading(false);
    }
  };

  const onQueryChange = (search: string) => {
    setSearchParams(getSearchWith(
      (searchParams), ({ query: search || null }),
    ));
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const filterByCenturies = (centuriesArray: string[]) => {
    const initialPeople = [...people];

    if (!centuriesArray.length) {
      return initialPeople;
    }

    const firstTwoCharsOfBorn = centuriesArray.map(num => {
      const number = +num - 1;

      return number.toString();
    });

    return initialPeople.filter(person => firstTwoCharsOfBorn.includes(
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
    search: string, sorted: string, reverse: string, century: string[],
    sexFilter: string,
  ) => {
    const peopleFilteredByCentury = filterByCenturies(century);
    const peopleFilteredBySex = filterBySex(peopleFilteredByCentury, sexFilter);

    switch (sorted) {
      case 'name':
        peopleFilteredBySex.sort((p1, p2) => (p1.name.localeCompare(p2.name)));
        break;

      case 'sex':
        peopleFilteredBySex.sort((p1, p2) => (p1.sex.localeCompare(p2.sex)));
        break;

      case 'born':
        peopleFilteredBySex.sort((p1, p2) => (p1.born - p2.born));
        break;

      case 'died':
        peopleFilteredBySex.sort((p1, p2) => (p1.died - p2.died));
        break;

      default:
        break;
    }

    if (reverse) {
      peopleFilteredBySex.reverse();
    }

    return peopleFilteredBySex.filter(person => {
      return person.name.toLowerCase().includes(search)
        || person.fatherName?.toLowerCase().includes(search)
        || person.motherName?.toLowerCase().includes(search);
    });
  };

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
              {isLoading ? <Loader /> : (
                <>
                  {hasLoadingError && (
                    <p data-cy="peopleLoadingError">Something went wrong</p>
                  )}

                  {!people.length && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {!visiblePeople.length
                    ? (
                      <p>
                        There are no people matching the current search criteria
                      </p>
                    )

                    : (
                      <PeopleTable
                        people={visiblePeople}
                        sort={sort}
                        order={order}
                        searchParams={searchParams}
                      />
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
