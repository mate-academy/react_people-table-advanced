import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types/Person';
import { Loader } from '../Loader/Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { PeopleFilters } from '../PeopleFilters/PeopleFilters';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const sex = searchParams.get('sex');
  const query = searchParams.get('query')?.toLowerCase().trim() || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const visiblePeople = useMemo(() => {
    let result = [...people];

    if (sex) {
      result = result.filter(person => person.sex === sex);
    }

    if (query) {
      result = result.filter(person => {
        const matchesName = person.name.toLowerCase().includes(query);
        const matchesMother = person.motherName?.toLowerCase().includes(query);
        const matchesFather = person.fatherName?.toLowerCase().includes(query);

        return matchesName || matchesMother || matchesFather;
      });
    }

    if (centuries.length > 0) {
      result = result.filter(person => {
        const century = Math.ceil(person.born / 100).toString();

        return centuries.includes(century);
      });
    }

    if (sort) {
      result.sort((a, b) => {
        let comparison = 0;

        switch (sort) {
          case 'name':
          case 'sex':
            comparison = a[sort].localeCompare(b[sort]);
            break;
          case 'born':
          case 'died':
            comparison = a[sort] - b[sort];
            break;
          default:
            break;
        }

        return order === 'desc' ? -comparison : comparison;
      });
    }

    return result;
  }, [people, sex, query, centuries, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-reversed">
          <div className="column is-7-tablet is-8-desktop">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !isError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !isError && people.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>

          {!isLoading && !isError && (
            <div className="column">
              <PeopleFilters />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
