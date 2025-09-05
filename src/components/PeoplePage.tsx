import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [updatedList, setUpdatedList] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  const allowedSorts = ['name', 'sex', 'born', 'died'];
  const sortParam = searchParams.get('sort');
  const sort = sortParam && allowedSorts.includes(sortParam) ? sortParam : null;

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const order = searchParams.get('order');

  useEffect(() => {
    setIsLoading(true);

    fetch('https://mate-academy.github.io/react_people-table/api/people.json')
      .then(response => response.json())
      .then(data => setPeople(data))
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    let result = [...people];

    if (centuries.length > 0) {
      result = result.filter(e =>
        centuries.some(c => +c - 1 === Math.floor(e.born / 100)),
      );
    }

    if (sex) {
      result = result.filter(e => e.sex === sex);
    }

    if (query) {
      const q = query.toLowerCase();

      result = result.filter(e =>
        [e.name, e.motherName, e.fatherName].some(v =>
          v?.toLowerCase().includes(q),
        ),
      );
    }

    if (sort) {
      result = result.sort((p1, p2) => {
        if (sort === 'name' || sort === 'sex') {
          return order !== 'desc'
            ? p1[sort].localeCompare(p2[sort])
            : p2[sort].localeCompare(p1[sort]);
        }

        if (sort === 'born' || sort === 'died') {
          return order !== 'desc' ? p1[sort] - p2[sort] : p2[sort] - p1[sort];
        }

        return 0;
      });
    }

    setUpdatedList(result);
  }, [sex, query, centuries, sort, order, people]);

  return (
    <div className="section">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {updatedList.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              <PeopleTable updatedList={updatedList} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
