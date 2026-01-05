import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(data => setPeople(data))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const peopleByName = useMemo(() => {
    const map = new Map<string, Person>();

    people.forEach(p => map.set(p.name, p));

    return map;
  }, [people]);

  const filteredPeople = useMemo(() => {
    let result = [...people];

    if (query) {
      const q = query.toLowerCase();

      result = result.filter(
        person =>
          person.name.toLowerCase().includes(q) ||
          person.motherName?.toLowerCase().includes(q) ||
          person.fatherName?.toLowerCase().includes(q),
      );
    }

    if (sex) {
      result = result.filter(person => person.sex === sex);
    }

    if (centuries.length > 0) {
      result = result.filter(person => {
        const bornCentury = Math.ceil(person.born / 100).toString();

        return centuries.includes(bornCentury);
      });
    }

    if (sort) {
      result.sort((a, b) => {
        let valueA: string | number;
        let valueB: string | number;

        switch (sort) {
          case 'name':
            valueA = a.name;
            valueB = b.name;
            break;

          case 'sex':
            valueA = a.sex;
            valueB = b.sex;
            break;

          case 'born':
            valueA = a.born;
            valueB = b.born;
            break;

          case 'died':
            valueA = a.died ?? Infinity;
            valueB = b.died ?? Infinity;
            break;

          default:
            return 0;
        }

        let compareResult = 0;

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          compareResult = valueA.localeCompare(valueB);
        } else {
          compareResult = Number(valueA) - Number(valueB);
        }

        return order === 'desc' ? -compareResult : compareResult;
      });
    }

    return result;
  }, [people, query, sex, centuries, sort, order]);

  const showNoMatchingMessage =
    !isLoading && !hasError && people.length > 0 && filteredPeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !hasError && people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {!isLoading && hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}
              {!isLoading && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {showNoMatchingMessage && (
                <p data-cy="noPeopleMatchingMessage">
                  There are no people matching the current search criteria
                </p>
              )}

              {!isLoading && !hasError && filteredPeople.length > 0 && (
                <PeopleTable
                  people={filteredPeople}
                  selectedSlug={slug}
                  peopleByName={peopleByName}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
