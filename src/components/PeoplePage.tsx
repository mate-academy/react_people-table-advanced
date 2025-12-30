import { useEffect, useState } from 'react';
import { Person } from '../types';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

export const PeoplePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');
  const query = searchParams.get('query');
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  function handleSortClick(field: string) {
    const params = new URLSearchParams(searchParams);
    const sort = searchParams.get('sort');

    if (sort !== field) {
      params.set('sort', field);
      params.delete('order');
    } else {
      if (!params.has('order')) {
        params.set('order', 'desc');
      } else {
        params.delete('order');
        params.delete('sort');
      }
    }

    setSearchParams(params);
  }

  const getSortIcon = (field: string) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    return classNames('fas', {
      'fa-sort': currentSort !== field,
      'fa-sort-up': currentSort === field && !currentOrder,
      'fa-sort-down': currentSort === field && currentOrder === 'desc',
    });
  };

  const getVisiblePeople = () => {
    let result = [...people];

    if (query) {
      const normalizedQuery = query.toLowerCase().trim();

      result = result.filter(
        person =>
          person.name.toLocaleLowerCase().includes(normalizedQuery) ||
          person.motherName?.toLocaleLowerCase().includes(normalizedQuery) ||
          person.fatherName?.toLocaleLowerCase().includes(normalizedQuery),
      );
    }

    if (sex) {
      result = result.filter(person => person.sex === sex);
    }

    if (centuries.length > 0) {
      result = result.filter(person => {
        const centuryBorn = Math.ceil(person.born / 100).toString();

        return centuries.includes(centuryBorn);
      });
    }

    if (sortField) {
      result.sort((person1, person2) => {
        const value1 = person1[sortField as keyof Person];
        const value2 = person2[sortField as keyof Person];

        if (typeof value1 === 'string' && typeof value2 === 'string') {
          return value1.localeCompare(value2);
        }

        if (typeof value1 === 'number' && typeof value2 === 'number') {
          return value1 - value2;
        }

        return 0;
      });

      if (sortOrder === 'desc') {
        result.reverse();
      }
    }

    return result;
  };

  const visiblePeople = getVisiblePeople();

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        {isLoading ? (
          <Loader />
        ) : hasError ? (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        ) : people.length === 0 ? (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        ) : (
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
            <div className="box table-container">
              <table
                data-cy="peopleTable"
                className="table is-striped is-hoverable is-narrow is-fullwidth"
              >
                <thead>
                  <tr>
                    <th>
                      <span
                        className="is-flex is-flex-wrap-nowrap"
                        onClick={() => handleSortClick('name')}
                      >
                        Name
                        <a>
                          <span className="icon">
                            <i className={getSortIcon('name')} />
                          </span>
                        </a>
                      </span>
                    </th>

                    <th>
                      <span
                        className="is-flex is-flex-wrap-nowrap"
                        onClick={() => handleSortClick('sex')}
                      >
                        Sex
                        <a>
                          <span className="icon">
                            <i className={getSortIcon('sex')} />
                          </span>
                        </a>
                      </span>
                    </th>

                    <th>
                      <span
                        className="is-flex is-flex-wrap-nowrap"
                        onClick={() => handleSortClick('born')}
                      >
                        Born
                        <a>
                          <span className="icon">
                            <i className={getSortIcon('born')} />
                          </span>
                        </a>
                      </span>
                    </th>

                    <th>
                      <span
                        className="is-flex is-flex-wrap-nowrap"
                        onClick={() => handleSortClick('died')}
                      >
                        Died
                        <a>
                          <span className="icon">
                            <i className={getSortIcon('died')} />
                          </span>
                        </a>
                      </span>
                    </th>

                    <th>Mother</th>
                    <th>Father</th>
                  </tr>
                </thead>

                {visiblePeople && <PeopleTable people={visiblePeople} />}
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
