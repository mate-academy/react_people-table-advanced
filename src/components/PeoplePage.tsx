import React, { useEffect, useMemo, useState } from 'react';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { PeopleFilters } from './PeopleFilters';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [visiblePeople, setVisiblePeople] = useState<Person[]>([]);
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const activeSex = searchParams.get('sex') || null;
  const centuries = useMemo(
    () => searchParams.getAll('century').sort(),
    [searchParams],
  );
  const sortBy = searchParams.get('sort') || '';
  const currentOrder = searchParams.get('order') || '';

  const isServerEmpty = !people.length && !isLoading && !loadingError;

  const personToHighlight =
    people?.find(person => person.slug === slug) || null;

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(data => {
        setPeople(data);
        setVisiblePeople(data);
      })
      .catch(() => setLoadingError(true))
      .finally(() => setIsLoading(false));
  }, []);

  //filtering

  useEffect(() => {
    let filtered = [...people];
    // Фильтр по полу

    if (activeSex === 'm' || activeSex === 'f') {
      filtered = filtered.filter(person => person.sex === activeSex);
    }
    // Фильтр по запросу

    if (query.trim()) {
      const lowerQuery = query.toLowerCase();

      filtered = filtered.filter(
        person =>
          person.name.toLowerCase().includes(lowerQuery) ||
          person.fatherName?.toLowerCase().includes(lowerQuery) ||
          person.motherName?.toLowerCase().includes(lowerQuery),
      );
    }
    // Фильтр по century

    if (centuries.length > 0) {
      filtered = filtered.filter(person => {
        const personCentury = Math.ceil(person.born / 100);

        return centuries.includes(String(personCentury));
      });
    }

    if (sortBy === 'name') {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'sex') {
      filtered = filtered.sort((a, b) => a.sex.localeCompare(b.sex));
    } else if (sortBy === 'born') {
      filtered = filtered.sort((a, b) => a.born - b.born);
    } else if (sortBy === 'died') {
      filtered = filtered.sort((a, b) => a.died - b.died);
    }

    if (currentOrder === 'desc') {
      filtered.reverse();
    }

    setVisiblePeople(filtered);
  }, [activeSex, people, query, centuries, sortBy, currentOrder]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {loadingError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isServerEmpty && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length !== 0 && visiblePeople.length === 0 ? (
                <p>There are no people matching the current search criteria</p>
              ) : (
                <PeopleTable
                  people={people}
                  visiblePeople={visiblePeople}
                  setVisiblePeople={setVisiblePeople}
                  personToHighlight={personToHighlight}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
