import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleList } from './PeopleList/PeopleList';
import { getPeople } from '../../api';
import { PeopleFilters } from './PeopleFilters/PeopleFilters';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [sortField, setSortField] = useState<string | null>(
    searchParams.get('sort'),
  );
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(
    searchParams.get('order') === 'desc'
      ? 'desc'
      : searchParams.get('order') === 'asc'
        ? 'asc'
        : null,
  );

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(rawPeople => {
        const enrichedPeople = rawPeople.map(person => ({
          ...person,
          mother: rawPeople.find(p => p.name === person.motherName),
          father: rawPeople.find(p => p.name === person.fatherName),
        }));

        setPeople(enrichedPeople);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const sexFilter = searchParams.get('sex');
  const queryFilter = searchParams.get('query');
  const centuryFilter = searchParams.getAll('century');

  let filteredPeople = people.filter(person => {
    const matchesSex = sexFilter ? person.sex === sexFilter : true;

    const matchesQuery = queryFilter
      ? person.name.toLowerCase().includes(queryFilter.toLowerCase())
      : true;

    const personCentury = Math.ceil(person.born / 100).toString();
    const matchesCentury =
      centuryFilter.length > 0 ? centuryFilter.includes(personCentury) : true;

    return matchesSex && matchesQuery && matchesCentury;
  });

  if (sortField) {
    filteredPeople = [...filteredPeople].sort((a, b) => {
      let aValue = a[sortField as keyof Person];
      let bValue = b[sortField as keyof Person];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }

      aValue = String(aValue).toLowerCase();
      bValue = String(bValue).toLowerCase();

      if (aValue < bValue) {
        return sortOrder === 'asc' ? -1 : 1;
      }

      if (aValue > bValue) {
        return sortOrder === 'asc' ? 1 : -1;
      }

      return 0;
    });
  }

  const handleSort = (field: string) => {
    let newField: string | null = field;
    let newOrder: 'asc' | 'desc' | null = 'asc';

    if (sortField === field) {
      if (sortOrder === 'asc') {
        newOrder = 'desc';
      } else if (sortOrder === 'desc') {
        newField = null;
        newOrder = null;
      }
    }

    setSortField(newField);
    setSortOrder(newOrder || 'asc');

    const params = new URLSearchParams(searchParams);

    if (newField && newOrder) {
      params.set('sort', newField);
      params.set('order', newOrder);
    } else {
      params.delete('sort');
      params.delete('order');
    }

    navigate({ search: params.toString() });
  };

  const getSortIconClass = (field: string) => {
    if (sortField !== field) {
      return 'fa-sort';
    }

    if (sortOrder === 'asc') {
      return 'fa-sort-up';
    }

    if (sortOrder === 'desc') {
      return 'fa-sort-down';
    }

    return 'fa-sort';
  };

  return (
    <>
      <div className="title">People Page</div>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      ) : (
        <div className="columns">
          <div className="column">
            <div className="box">
              {filteredPeople.length === 0 ? (
                <p>There are no people matching the current search criteria</p>
              ) : (
                <table
                  data-cy="peopleTable"
                  // eslint-disable-next-line max-len
                  className="table is-striped is-hoverable is-narrow is-fullwidth"
                >
                  <thead>
                    <tr>
                      <th
                        onClick={() => handleSort('name')}
                        style={{ cursor: 'pointer' }}
                      >
                        Name{' '}
                        {sortField === 'name' && (
                          <span className="icon is-small">
                            <i className={`fas ${getSortIconClass('name')}`} />
                          </span>
                        )}
                      </th>

                      <th
                        onClick={() => handleSort('sex')}
                        style={{ cursor: 'pointer' }}
                      >
                        Sex{' '}
                        {sortField === 'sex' && (
                          <span className="icon is-small">
                            <i className={`fas ${getSortIconClass('sex')}`} />
                          </span>
                        )}
                      </th>

                      <th
                        onClick={() => handleSort('born')}
                        style={{ cursor: 'pointer' }}
                      >
                        Born{' '}
                        {sortField === 'born' && (
                          <span className="icon is-small">
                            <i className={`fas ${getSortIconClass('born')}`} />
                          </span>
                        )}
                      </th>

                      <th
                        onClick={() => handleSort('died')}
                        style={{ cursor: 'pointer' }}
                      >
                        Died{' '}
                        {sortField === 'died' && (
                          <span className="icon is-small">
                            <i className={`fas ${getSortIconClass('died')}`} />
                          </span>
                        )}
                      </th>

                      <th>Mother</th>
                      <th>Father</th>
                    </tr>
                  </thead>

                  <PeopleList people={filteredPeople} />
                </table>
              )}
            </div>
          </div>

          <div className="column is-narrow">
            <PeopleFilters />
          </div>
        </div>
      )}
    </>
  );
};
