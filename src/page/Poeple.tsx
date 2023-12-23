import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { usePeopleContext } from '../components/PeopleContext/PeopleContext';
import {
  filterPeopleByCenturies,
} from '../components/function/filterPeopleByCenturies';
import { filterPeopleBySex } from '../components/function/filterPeopleBySex';
import { getPeople } from '../api';
import { SortType } from './TablePeople';
import { Person } from '../types';

export const Poeple = () => {
  const {
    people,
    setPeople,
    isLoading,
    setError,
    setFilteredPeople,
    filteredPeople,
    setIsLoading,
  } = usePeopleContext();
  const [searchParams] = useSearchParams();

  const century = useMemo(
    () => searchParams.getAll('centuries') || [], [searchParams],
  );

  const sexSearch = useMemo(
    () => searchParams.get('sex'), [searchParams],
  );

  const sortSearch = useMemo(
    () => searchParams.get('sort'), [searchParams],
  );
  const orderSearch = useMemo(
    () => searchParams.get('order'), [searchParams],
  );

  const [searchParamValue, setSearchParamValue] = useState('');
  const isFilteringActiveRef = useRef<boolean | null>(null);

  useEffect(() => {
    const initialSearchParamValue = searchParams.get('query') || '';

    const fetchData = async () => {
      try {
        const data = await getPeople();

        if (isFilteringActiveRef.current) {
          setFilteredPeople(data);
          setPeople(data);
        }

        setPeople(data);
      } catch (error) {
        setError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    setSearchParamValue(initialSearchParamValue);

    isFilteringActiveRef.current = !!(
      initialSearchParamValue || century.length || sexSearch
    );
  }, []);

  useEffect(() => {
    setSearchParamValue(searchParams.get('query') || '');
    const filteredByName = people.filter((person) => (person.name.toLowerCase()
      .includes(searchParamValue.toLowerCase())));

    const filteredByCentury = century.length === 0
      ? filteredByName
      : filterPeopleByCenturies(filteredByName, century);

    const filteredBySex = !sexSearch
      ? filteredByCentury
      : filterPeopleBySex(filteredByCentury, sexSearch);

    isFilteringActiveRef.current = !!(
      searchParamValue || century.length || sexSearch
    );

    const compareByField = (a: Person, b: Person, field: SortType) => {
      if (orderSearch === 'desc') {
        return b[field] > a[field] ? 1 : -1;
      }

      return a[field] > b[field] ? 1 : -1;
    };

    const sortedPeople = (peopleArray: Person[]) => {
      if (!sortSearch) {
        return peopleArray;
      }

      const compareFunction = (a: Person, b: Person) => {
        const field = sortSearch as SortType;

        switch (field) {
          case SortType.Name:
          case SortType.Sex:
          case SortType.Born:
          case SortType.Died:
            return compareByField(a, b, field);
          default:
            return 0;
        }
      };

      return [...peopleArray].sort(compareFunction);
    };

    let sorted = [];

    if (!sortSearch) {
      sorted = isFilteringActiveRef.current ? filteredBySex : [...people];
    } else if (filteredPeople.length === 0 && !isFilteringActiveRef.current) {
      sorted = sortedPeople(people);
    } else {
      sorted = sortedPeople(filteredBySex);
    }

    setFilteredPeople(sorted);
  }, [searchParams,
    searchParamValue,
    century,
    sexSearch,
    people,
    sortSearch,
    filteredPeople.length,
    setFilteredPeople,
  ]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <Outlet />
          </div>
        </div>
      </div>

    </>
  );
};
