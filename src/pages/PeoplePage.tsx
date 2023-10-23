import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { RenderTable } from '../components/RenderTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { getPeople } from '../api';
import { Person } from '../types';
import { ErrorType } from '../types/ErrorType';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [errorType, setErrorType] = useState<ErrorType | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || [];
  const order = searchParams.get('order') || null;
  const { slug = '' } = useParams();
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
      setIsFetching(false);
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
  ), [sort, filteredList]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isFetching && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                query={query}
                centuries={centuries}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
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
                slug={slug}
                people={sortedList}
                errorType={errorType}
                isFetching={isFetching}
                searchParams={searchParams}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
