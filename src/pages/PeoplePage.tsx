import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { isQuery } from '../helpers/queryHelpers';
import { Person } from '../types';
import { SortOrders } from '../types/SortOrder';

interface FilterOptions {
  people: Person[];
  query: string;
  sex: string;
  centuries: string[];
  sort: string;
  order: string;
}

const getFilteredPeople = ({
  people,
  query,
  sex,
  centuries,
  sort,
  order,
}: FilterOptions) => {
  let visiblePeople = [...people];

  if (query) {
    visiblePeople = visiblePeople.filter(person => (
      isQuery(person.name, query)
        || isQuery(person.fatherName, query)
        || isQuery(person.motherName, query)
    ));
  }

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (centuries.length) {
    visiblePeople = visiblePeople.filter(person => (
      centuries.includes(Math.ceil(person.born / 100).toString())
    ));
  }

  if (sort) {
    visiblePeople.sort((person1, person2) => {
      switch (sort) {
        case SortOrders.Name:
        case SortOrders.Sex:
          return person1[sort].localeCompare(person2[sort]);

        case SortOrders.Born:
          return person1.born - person2.born;

        case SortOrders.Died:
          return person1.died - person2.died;

        default:
          return 0;
      }
    });
  }

  if (order === 'desc') {
    visiblePeople.reverse();
  }

  return visiblePeople;
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    fetch('https://mate-academy.github.io/react_people-table/api/people.json')
      .then(response => response.json())
      .then(setPeople)
      .catch(error => {
        setIsError(true);
        throw error;
      })
      .finally(() => setIsLoading(false));
  }, []);

  const preparedPeople = getFilteredPeople({
    people,
    query,
    sex,
    centuries,
    sort,
    order,
  });

  const emptyTable = !isError && !isLoading && !people.length;
  const noFilterResults = !isLoading
    && !preparedPeople.length
    && people.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && (
              <PeopleFilters
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {preparedPeople.length > 0 && (
                <PeopleTable
                  people={preparedPeople}
                  searchParams={searchParams}
                />
              )}

              {noFilterResults && (
                <p>There are no people matching the current search criteria</p>
              )}

              {emptyTable && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
