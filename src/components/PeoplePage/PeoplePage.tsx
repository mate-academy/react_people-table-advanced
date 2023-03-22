import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { getSearchWith } from '../../utils/searchHelper';
import { Loader } from '../Loader';
import { PeopleFilters } from '../PeopleFilters';
import { PeopleTable } from '../PeopleTable';

const filterPeople = (
  people: Person[],
  sex: string,
  query: string,
  centuries: string[],
): Person[] => {
  let newPeople = [...people];

  if (sex) {
    newPeople = newPeople.filter(person => person.sex === sex);
  }

  if (query) {
    newPeople = newPeople.filter(person => (
      person.name.includes(query)
      || person.motherName?.includes(query)
      || person.fatherName?.includes(query)
    ));
  }

  if (centuries.length !== 0) {
    newPeople = newPeople.filter(person => {
      const century = Math.ceil(person.died / 100);

      return centuries.includes(String(century));
    });
  }

  return newPeople;
};

const sortPeople = (
  people: Person[],
  sort: string,
  order: string,
): Person[] => {
  const sortedPeople = [...people];

  switch (sort) {
    case 'name':
    case 'sex':
      sortedPeople.sort((personA, personB) => {
        return personA[sort].localeCompare(personB[sort]);
      });
      break;
    case 'born':
    case 'died':
      sortedPeople.sort((personA, personB) => {
        return personA[sort] - personB[sort];
      });
      break;
    default:
      break;
  }

  if (order) {
    sortedPeople.reverse();
  }

  return sortedPeople;
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setError] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setLoaded(false);
    setError(false);

    const getPeopleFromSever = async () => {
      try {
        const peopleFromServer = await getPeople();

        const linkedPeople = peopleFromServer.map(person => {
          const newPerson = { ...person };

          const mother = peopleFromServer
            .find(human => human.name === person.motherName);
          const father = peopleFromServer
            .find(human => human.name === person.fatherName);

          if (mother) {
            newPerson.mother = mother;
          }

          if (father) {
            newPerson.father = father;
          }

          return newPerson;
        });

        setPeople(linkedPeople);
      } catch {
        setError(true);
      } finally {
        setLoaded(true);
      }
    };

    getPeopleFromSever();
  }, []);

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const onQueryChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  }, [searchParams]);

  const preparedPeople = useMemo(() => {
    const filtered = filterPeople(people, sex, query, centuries);
    const sorted = sortPeople(filtered, sort, order);

    return sorted;
  }, [people, sex, query, centuries, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isLoaded && !isError && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                query={query}
                sex={sex}
                centuries={centuries}
                onQueryChange={onQueryChange}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isLoaded && !isError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoaded && !isError
                ? <Loader />
                : (
                  <PeopleTable
                    people={preparedPeople}
                    sort={sort}
                    order={order}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
