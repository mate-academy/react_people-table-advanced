import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { getSearchWith } from '../utils/searchHelper';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { getSlug } from '../utils/getSlug';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(data => {
        const withSlug = data.map(person => ({
          ...person,
          slug: getSlug(person),
        }));

        setPeople(withSlug);
        setHasError(false);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const query = searchParams.get('query')?.toLowerCase() || '';
  const centuries = searchParams.getAll('centuries');

  const filteredPeople = useMemo(() => {
    return people.filter(person => {
      const matchQuery =
        person.name.toLowerCase().includes(query) ||
        person.motherName?.toLowerCase().includes(query) ||
        person.fatherName?.toLowerCase().includes(query);

      const matchCentury =
        centuries.length === 0 ||
        centuries.includes(Math.ceil(person.born / 100).toString());

      return matchQuery && matchCentury;
    });
  }, [people, query, centuries]);

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const sortedPeople = useMemo(() => {
    const list = [...filteredPeople];

    if (sort) {
      list.sort((a, b) => {
        const aVal = a[sort as keyof Person];
        const bVal = b[sort as keyof Person];

        if (aVal == null) {
          return 1;
        }

        if (bVal == null) {
          return -1;
        }

        if (aVal < bVal) {
          return -1;
        }

        if (aVal > bVal) {
          return 1;
        }

        return 0;
      });

      if (order === 'desc') {
        list.reverse();
      }
    }

    return list;
  }, [filteredPeople, sort, order]);

  const selectedPerson = slug ? people.find(p => p.slug === slug) : null;

  return (
    <>
      <h1 className="title" data-cy="title">
        People Page
      </h1>

      {isLoading && (
        <div className="notification is-info" data-cy="loader">
          Loading...
        </div>
      )}

      {!isLoading && hasError && (
        <div className="notification is-danger" data-cy="peopleLoadingError">
          Unable to load people
        </div>
      )}

      {!isLoading && !hasError && people.length === 0 && (
        <div className="notification" data-cy="noPeopleMessage">
          No people found
        </div>
      )}

      {!isLoading && !hasError && people.length > 0 && (
        <>
          <PeopleFilters />

          <PeopleTable people={sortedPeople} selectedSlug={slug || ''} />

          {selectedPerson && (
            <div className="box" data-cy="personPage">
              <h2 className="title is-4">{selectedPerson.name}</h2>

              <ul>
                <li>
                  <strong>Sex:</strong> {selectedPerson.sex}
                </li>
                <li>
                  <strong>Born:</strong> {selectedPerson.born}
                </li>
                <li>
                  <strong>Died:</strong> {selectedPerson.died}
                </li>
                <li>
                  <strong>Mother:</strong> {selectedPerson.motherName || '-'}
                </li>
                <li>
                  <strong>Father:</strong> {selectedPerson.fatherName || '-'}
                </li>
              </ul>

              <button
                className="button is-link mt-4"
                onClick={() => setSearchParams(getSearchWith(searchParams, {}))}
              >
                ← Назад до списку
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};
