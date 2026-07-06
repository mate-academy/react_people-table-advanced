import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState('');
  const query = searchParams.get('query')?.toLowerCase() || '';
  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');
  const selectedCenturies = searchParams.getAll('centuries');
  const selectedSex = searchParams.get('sex');

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const data = await getPeople();

        setPeople(data);
      } catch (error) {
        setHasError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  const visiblePeople = people.filter(person => {
    let matchesQuery = true;

    if (query) {
      const normalizedName = person.name.toLowerCase();
      const normalizedMother = (person.motherName || '').toLowerCase();
      const normalizedFather = (person.fatherName || '').toLowerCase();

      matchesQuery =
        normalizedName.includes(query) ||
        normalizedMother.includes(query) ||
        normalizedFather.includes(query);
    }

    let matchesCentury = true;

    if (selectedCenturies.length > 0) {
      const personCenturyStr = String(Math.ceil(person.born / 100));

      matchesCentury = selectedCenturies.includes(personCenturyStr);
    }

    let matchesSex = true;

    if (selectedSex) {
      matchesSex = person.sex === selectedSex;
    }

    return matchesQuery && matchesCentury && matchesSex;
  });

  let sortedPeople = visiblePeople;

  if (sortField) {
    sortedPeople = [...visiblePeople].sort(
      (personA: Person, personB: Person) => {
        const valueA = personA[sortField as keyof Person];
        const valueB = personB[sortField as keyof Person];

        if (sortField === 'born' || sortField === 'died') {
          const numA = Number(valueA);
          const numB = Number(valueB);

          return sortOrder === 'desc' ? numB - numA : numA - numB;
        }

        const result = String(valueA).localeCompare(String(valueB));

        if (sortOrder === 'desc') {
          return result * -1;
        }

        return result;
      },
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return <p data-cy="peopleLoadingError">Something went wrong</p>;
  }

  if (people.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

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
              {visiblePeople.length === 0 ? (
                <p>There are no people matching the current search criteria</p>
              ) : (
                <PeopleTable people={sortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
