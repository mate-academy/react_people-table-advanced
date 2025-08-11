import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { useSearchParams } from 'react-router-dom';

type Props = {};

export const PeoplePage: React.FC<Props> = props => {
  const {} = props;
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    (async () => {
      try {
        const data = await getPeople();

        setPeople(data);
        setLoading(false);
        setLoadingError(false);
      } catch (error) {
        setLoading(false);
        setLoadingError(true);
      }
    })();
  }, []);

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const handleFilter = (
    allPeople: Person[],
    selectedSex: string,
    selectedCenturies: string[],
    searchQuery: string,
  ) => {
    return allPeople.filter(person => {
      const filteredPersonBySex = !selectedSex || person.sex === selectedSex;
      const filteredPersonByName =
        !searchQuery ||
        person.name.toLowerCase().includes(searchQuery.toLowerCase());
      const century = Math.ceil(person.died / 100);
      const filteredPersonByCentury =
        selectedCenturies.length === 0 ||
        selectedCenturies.includes(century.toString());

      return (
        filteredPersonBySex && filteredPersonByCentury && filteredPersonByName
      );
    });
  };

  const handleSort = (field: string) => {
    if (currentSort === field) {
      if (currentOrder === 'asc') {
        setSearchParams({ sort: field, order: 'desc' });
      } else if (currentOrder === 'desc') {
        setSearchParams({});
      } else {
        setSearchParams({ sort: field, order: 'asc' });
      }
    } else {
      setSearchParams({ sort: field, order: 'asc' });
    }
  };

  const getSortedPeople = (
    filteredPeople: Person[],
    sortField: string | null,
    order: string | null,
  ) => {
    if (!sortField) {
      return filteredPeople;
    }

    const sortedPeople = [...filteredPeople].sort((a, b) => {
      const aValue = a[sortField as keyof Person];
      const bValue = b[sortField as keyof Person];

      if (aValue == null || bValue == null) {
        return 0;
      }

      if (aValue > bValue) {
        return 1;
      }

      if (aValue < bValue) {
        return -1;
      }

      return 0;
    });

    return order === 'desc' ? sortedPeople.reverse() : sortedPeople;
  };

  const visiblePeople = handleFilter(people, sex, centuries, query);
  const sortedPeople = getSortedPeople(
    visiblePeople,
    currentSort,
    currentOrder,
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      {loading ? (
        <Loader />
      ) : loadingError ? (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      ) : people.length === 0 ? (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      ) : (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
            <div className="column">
              <div className="box table-container">
                <PeopleTable
                  people={sortedPeople}
                  loading={loading}
                  loadingError={loadingError}
                  currentSort={currentSort}
                  currentOrder={currentOrder}
                  handleSort={handleSort}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
