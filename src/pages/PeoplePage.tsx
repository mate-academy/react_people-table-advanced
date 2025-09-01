import React, { useEffect, useMemo, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import PeopleTable from '../components/PeopleTable';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { getSearchWith } from '../utils/searchHelper';

const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || 'asc';

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setError('Unable to load the data');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleQueryChange = (newQuery: string) => {
    const params = getSearchWith(searchParams, { query: newQuery || null });

    setSearchParams(params);
  };

  const { slug } = useParams<{ slug: string }>();

  const visiblePeople = useMemo(() => {
    const filteredPeople = people.filter(person => {
      const nameMatch = person.name.toLowerCase().includes(query.toLowerCase());
      const sexMatch = !sex || person.sex === sex;
      const personCentury = String(Math.ceil(person.born / 100));
      const centuryMatch =
        !centuries.length || centuries.includes(personCentury);

      return nameMatch && sexMatch && centuryMatch;
    });

    if (!sort) {
      return filteredPeople;
    }

    return [...filteredPeople].sort((personA, personB) => {
      const key = sort as keyof Person;

      const valueA = personA[key];
      const valueB = personB[key];

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return order === 'asc' ? valueA - valueB : valueB - valueA;
      }

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return order === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return 0;
    });
  }, [people, query, sex, centuries, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && !error && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                query={query}
                onQueryChange={handleQueryChange}
                sex={sex}
                centuries={centuries}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!loading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && !error && people.length > 0 && (
                <PeopleTable
                  people={visiblePeople}
                  selectedSlug={slug || ''}
                  order={order}
                  sort={sort}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
