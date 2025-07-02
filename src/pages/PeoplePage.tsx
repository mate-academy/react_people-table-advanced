import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || 'asc';

  useEffect(() => {
    setLoading(true);
    setError(false);

    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredPeople = useMemo(() => {
    let currentPeople = [...people];

    if (sex) {
      currentPeople = currentPeople.filter(person => person.sex === sex);
    }

    if (query) {
      const lowerCaseQuery = query.toLowerCase();

      currentPeople = currentPeople.filter(
        person =>
          person.name.toLowerCase().includes(lowerCaseQuery) ||
          (person.motherName &&
            person.motherName.toLowerCase().includes(lowerCaseQuery)) ||
          (person.fatherName &&
            person.fatherName.toLowerCase().includes(lowerCaseQuery)),
      );
    }

    if (centuries.length > 0) {
      const selectedCenturies = new Set(centuries.map(Number));

      currentPeople = currentPeople.filter(person => {
        const bornCentury = Math.ceil(person.born / 100);
        const diedCentury = Math.ceil(person.died / 100);

        return (
          selectedCenturies.has(bornCentury) ||
          selectedCenturies.has(diedCentury)
        );
      });
    }

    return currentPeople;
  }, [people, query, sex, centuries]);

  const sortedPeople = useMemo(() => {
    if (!sort) {
      return filteredPeople;
    }

    return [...filteredPeople].sort((a, b) => {
      let result = 0;

      switch (sort) {
        case 'name':
          result = a.name.localeCompare(b.name);
          break;
        case 'sex':
          result = a.sex.localeCompare(b.sex);
          break;
        case 'born':
        case 'died':
          result = a[sort] - b[sort];
          break;
        default:
          result = 0;
      }

      return order === 'desc' ? -result : result;
    });
  }, [filteredPeople, sort, order]);

  const hasPeople = sortedPeople.length > 0;
  const showFilters = !loading && !error && people.length > 0;
  const noMatchingPeopoe = !loading && !error && people.length > 0 && sortedPeople.length === 0;
  const emptyServer = !loading && !error && people.length === 0

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {showFilters && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {emptyServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {noMatchingPeopoe && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loading && !error && hasPeople && (
                <PeopleTable people={sortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
