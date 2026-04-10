import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types/Person';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const { slug } = useParams<{ slug?: string }>();

  const query = searchParams.get('query') ?? '';
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

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
    return people.filter(person => {
      if (sex && person.sex !== sex) {
        return false;
      }

      if (centuries.length > 0) {
        const personCentury = Math.ceil(person.born / 100).toString();

        if (!centuries.includes(personCentury)) {
          return false;
        }
      }

      if (query) {
        const normalizedQuery = query.toLowerCase();
        const valuesToSearch = [
          person.name,
          person.motherName,
          person.fatherName,
        ].filter(Boolean) as string[];

        const matchesSearch = valuesToSearch.some(value =>
          value.toLowerCase().includes(normalizedQuery),
        );

        if (!matchesSearch) {
          return false;
        }
      }

      return true;
    });
  }, [people, centuries, query, sex]);

  const sortedPeople = useMemo(() => {
    if (!sort) {
      return filteredPeople;
    }

    const sorted = [...filteredPeople];
    const direction = order === 'desc' ? -1 : 1;

    sorted.sort((a, b) => {
      if (sort === 'name' || sort === 'sex') {
        return a[sort].localeCompare(b[sort]) * direction;
      }

      if (sort === 'born' || sort === 'died') {
        return (a[sort] - b[sort]) * direction;
      }

      return 0;
    });

    return sorted;
  }, [filteredPeople, order, sort]);

  const hasLoaded = !loading && !error;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {hasLoaded && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!loading && error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loading && !error && sortedPeople.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              )}

              {!loading && !error && sortedPeople.length > 0 && (
                <PeopleTable people={sortedPeople} selectedPersonSlug={slug} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
