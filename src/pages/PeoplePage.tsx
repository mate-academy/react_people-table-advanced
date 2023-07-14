import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Person } from '../types';
import { getPeople } from '../api';
import { ErrorType, compareValues, SearchParameters } from '../utils/helpers';
import { RenderTable } from '../components/RenderTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [errorType, setErrorType] = useState<ErrorType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const centuries = searchParams.getAll(SearchParameters.Centuries);
  const query = searchParams.get(SearchParameters.Query) || '';
  const sex = searchParams.get(SearchParameters.Sex) || '';
  const sort = searchParams.get(SearchParameters.Sort) || [];
  const order = searchParams.get(SearchParameters.Order) || null;
  const flag = order === 'desc';

  const getPeopleFromServer = async () => {
    try {
      const fetchedPeople = await getPeople();

      if (!fetchedPeople.length) {
        setErrorType(ErrorType.NOPEOPLE);
      }

      setPeople(fetchedPeople);
    } catch (error) {
      setErrorType(ErrorType.LOADING);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  const filteredList = useMemo(() => {
    let filteredPeople = people && [...people];

    if (sex && filteredPeople) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (query && filteredPeople) {
      filteredPeople = filteredPeople
        .filter(person => (
          person.name.toLowerCase().includes(query)
          || person.motherName?.toLowerCase().includes(query)
          || person.fatherName?.toLowerCase().includes(query)
        ));
    }

    if (centuries.length && filteredPeople) {
      filteredPeople = filteredPeople
        .filter(person => (
          centuries.includes(Math.ceil(person.died / 100).toString())
        ));
    }

    return filteredPeople;
  }, [sex, query, centuries]);

  const sortedList = useMemo(() => {
    if (!filteredList) {
      return null;
    }

    return filteredList.sort((a, b) => {
      switch (sort) {
        case 'name':
          return compareValues(a.name, b.name, flag);

        case 'sex':
          return compareValues(a.sex, b.sex, flag);

        case 'born':
          return compareValues(a.born, b.born, flag);

        case 'died':
          return compareValues(a.died, b.died, flag);

        default:
          return 0;
      }
    });
  }, [sort, filteredList, flag]);

  useEffect(() => {
    if (filteredList && !filteredList.length) {
      setErrorType(ErrorType.SEARCH);
    } else {
      setErrorType(null);
    }
  }, [filteredList]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                query={query}
                centuries={centuries}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">

              {errorType === ErrorType.LOADING && (
                <p data-cy="peopleLoadingError">{errorType}</p>
              )}

              {(errorType === ErrorType.NOPEOPLE
                || (people && !people.length)) && (
                <p data-cy="noPeopleMessage">{errorType}</p>
              )}

              <RenderTable
                errorType={errorType}
                people={sortedList}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
