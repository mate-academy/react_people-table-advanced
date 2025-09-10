import { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    setError(false);

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

  const getFilteredAndSortedPeople = () => {
    let filteredPeople = [...people];

    const query = searchParams.get('query');

    if (query) {
      const lowerQuery = query.toLowerCase();

      filteredPeople = filteredPeople.filter(
        person =>
          person.name.toLowerCase().includes(lowerQuery) ||
          (person.motherName &&
            person.motherName.toLowerCase().includes(lowerQuery)) ||
          (person.fatherName &&
            person.fatherName.toLowerCase().includes(lowerQuery)),
      );
    }

    const sex = searchParams.get('sex');

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    const centuries = searchParams.getAll('centuries');

    if (centuries.length > 0) {
      filteredPeople = filteredPeople.filter(person => {
        const birthCentury = Math.floor(person.born / 100) + 1;

        return centuries.includes(birthCentury.toString());
      });
    }

    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    if (sort) {
      filteredPeople.sort((a, b) => {
        const aValue = a[sort as keyof Person];
        const bValue = b[sort as keyof Person];

        if (aValue == null && bValue == null) {
          return 0;
        }

        if (aValue == null) {
          return 1;
        }

        if (bValue == null) {
          return -1;
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          const aLower = aValue.toLowerCase();
          const bLower = bValue.toLowerCase();

          if (aLower < bLower) {
            return order === 'desc' ? 1 : -1;
          }

          if (aLower > bLower) {
            return order === 'desc' ? -1 : 1;
          }

          return 0;
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          if (aValue < bValue) {
            return order === 'desc' ? 1 : -1;
          }

          if (aValue > bValue) {
            return order === 'desc' ? -1 : 1;
          }

          return 0;
        }

        if (aValue < bValue) {
          return order === 'desc' ? 1 : -1;
        }

        if (aValue > bValue) {
          return order === 'desc' ? -1 : 1;
        }

        return 0;
      });
    }

    return filteredPeople;
  };

  const filteredPeople = getFilteredAndSortedPeople();

  return (
    <>
      <h1 className="title">People Page</h1>

      {loading && <Loader />}

      {error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!loading && !error && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!loading && !error && people.length > 0 && (
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-narrow-tablet is-full-mobile">
            <PeopleFilters />
          </div>

          <div className="column">
            <PeopleTable people={filteredPeople} selectedSlug={slug} />
          </div>
        </div>
      )}
    </>
  );
};
