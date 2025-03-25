/* eslint-disable @typescript-eslint/indent */
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';

export const PeoplePage = () => {
  const [peopleList, setPeople] = useState<Person[]>([]);
  const [loadingError, setLoadingError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSex, setSelectedSex] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCentury, setSelectedCentury] = useState<string[]>([]);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const selectedSexGet = searchParams.get('sex') || '';
  const searchQueryGet = searchParams.get('query') || '';
  const selectedCenturyGet = searchParams.getAll('century');
  const { slug } = useParams();

  const selectedPersonSlug = peopleList.find(
    person =>
      person.name.toLowerCase().replace(' ', '-').toLowerCase() ===
      slug?.toLowerCase(),
  );

  const handleRowClick = (person: Person) => {
    setSelectedPerson(person);
  };

  const getCentury = (year: number): string => {
    return Math.ceil(year / 100).toString();
  };

  useEffect(() => {
    if (selectedPersonSlug) {
      setSelectedPerson(selectedPersonSlug);
    }
  }, [selectedPersonSlug]);

  useEffect(() => {
    if (selectedSexGet) {
      setSelectedSex(selectedSexGet);
    }

    if (searchQueryGet) {
      setSearchQuery(searchQueryGet);
    }

    if (selectedCenturyGet.length > 0) {
      setSelectedCentury(selectedCenturyGet);
    }
  }, [selectedSexGet, searchQueryGet, selectedCenturyGet]);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setIsLoading(true);
        const data = await getPeople();
        const peopleWithParents = data.map(person => {
          const mother =
            data.find(p => p.name === person.motherName) || undefined;
          const father =
            data.find(p => p.name === person.fatherName) || undefined;

          return { ...person, mother, father };
        });

        setPeople(peopleWithParents);
      } catch (error) {
        setPeople([]);
        setLoadingError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  const onSexChange = (newSex: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (newSex) {
      newParams.set('sex', newSex);
    } else {
      newParams.delete('sex');
    }

    setSelectedSex(newSex);
    setSearchParams(newParams);
  };

  const onSearchChange = (newQuery: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (newQuery) {
      newParams.set('query', newQuery);
    } else {
      newParams.delete('query');
    }

    setSearchQuery(newQuery);
    setSearchParams(newParams);
  };

  const onCenturyChange = (centuries: string[]) => {
    const newParams = new URLSearchParams(searchParams);

    if (centuries.length > 0) {
      centuries.forEach(century => newParams.append('century', century));
    } else {
      newParams.delete('century');
    }

    setSelectedCentury(centuries);
    setSearchParams(newParams);
  };

  const onSortChange = (field: string) => {
    const newSortOrder =
      sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    const newParams = new URLSearchParams(searchParams);

    newParams.set('sort', field);
    newParams.set('order', newSortOrder);

    setSortField(field);
    setSortOrder(newSortOrder);
    setSearchParams(newParams);
  };

  const onResetFilters = () => {
    setSelectedSex(null);
    setSearchQuery('');
    setSelectedCentury([]);

    const newParams = new URLSearchParams();

    setSearchParams(newParams);
  };

  const filteredPeople = peopleList.filter(person => {
    const queryLower = searchQuery.toLowerCase();

    const matchesSearchQuery =
      person.name.toLowerCase().includes(queryLower) ||
      (person.motherName &&
        person.motherName.toLowerCase().includes(queryLower)) ||
      (person.fatherName &&
        person.fatherName.toLowerCase().includes(queryLower));

    const matchesSex = selectedSex ? person.sex === selectedSex : true;

    const matchesCentury = selectedCentury.length
      ? selectedCentury.includes(getCentury(Number(person.born)))
      : true;

    return matchesSearchQuery && matchesSex && matchesCentury;
  });

  const sortPeople = (people: Person[]) => {
    if (!sortField || !sortOrder) {
      return people;
    }

    const sortedPeople = [...people];

    sortedPeople.sort((a, b) => {
      const aValue = a[sortField as keyof Person];
      const bValue = b[sortField as keyof Person];

      if (aValue == null || bValue == null) {
        return 0;
      }

      if (aValue < bValue) {
        return sortOrder === 'asc' ? -1 : 1;
      }

      if (aValue > bValue) {
        return sortOrder === 'asc' ? 1 : -1;
      }

      return 0;
    });

    return sortedPeople;
  };

  const sortedPeople = sortPeople(filteredPeople);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              selectedSex={selectedSex}
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
              onSexChange={onSexChange}
              onResetFilters={onResetFilters}
              onCenturyChange={onCenturyChange}
              selectedCentury={selectedCentury}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <div data-cy="loader">Loading...</div>}

              {loadingError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !loadingError && peopleList.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading &&
                !loadingError &&
                filteredPeople.length === 0 &&
                peopleList.length > 0 && (
                  <p data-cy="noMatchingPeopleMessage">
                    There are no people matching the current search criteria
                  </p>
                )}

              <PeopleTable
                handleRowClick={handleRowClick}
                people={sortedPeople}
                onSortChange={onSortChange}
                sortField={sortField}
                sortOrder={sortOrder}
                selectedPerson={selectedPerson}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
