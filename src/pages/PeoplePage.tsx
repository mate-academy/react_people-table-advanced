import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { PeopleList } from '../components/PeopleList';
import { PeopleFilters } from '../components/PeopleFilters';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { SortType, checkQuery } from '../utils/sortHelpers';
import { SearchKey } from '../utils/searchHelper';

const getParent = (personList: Person[], parentName: string | null) => {
  return personList.find(({ name }) => name === parentName);
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setisError] = useState(false);

  const [searchParams] = useSearchParams();

  const query = searchParams.get(SearchKey.QUERY) || '';
  const chosenSex = searchParams.get(SearchKey.SEX) || '';
  const centuries = searchParams.getAll(SearchKey.CENTURIES) || [];
  const sort = searchParams.get(SearchKey.SORT) || '';
  const order = searchParams.get(SearchKey.ORDER) || '';

  const loadPeople = async () => {
    setIsLoading(true);
    try {
      const loadedPeople = await getPeople();

      setisError(false);
      setPeople(loadedPeople);
    } catch {
      setisError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const preparedPeople = useMemo(() => {
    return people.map((person) => ({
      ...person,
      mother: getParent(people, person.motherName),
      father: getParent(people, person.fatherName),
    }));
  }, [people]);

  const peopleFilteredSorted = useMemo(() => {
    return preparedPeople
      .filter(({
        name, sex, died, fatherName, motherName,
      }) => {
        const centuryCheck = centuries.length
          ? centuries.includes(String(Math.ceil(died / 100)))
          : true;
        const sexCheck = chosenSex
          ? chosenSex === sex
          : true;
        const queryCheck = checkQuery(query, name, fatherName, motherName);

        return queryCheck && sexCheck && centuryCheck;
      })
      .sort((first, second) => {
        switch (sort) {
          case SortType.NAME:
            return order
              ? second.name.localeCompare(first.name)
              : first.name.localeCompare(second.name);
          case SortType.SEX:
            return order
              ? second.sex.localeCompare(first.sex)
              : first.sex.localeCompare(second.sex);
          case SortType.BORN:
            return order
              ? +(second.born) - +(first.born)
              : +(first.born) - +(second.born);
          case SortType.DIED:
            return order
              ? +(second.died) - +(first.died)
              : +(first.died) - +(second.died);
          default:
            return 0;
        }
      });
  }, [preparedPeople, query, chosenSex, centuries, sort]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !isError && preparedPeople.length && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && !isLoading && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && people.length === 0 && !isError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {peopleFilteredSorted.length === 0 && !isLoading && !isError && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}

              {peopleFilteredSorted.length > 0 && !isLoading && (
                <PeopleList people={peopleFilteredSorted} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
