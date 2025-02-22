import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useRef, useState } from 'react';
import { Person } from '../types/Person';
import { useSearchParams } from 'react-router-dom';
import { Message } from '../types/Message';
import { getSortComparator } from '../utils/getSortComparator';
import usePeople from '../hooks/usePeople';

export const PeoplePage = () => {
  const { people, loading, dataLoaded, error, setError } = usePeople();
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [sortClass, setSortClass] = useState({
    name: 'fa-sort',
    sex: 'fa-sort',
    born: 'fa-sort',
    died: 'fa-sort',
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('search') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const prevCentury = useRef(centuries);
  const prevSex = useRef(sex);
  const prevQuery = useRef(query);
  const prevSort = useRef(sort);
  const prevOrder = useRef(order);

  useEffect(() => {
    setFilteredPeople(people);
  }, [people]);

  useEffect(() => {
    if (dataLoaded && people.length === 0) {
      setError(Message.noPeopleMessage);
    }

    let updatedPeople = [...people];

    if (query) {
      const normalizedQuery = query.toLowerCase().trim();

      updatedPeople = updatedPeople.filter(item =>
        item.name.toLowerCase().includes(normalizedQuery),
      );
    }

    if (sex && sex !== 'all') {
      updatedPeople = updatedPeople.filter(item => item.sex === sex);
    }

    if (centuries.length > 0) {
      updatedPeople = updatedPeople.filter(item => {
        const century = Math.ceil(item.born / 100);

        return centuries.includes(String(century));
      });
    }

    if (sort) {
      const comparator = getSortComparator(sort as keyof Person, order);

      updatedPeople = comparator(updatedPeople);
    }

    if (
      prevCentury.current.join() !== centuries.join() ||
      prevSex.current !== sex ||
      prevQuery.current !== query ||
      prevSort.current !== sort ||
      prevOrder.current !== order
    ) {
      setFilteredPeople(updatedPeople);

      prevCentury.current = centuries;
      prevQuery.current = query;
      prevSex.current = sex;
      prevSort.current = sort;
      prevOrder.current = order;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, sex, centuries, sort, order, dataLoaded]);

  const updateQueryFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentParams = new URLSearchParams(searchParams);

    currentParams.set('search', e.target.value);
    setSearchParams(currentParams);
  };

  const updateSexFilter = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    sexFilter: string,
  ) => {
    e.preventDefault();
    const currentParams = new URLSearchParams(searchParams);

    if (sexFilter === 'all') {
      currentParams.delete('sex');
    } else {
      currentParams.set('sex', sexFilter);
    }

    setSearchParams(currentParams);
  };

  const updateCenturyFilter = (century: string) => {
    const currentParams = new URLSearchParams(searchParams);
    const currentCenturies = currentParams.getAll('centuries');

    if (century === 'all') {
      currentParams.delete('centuries');
    } else if (!currentCenturies.includes(century)) {
      currentParams.append('centuries', century);
    } else {
      const updatedCenturies = currentCenturies.filter(
        item => item !== century,
      );

      currentParams.delete('centuries');
      updatedCenturies.forEach(item => currentParams.append('centuries', item));
    }

    setSearchParams(currentParams);
  };

  const sortByName = (type: keyof Person) => {
    const currentParams = new URLSearchParams(searchParams);
    const nativeSortClass = {
      name: 'fa-sort',
      sex: 'fa-sort',
      born: 'fa-sort',
      died: 'fa-sort',
    };

    if (order !== 'desc' && type !== sort) {
      currentParams.set('sort', type);
      setSearchParams(currentParams);

      setSortClass(() => ({
        ...nativeSortClass,
        [type]: 'fa-sort-up',
      }));

      return;
    }

    if (order === 'desc' && type !== sort) {
      currentParams.delete('order');
      currentParams.set('sort', type);
      setSearchParams(currentParams);

      setSortClass(() => ({
        ...nativeSortClass,
        [type]: 'fa-sort-up',
      }));

      return;
    }

    if (order !== 'desc' && type === sort) {
      currentParams.set('order', 'desc');
      currentParams.set('sort', type);
      setSearchParams(currentParams);

      setSortClass(() => ({
        ...nativeSortClass,
        [type]: 'fa-sort-down',
      }));

      return;
    }

    if (order === 'desc' && type === sort) {
      currentParams.delete('order');
      currentParams.delete('sort');
      setSearchParams(currentParams);

      setSortClass(() => ({
        ...nativeSortClass,
        [type]: 'fa-sort',
      }));

      return;
    }
  };

  const canShowTable = !error && dataLoaded;

  return (
    <>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              handleQueryFilter={updateQueryFilter}
              handleQuery={query}
              handleSexFilter={updateSexFilter}
              handleCenturyFilter={updateCenturyFilter}
              searchParams={searchParams}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error === Message.peopleLoadingError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {Message.somethingWrong}
                </p>
              )}

              {error === Message.noPeopleMessage && (
                <p data-cy="noPeopleMessage">{Message.noPeopleMessage}</p>
              )}

              {error === Message.cantSearchPeople && (
                <p>{Message.cantSearchPeople}</p>
              )}

              {canShowTable && (
                <PeopleTable
                  filteredPeople={filteredPeople}
                  handleChangeButton={sortByName}
                  sortClass={sortClass}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
