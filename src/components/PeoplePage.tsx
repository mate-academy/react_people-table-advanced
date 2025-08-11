import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useParams, useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query')?.toLowerCase() || '';
  const centuries = searchParams.getAll('centuries').map(Number);
  const sex = searchParams.get('sex');
  const sortBy = searchParams.get('sortBy');
  const sortOrder = searchParams.get('sortOrder');

  const filteredPeople = people.filter(p => {
    const nameMatch =
      p.name.toLowerCase().includes(query) ||
      p.fatherName?.toLowerCase().includes(query) ||
      p.motherName?.toLowerCase().includes(query);
    const centuriesMatch = () => {
      return (
        centuries.length === 0 ||
        centuries.some(century => Math.floor(p.born / 100) === century - 1)
      );
    };

    const sexMatch = !sex || p.sex === sex;

    return nameMatch && centuriesMatch() && sexMatch;
  });

  const sortedPeople = [...filteredPeople].sort((a, b) => {
    if (!sortBy) {
      return 0;
    }

    const aVal = a[sortBy as keyof Person];
    const bVal = b[sortBy as keyof Person];

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    }

    return sortOrder === 'asc'
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleSortChange = (value: string) => {
    if (sortBy === value) {
      if (sortOrder === 'asc') {
        searchParams.set('sortOrder', 'desc');
      } else {
        searchParams.delete('sortOrder');
        searchParams.delete('sortBy');
      }
    } else {
      searchParams.set('sortOrder', 'asc');
      searchParams.set('sortBy', value);
    }

    setSearchParams(searchParams);
  };

  const handleSexChange = (value: string) => {
    if (value) {
      searchParams.set('sex', value);
    } else {
      searchParams.delete('sex');
    }

    setSearchParams(searchParams);
  };

  const handleCenturiesChange = (value: string) => {
    const century = Number(value);
    const currentCenturies = searchParams.getAll('centuries').map(Number);

    const isSelected = currentCenturies.includes(century);

    if (isSelected) {
      const updated = currentCenturies.filter(c => c !== century);

      searchParams.delete('centuries');

      updated.forEach(c => searchParams.append('centuries', c.toString()));
    } else {
      searchParams.append('centuries', century.toString());
    }

    setSearchParams(searchParams);
  };

  const clearCenturies = () => {
    searchParams.delete('centuries');
    setSearchParams(searchParams);
  };

  const handleQueryChange = (value: string) => {
    if (value) {
      searchParams.set('query', value);
    } else {
      searchParams.delete('query');
    }

    setSearchParams(searchParams);
  };

  return (
    <>
      <main className="section">
        <div className="container">
          <div className="block">
            <h1 className="title">People Page</h1>
            <div className="columns is-desktop is-flex-direction-row-reverse">
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters
                  sex={sex}
                  searchQuery={query}
                  centuries={centuries}
                  handleNameChange={handleQueryChange}
                  handleSexChange={handleSexChange}
                  handleCenturiesChange={handleCenturiesChange}
                  clearCenturies={clearCenturies}
                />
              </div>

              <div className="column">
                <div className="box table-container">
                  {isLoading && <Loader />}

                  {errorMessage === 'Something went wrong' && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      Something went wrong
                    </p>
                  )}

                  {people.length === 0 && !isLoading && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {people.length > 0 && sortedPeople.length === 0 && (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )}

                  {sortedPeople.length > 0 && (
                    <PeopleTable
                      people={sortedPeople}
                      selectedSlug={slug}
                      sortBy={sortBy}
                      sortOrder={sortOrder}
                      handleSortChange={handleSortChange}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
