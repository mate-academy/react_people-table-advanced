import React, { useEffect, useMemo, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { useParams } from 'react-router-dom';

type Status = 'initial' | 'loading' | 'loaded' | 'error';

export const PeoplePage = () => {
  const { slug } = useParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [status, setStatus] = useState<Status>('initial');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setStatus('loading');
    getPeople()
      .then(loadedPeople => {
        setPeople(loadedPeople);
        setStatus('loaded');
      })
      .catch((error: Error) => {
        setErrorMessage(error.message || 'Something went wrong');
        setStatus('error');
      });
  }, []);

  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const filteredPeople = useMemo(() => {
    return people.filter(person => {
      const matchesQuery =
        !query ||
        person.name.toLowerCase().includes(query) ||
        person.motherName?.toLowerCase().includes(query) ||
        person.fatherName?.toLowerCase().includes(query);

      const matchesSex = !sex || person.sex === sex;

      const personCentury = Math.ceil(person.born / 100).toString();
      const matchesCentury =
        centuries.length === 0 || centuries.includes(personCentury);

      return matchesQuery && matchesSex && matchesCentury;
    });
  }, [people, query, sex, centuries]);

  const sortedPeople = useMemo(() => {
    const copy = [...filteredPeople];

    if (sort) {
      copy.sort((a, b) => {
        const valA = a[sort as keyof Person];
        const valB = b[sort as keyof Person];

        if (valA === null || valB === null) {
          return 0;
        }

        if (typeof valA === 'string' && typeof valB === 'string') {
          return order === 'desc'
            ? valB.localeCompare(valA)
            : valA.localeCompare(valB);
        }

        return order === 'desc'
          ? (valB as number) - (valA as number)
          : (valA as number) - (valB as number);
      });
    }

    return copy;
  }, [filteredPeople, sort, order]);

  const handleSortChange = (field: string) => {
    let nextSort: string | null = field;
    let nextOrder: string | null = null;

    if (sort === field) {
      if (order !== 'desc') {
        nextOrder = 'desc';
      } else {
        nextSort = null;
      }
    }

    setSearchParams(
      getSearchWith(searchParams, {
        sort: nextSort,
        order: nextOrder,
      }),
    );
  };

  const isLoading = status === 'loading' || status === 'initial';
  const isLoaded = status === 'loaded';

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isLoaded && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {status === 'error' && (
                <p data-cy="peopleLoadingError"> {errorMessage}</p>
              )}

              {isLoaded &&
                (sortedPeople.length > 0 ? (
                  <PeopleTable
                    people={sortedPeople}
                    selectedSlug={slug}
                    onSortChange={handleSortChange}
                    currentSort={sort}
                    currentOrder={order}
                  />
                ) : (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
