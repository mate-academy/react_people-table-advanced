import React, { useEffect, useMemo, useState } from 'react';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { slug } = useParams<{ slug: string }>();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const loadPeople = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        const data = await getPeople();

        setPeople(data);
      } catch (err) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, []);

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const filteredAndSortedPeople = useMemo(() => {
    let processedPeople = people || [];

    const currentQuery = searchParams.get('query')?.toLowerCase().trim() || '';

    if (currentQuery) {
      processedPeople = processedPeople.filter(person => {
        const nameMatch = person.name.toLowerCase().includes(currentQuery);
        const motherMatch = (person.motherName ?? '')
          .toLowerCase()
          .includes(currentQuery);
        const fatherMatch = (person.fatherName ?? '')
          .toLowerCase()
          .includes(currentQuery);

        return nameMatch || motherMatch || fatherMatch;
      });
    }

    const currentSex = searchParams.get('sex');

    if (currentSex) {
      processedPeople = processedPeople.filter(
        person => person.sex === currentSex,
      );
    }

    const selectedCenturies = searchParams.getAll('centuries').map(Number);

    if (selectedCenturies.length > 0) {
      processedPeople = processedPeople.filter(person => {
        const bornCentury = Math.floor(person.born / 100) + 1;

        return selectedCenturies.includes(bornCentury);
      });
    }

    if (currentSort && currentOrder) {
      const sortedPeople = [...processedPeople];

      sortedPeople.sort((person1, person2) => {
        const a = person1[currentSort as keyof Person];
        const b = person2[currentSort as keyof Person];

        let comparison = 0;

        if (typeof a === 'number' && typeof b === 'number') {
          comparison = a - b;
        } else if (typeof a === 'string' && typeof b === 'string') {
          comparison = a.localeCompare(b);
        }

        return currentOrder === 'desc' ? comparison * -1 : comparison;
      });

      processedPeople = sortedPeople;
    }

    return processedPeople;
  }, [people, searchParams, currentSort, currentOrder]);

  const selectedPerson = people?.find(person => {
    const personSlug = `${person.name.replace(/\s+/g, '-').toLowerCase()}-${person.born}`;

    return personSlug === slug;
  });

  const selectedName = selectedPerson ? selectedPerson.name : null;

  const handleSortChange = (field: string) => {
    const params = new URLSearchParams(searchParams);

    if (currentSort !== field) {
      params.set('sort', field);
      params.set('order', 'asc');
    } else if (currentOrder === 'asc') {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  };

  const noPeopleFound =
    !isLoading &&
    !hasError &&
    !!people?.length &&
    filteredAndSortedPeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !hasError && !!people?.length && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && !isLoading && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people?.length === 0 && !isLoading && !hasError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !hasError && !!people?.length && (
                <PeopleTable
                  people={filteredAndSortedPeople}
                  selectedName={selectedName}
                  currentSort={
                    currentSort as 'name' | 'sex' | 'born' | 'died' | null
                  }
                  currentOrder={currentOrder as 'asc' | 'desc' | null}
                  onSortChange={handleSortChange}
                />
              )}

              {noPeopleFound && (
                <p data-cy="noPeopleFoundMessage" className="has-text-info">
                  No people match the current filters.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
