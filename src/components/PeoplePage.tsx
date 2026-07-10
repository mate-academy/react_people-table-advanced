import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useContext, useEffect, useMemo } from 'react';
import { PeopleState } from '../context/PeopleContext';
import { useSearchParams } from 'react-router-dom';
import { getFilteredPeople, Sort } from '../services/getFiltered';

export const PeoplePage = () => {
  const { people, isLoading, isEmpty, isError, getPeople } =
    useContext(PeopleState);

  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || '';
  const centuries = useMemo(
    () => searchParams.getAll('centuries') || [],
    [searchParams],
  );

  const handleSort = (sort: string) => {
    const params = new URLSearchParams(searchParams);

    const currentSearch = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentSearch !== sort) {
      params.set('sort', sort);
    } else if (currentOrder === null) {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  };

  const handleSex = (gender: string) => {
    const params = new URLSearchParams(searchParams);

    if (gender === 'all') {
      params.delete('sex');
    } else {
      params.set('sex', gender);
    }

    return `/people?${params.toString()}`;
  };

  const peopleWithParents = useMemo(() => {
    return [...people].map(person => {
      return {
        ...person,
        father: [...people].find(father => person.fatherName === father.name),
        mother: [...people].find(mother => person.motherName === mother.name),
      };
    });
  }, [people]);

  const filteredPeople = useMemo(() => {
    return getFilteredPeople(
      peopleWithParents,
      sortBy as Sort,
      order,
      sex,
      query,
      centuries,
    );
  }, [peopleWithParents, sortBy, order, sex, query, centuries]);

  useEffect(() => {
    getPeople();
  }, [getPeople]);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              {!isLoading && !isEmpty && !isError && (
                <PeopleFilters
                  sex={sex}
                  query={query}
                  centuries={centuries}
                  handleSex={handleSex}
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                />
              )}
            </div>

            <div className="column">
              <div className="box table-container">
                {isLoading && <Loader />}

                {isError && !isLoading && (
                  <p data-cy="peopleLoadingError">Something went wrong</p>
                )}

                {isEmpty && !isLoading && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                {/* <p>There are no people matching the current search criteria</p> */}

                {!isLoading && !isEmpty && !isError && (
                  <PeopleTable
                    filteredPeople={filteredPeople}
                    sortBy={sortBy}
                    order={order}
                    searchParams={searchParams}
                    handleSort={handleSort}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
