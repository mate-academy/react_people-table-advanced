import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Person } from '../types';
import { getPeople } from '../api';
import { ErrorType } from '../utils/helpers';
import { RenderTable } from '../components/RenderTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [errorType, setErrorType] = useState<ErrorType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const sort = searchParams.get('sort') || [];
  const order = searchParams.get('order') || null;
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

  useEffect(() => {
    if (filteredList && !filteredList.length) {
      setErrorType(ErrorType.SEARCH);
    } else {
      setErrorType(null);
    }
  }, [filteredList]);

  const sortedList = useMemo(() => (
    filteredList && filteredList.sort((a, b) => {
      switch (sort) {
        case 'name':
          return (flag ? -1 : 1) * a.name.localeCompare(b.name);

        case 'sex':
          return (flag ? -1 : 1) * a.sex.localeCompare(b.sex);

        case 'born':
          return (flag ? -1 : 1) * (a.born - b.born);

        case 'died':
          return (flag ? -1 : 1) * (a.died - b.died);

        default:
          break;
      }

      return 0;
    })
  ), [sort, filteredList, flag]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                sex={sex}
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
