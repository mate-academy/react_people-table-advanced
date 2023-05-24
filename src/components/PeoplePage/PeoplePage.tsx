import {
  memo,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { PeopleFilters } from '../PeopleFilters/PeopleFilters';
import { Person } from '../../types';
import { Sex } from '../../types/SexEnum';
import { SortType } from '../../types/SortType';

const findParent = (people: Person[], parentName: string | null) => {
  return people.find((person) => person.name === parentName);
};

export const PeoplePage = memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || Sex.ALL;
  const query = searchParams.get('query')?.toLowerCase() || '';
  const centuries = searchParams.getAll('centuries') || [];
  const order = searchParams.get('order');
  const sort = searchParams.get('sort');

  const loadPeople = useCallback(async () => {
    setIsLoading(true);

    try {
      const peopleFromServer = await getPeople();

      const peopleWithParents = peopleFromServer.map((person) => ({
        ...person,
        mother: findParent(peopleFromServer, person.motherName),
        father: findParent(peopleFromServer, person.fatherName),
      }));

      setPeople(peopleWithParents);
    } catch {
      setErrorMessage('Failed to load people');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPeople();
  }, []);

  const filterByQuery = useCallback((
    name: string,
    fatherName: string | null,
    motherName: string | null,
  ) => {
    return name.toLowerCase().includes(query)
    || fatherName?.toLowerCase().includes(query)
    || motherName?.toLowerCase().includes(query);
  }, [query]);

  const filterBySex = useCallback((personSex: string) => {
    return !sex
      ? true
      : personSex === sex;
  }, [sex]);

  const filterByCenturies = useCallback((year: number) => {
    return !centuries.length
      ? true
      : centuries.includes(String(Math.ceil(year / 100)));
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

              {!isLoading && (
                <>
                  {errorMessage && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      Something went wrong
                    </p>
                  )}

                  {people.length > 0 ? (
                    <PeopleTable
                      people={visiblePeople}
                      sort={sort}
                      order={order}
                    />
                  ) : (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
