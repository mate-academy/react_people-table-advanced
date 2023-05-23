import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';
import { Sex } from '../types/SexEnum';
import { SortType } from '../types/SortEnum';

const toFindParents = (people: Person[], personName: string | null) => {
  const personParent = people.find(({ name }) => name === personName);

  return personParent;
};

export const PeoplePage = memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNoPeople, setHasNoPeople] = useState(false);
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || Sex.ALL;
  const query = searchParams.get('query')?.toLowerCase() || '';
  const centuries = searchParams.getAll('centuries') || [];
  const order = searchParams.get('order');
  const sort = searchParams.get('sort');

  const getPeopleFromServer = useCallback(async () => {
    try {
      const allPeople = await getPeople();
      const peopleWithParents = allPeople.map((person) => {
        return (
          {
            ...person,
            mother: toFindParents(allPeople, person.motherName),
            father: toFindParents(allPeople, person.fatherName),
          }
        );
      });

      if (allPeople.length) {
        setPeople(peopleWithParents);
      } else {
        setHasNoPeople(true);
      }

      setIsLoading(false);
    } catch {
      setError(true);
    }
  }, []);

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  const filterBySex = useCallback((personSex: string) => {
    return !sex
      ? true
      : personSex === sex;
  }, [sex]);

  const filterByQuery = useCallback((
    name: string,
    fatherName: string | null,
    motherName: string | null,
  ) => {
    return name.toLowerCase().includes(query)
    || fatherName?.toLowerCase().includes(query)
    || motherName?.toLowerCase().includes(query);
  }, [query]);

  const filterByCenturies = useCallback((year: number) => {
    return !centuries.length
      ? true
      : centuries.includes(String(Math.round(year / 100)));
  }, [centuries]);

  const toSortByType = useCallback((filteredPeople: Person[]) => {
    return filteredPeople.sort((firstPerson, secondPerson) => {
      switch (sort) {
        case SortType.NAME:
        case SortType.SEX:
          return order === 'desc'
            ? secondPerson[sort].localeCompare(firstPerson[sort])
            : firstPerson[sort].localeCompare(secondPerson[sort]);

        case SortType.BORN:
        case SortType.DIED:
          return order === 'desc'
            ? secondPerson[sort] - firstPerson[sort]
            : firstPerson[sort] - secondPerson[sort];
        default:
          return 0;
      }
    });
  }, [people, sort, order]);

  const visiblePeople = useMemo(() => {
    const filteredPeople = people.filter(({
      sex: personSex,
      name,
      born,
      fatherName,
      motherName,
    }) => {
      return filterBySex(personSex)
        && filterByQuery(name, fatherName, motherName)
        && filterByCenturies(born);
    });

    return toSortByType(filteredPeople);
  }, [people, sex, query, centuries]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people.length !== 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                sex={sex}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {hasNoPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {
                (visiblePeople.length === 0 && people.length !== 0) && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )
              }

              {visiblePeople.length !== 0 && (
                <PeopleTable
                  people={visiblePeople}
                  order={order}
                  sort={sort}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
