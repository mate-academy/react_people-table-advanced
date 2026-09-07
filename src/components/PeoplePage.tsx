import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { useState, useEffect } from 'react';
import { Person } from '../types';
import { FilterTypes } from '../types/FilterTypes';
import { FilterCenturiesTypes } from '../types/FilterCenturiesTypes';
import { useSearchParams } from 'react-router-dom';
import { Sort } from '../types/Sort';
import { Order } from '../types/Order';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [query, setQuery] = useState<string>('');
  const [error, setError] = useState(false);

  const [sort, setSort] = useState<Sort>(null);
  const [order, setOrder] = useState<Order>(null);

  const [filterTypes, setFilterTypes] = useState<FilterTypes>('all');
  const [selectedCenturies, setSelectedCenturies] = useState<
    FilterCenturiesTypes[]
  >(['all']);

  const [searchParam] = useSearchParams();

  const filteredPeople = people.filter(person => {
    const personCenturies = Math.ceil(
      person.born / 100,
    ) as FilterCenturiesTypes;
    const personSearchName = query.toLowerCase();

    const isSexMatch = () => {
      switch (filterTypes) {
        case 'all':
          return true;

        case 'male':
          return person.sex === 'm';

        case 'female':
          return person.sex === 'f';

        default:
          return true;
      }
    };

    return (
      (selectedCenturies.includes(personCenturies) ||
        selectedCenturies.includes('all')) &&
      isSexMatch() &&
      (person.name.toLowerCase().includes(personSearchName) ||
        person.motherName?.toLowerCase().includes(personSearchName) ||
        person.fatherName?.toLowerCase().includes(personSearchName))
    );
  });

  const sortPeople = [...filteredPeople].sort((people1, people2) => {
    let result = 0;

    if (sort === null) {
      return 0;
    }

    switch (sort) {
      case 'name':
        result = people1.name.localeCompare(people2.name);
        break;

      case 'sex':
        result = people1.sex.localeCompare(people2.sex);
        break;

      case 'born':
        result = people1.born - people2.born;
        break;

      case 'died':
        result = people1.died - people2.died;
        break;
    }

    return order === null ? result : result * -1;
  });

  useEffect(() => {
    setLoading(true);
    setError(false);

    getPeople()
      .then(data => {
        setPeople(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const sex = searchParam.get('sex');

    switch (sex) {
      case null:
        setFilterTypes('all');
        break;

      case 'm':
        setFilterTypes('male');
        break;

      case 'f':
        setFilterTypes('female');
        break;
    }
  }, [searchParam]);

  useEffect(() => {
    const centuries = searchParam
      .getAll('centuries')
      .map(century => Number(century) as FilterCenturiesTypes);

    if (centuries.length === 0) {
      setSelectedCenturies(['all']);
    } else {
      setSelectedCenturies(centuries);
    }
  }, [searchParam]);

  useEffect(() => {
    const queryParams = searchParam.get('query');

    if (queryParams === null) {
      setQuery('');
    } else {
      setQuery(queryParams);
    }
  }, [searchParam]);

  useEffect(() => {
    const sortParam = searchParam.get('sort') as Sort;

    if (sortParam === null) {
      setSort(null);
    } else {
      setSort(sortParam);
    }
  }, [searchParam]);

  useEffect(() => {
    const orderParam = searchParam.get('order') as Order;

    if (orderParam === null) {
      setOrder(null);
    } else {
      setOrder(orderParam);
    }
  }, [searchParam]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && (
              <PeopleFilters
                filterTypes={filterTypes}
                setFilterTypes={setFilterTypes}
                selectedCenturies={selectedCenturies}
                setSelectedCenturies={setSelectedCenturies}
                setQuery={setQuery}
                query={query}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {people.length === 0 && !loading && !error && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length > 0 &&
                filteredPeople.length === 0 &&
                !error &&
                !loading && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}

              {loading && <Loader />}

              {!loading && !error && filteredPeople.length !== 0 && (
                <PeopleTable people={sortPeople} sort={sort} order={order} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
