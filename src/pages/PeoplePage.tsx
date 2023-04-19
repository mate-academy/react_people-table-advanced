import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { FilterBySex } from '../types/typesFilters/FilterBySex';
import { SortByPersonInfo } from '../types/typesSorts/SortByPersonInfo';

export enum ErrorType {
  NONE = '',
  LOAD = 'Something went wrong',
  NOPEOPLE = 'There are no people on the server',
}

const getSortType = (type: string) : SortByPersonInfo => {
  switch (type) {
    case SortByPersonInfo.NAME:
      return SortByPersonInfo.NAME;

    case SortByPersonInfo.SEX:
      return SortByPersonInfo.SEX;

    case SortByPersonInfo.BORN:
      return SortByPersonInfo.BORN;

    case SortByPersonInfo.DIED:
      return SortByPersonInfo.DIED;

    default:
      return SortByPersonInfo.NONE;
  }
};

const getTypeBySex = (type: string): FilterBySex => {
  switch (type) {
    case FilterBySex.MAN:
      return FilterBySex.MAN;

    case FilterBySex.WOMAN:
      return FilterBySex.WOMAN;

    default:
      return FilterBySex.ALL;
  }
};

const doNormalize = (text: string): string => (text.toLocaleLowerCase());

const getCentryByBorn = (year: number): number => {
  let century = Math.ceil(year / 100);

  if (year % 100 === 0) {
    century -= 1;
  }

  return century;
};

const getVisiblePeople = (
  people: Person[],
  query: string | null,
  sex: FilterBySex,
  centuries: number[],
  sortType: SortByPersonInfo,
  order: string,
) => {
  let copyPeople = [...people];

  if (query) {
    copyPeople = copyPeople.filter(person => {
      const {
        name,
        motherName,
        fatherName,
      } = person;
      const normalizeQuery = doNormalize(query).trim();
      const normalizeName = doNormalize(name);
      const normalizeMotherName = doNormalize(motherName || '-');
      const normalizeFatherName = doNormalize(fatherName || '-');

      return normalizeName.includes(normalizeQuery)
        || normalizeMotherName.includes(normalizeQuery)
        || normalizeFatherName.includes(normalizeQuery);
    });
  }

  if (sex) {
    copyPeople = copyPeople.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    copyPeople = copyPeople.filter(person => (
      centuries.includes(getCentryByBorn(person.born))
    ));
  }

  if (sortType) {
    copyPeople.sort((currentPerson, nextPerson) => {
      switch (sortType) {
        case SortByPersonInfo.NAME:
        case SortByPersonInfo.SEX:
          return currentPerson[sortType].localeCompare(nextPerson[sortType]);

        case SortByPersonInfo.BORN:
        case SortByPersonInfo.DIED:
          return currentPerson[sortType] - nextPerson[sortType];

        default:
          return 0;
      }
    });
  }

  if (order) {
    copyPeople.reverse();
  }

  return copyPeople;
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<ErrorType>(ErrorType.NONE);

  const [searchParams] = useSearchParams();
  const queryParams = searchParams.get('query');
  const sex = searchParams.get('sex') || FilterBySex.ALL;
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || SortByPersonInfo.NONE;
  const order = searchParams.get('order') || '';

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setIsLoading(true);

        const fetchedPeople = await getPeople();
        const peopleWithParents = fetchedPeople.map(person => {
          const copyPerson = { ...person };

          if (person.motherName) {
            copyPerson.mother
              = fetchedPeople.find(mother => mother.name === person.motherName);
          }

          if (person.fatherName) {
            copyPerson.father
              = fetchedPeople.find(father => father.name === person.fatherName);
          }

          return copyPerson;
        });

        if (peopleWithParents.length === 0) {
          setErrorMessage(ErrorType.NOPEOPLE);

          return;
        }

        setPeople(peopleWithParents);
        setErrorMessage(ErrorType.NONE);
      } catch {
        setErrorMessage(ErrorType.LOAD);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  const isLoadError = errorMessage === ErrorType.LOAD;
  const areNotPeopleError = errorMessage === ErrorType.NOPEOPLE;

  const visiblePeople = getVisiblePeople(
    people,
    queryParams,
    getTypeBySex(sex),
    centuries.map(centry => +centry),
    getSortType(sort),
    order,
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!errorMessage && !isLoading && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoadError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {areNotPeopleError && (
                <p data-cy="noPeopleMessage">
                  {errorMessage}
                </p>
              )}

              {!visiblePeople.length && !isLoading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {isLoading ? (
                <Loader />
              ) : (!errorMessage && visiblePeople[0] && (
                <PeopleTable people={visiblePeople} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
