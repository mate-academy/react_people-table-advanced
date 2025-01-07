import { PeopleFilters } from './PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../index';
import { getPeople } from '../../api';
import { Person, SexFilter, SortField, SortOrder } from '../../types';
import { useParams, useSearchParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { getSearchWith, SearchParams } from '../../utils/searchHelper';
/* eslint-disable @typescript-eslint/no-shadow */
/*eslint-disable*/
const PeoplePage = () => {
  const [people, setPeople] = React.useState<Person[]>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const { slug } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const sortColumn = searchParams.get('sort') as SortField;
  const sortOrder = searchParams.get('order') || SortOrder.Asc;
  const sexFilter = (searchParams.get('sex') as SexFilter) || SexFilter.None;
  const query = searchParams.get('query');

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: event.target.value || null });
  }

  const filterByName = React.useCallback(
    (people: Person[], query: string | null) => {
      if (!query) {
        return people;
      }

      const lowerCaseQuery = query.toLowerCase();

      return people.filter(
        person =>
          person.name.toLowerCase().includes(lowerCaseQuery) ||
          person.fatherName?.toLowerCase().includes(lowerCaseQuery) ||
          person.motherName?.toLowerCase().includes(lowerCaseQuery),
      );
    },
    [],
  );

  const filterBySex = React.useCallback(
    (people: Person[], sexFilter: SexFilter) => {
      if (sexFilter === SexFilter.None) {
        return people;
      }

      return people.filter(person => person.sex === sexFilter);
    },
    [],
  );

  const sortPeople = React.useCallback(
    (
      people: Person[],
      sortColumn: SortField | undefined,
      sortOrder: string,
    ) => {
      if (!sortColumn) {
        return people;
      }

      return [...people].sort((a, b) => {
        if (sortColumn === SortField.Name || sortColumn === SortField.Sex) {
          return sortOrder === 'asc'
            ? a[sortColumn].localeCompare(b[sortColumn])
            : b[sortColumn].localeCompare(a[sortColumn]);
        }

        if (sortColumn === SortField.Born || sortColumn === SortField.Died) {
          return sortOrder === 'asc'
            ? a[sortColumn] - b[sortColumn]
            : b[sortColumn] - a[sortColumn];
        }

        return 0;
      });
    },
    [],
  );

  const processedPeople = React.useMemo(() => {
    let result = people;

    if (result) {
      result = filterByName(result, query);
      result = filterBySex(result, sexFilter);
      result = sortPeople(result, sortColumn, sortOrder);
    }

    return result;
  }, [
    people,
    query,
    sexFilter,
    sortColumn,
    sortOrder,
    filterByName,
    filterBySex,
    sortPeople,
  ]);

  // const processedPeople = React.useMemo(() => {
  //   if (!sortColumn && sexFilter === SexFilter.None && !query) {
  //     return people;
  //   }
  //
  //   const peopleFilteredByQuery = people?.filter(person => {
  //     if (!query) {
  //       return true;
  //     }
  //
  //     return (
  //       person.name.toLowerCase().includes(query.toLowerCase()) ||
  //       person.fatherName?.toLowerCase().includes(query.toLowerCase()) ||
  //       person.motherName?.toLowerCase().includes(query.toLowerCase())
  //     );
  //   });
  //
  //   const peopleFilteredBySex = peopleFilteredByQuery?.filter(person => {
  //     if (sexFilter === SexFilter.None) {
  //       return true;
  //     }
  //
  //     return person.sex === sexFilter;
  //   });
  //
  //   return [...(peopleFilteredBySex || [])].sort((a, b) => {
  //     if (sortColumn === SortField.Name || sortColumn === SortField.Sex) {
  //       return sortOrder === 'asc'
  //         ? a[sortColumn].localeCompare(b[sortColumn])
  //         : b[sortColumn].localeCompare(a[sortColumn]);
  //     }
  //
  //     if (sortColumn === SortField.Born || sortColumn === SortField.Died) {
  //       return sortOrder === 'asc'
  //         ? a[sortColumn] - b[sortColumn]
  //         : b[sortColumn] - a[sortColumn];
  //     }
  //
  //     return 0;
  //   });
  // }, [sortColumn, sortOrder, people, sexFilter, query]);

  const searchPeopleByName = (name: string | null) => {
    return people?.find(
      person => person.name.toLowerCase() === name?.toLowerCase(),
    );
  };

  useEffect(() => {
    setLoading(true);
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

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && (
              <PeopleFilters
                sexFilter={sexFilter}
                handleQueryChange={handleQueryChange}
                query={query}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {processedPeople && processedPeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!error &&
                !loading &&
                processedPeople &&
                processedPeople?.length > 0 && (
                <PeopleTable
                  people={processedPeople}
                  slug={slug}
                  searchPeopleByName={searchPeopleByName}
                  sortColumn={sortColumn}
                  sortOrder={sortOrder}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
