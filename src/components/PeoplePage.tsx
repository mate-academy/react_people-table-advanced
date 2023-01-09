import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { Error } from '../types/Error';
import { Notification } from './Notification';
import { getSearchWith } from '../utils/searchHelper';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [visiblePeople, setVisiblePeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;
  const filterSex = searchParams.get('sex') || null;
  const filterQuery = searchParams.get('query') || null;
  const centuries = useMemo(
    () => searchParams.getAll('centuries'), [searchParams],
  ) || null;

  const sortFunction = (a: Person, b: Person): number => {
    if (!sort) {
      return 0;
    }

    const firstValue = a[sort as keyof Person];
    const secondValue = b[sort as keyof Person];

    if (typeof firstValue === 'string' && typeof secondValue === 'string') {
      return (
        order
          ? secondValue.localeCompare(firstValue)
          : firstValue.localeCompare(secondValue)
      );
    }

    if (typeof firstValue === 'number' && typeof secondValue === 'number') {
      return (
        order
          ? secondValue - firstValue
          : firstValue - secondValue
      );
    }

    return 0;
  };

  useEffect(() => {
    if (!people) {
      return;
    }

    let processedPeople = [...people];

    if (sort) {
      processedPeople.sort(sortFunction);
    }

    if (filterSex) {
      processedPeople = processedPeople.filter(person => (
        person.sex === filterSex));
    }

    if (filterQuery) {
      processedPeople = processedPeople.filter(person => {
        const personName = person.name.toLowerCase();
        const personMotherName = person.motherName?.toLowerCase();
        const personFatherName = person.fatherName?.toLowerCase();
        const query = filterQuery.toLowerCase();

        return (
          personName.includes(query)
          || personMotherName?.includes(query)
          || personFatherName?.includes(query)
        );
      });
    }

    if (centuries.length) {
      processedPeople = processedPeople.filter(person => {
        const century = Math.ceil(person.born / 100).toString();

        return centuries.includes(century);
      });
    }

    if (!processedPeople.length) {
      setError({
        type: null,
        message: 'There are no people matching the current search criteria',
      });
    }

    setVisiblePeople(processedPeople);
  }, [people, sort, order, filterSex, filterQuery, centuries]);

  const loadPeople = async () => {
    setIsLoading(true);

    try {
      const peopleFromServer = await getPeople();

      if (!peopleFromServer.length) {
        setError({
          type: 'noPeopleMessage',
          message: 'There are no people on the server',
        });

        return;
      }

      setPeople(peopleFromServer);
      setVisiblePeople(peopleFromServer);
    } catch {
      setError({
        type: 'peopleLoadingError',
        message: 'Something went wrong',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const setSortingParam = (value: string) => {
    if (sort && order) {
      return {
        search: getSearchWith(searchParams, { sort: null, order: null }),
      };
    }

    if (sort === value) {
      return {
        search: getSearchWith(searchParams, { order: 'desc' }),
      };
    }

    return {
      search: getSearchWith(searchParams, { sort: value }),
    };
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {(visiblePeople && !error) && (
              <PeopleFilters
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                filterBySex={filterSex}
                filterQuery={filterQuery}
                centuries={centuries}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && <Notification error={error} />}

              {(visiblePeople && !error) && (
                <PeopleTable
                  visiblePeople={visiblePeople}
                  setSortingParam={setSortingParam}
                  sortParam={sort}
                  orderParam={order}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
