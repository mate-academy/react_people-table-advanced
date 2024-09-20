import { PeopleFilters } from '../../components/PeopleFilters';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { ErrorMessages } from '../../constants/ErrorMessages';
import { getPeople } from '../../api';
import { useSearchParams } from 'react-router-dom';

const calculateCentury = (year: number) => {
  if (!year) {
    return null;
  }

  return Math.ceil(year / 100).toString();
};

const filterPeople = (
  people: Person[],
  filters: { sex: string; centuries: string[]; query: string },
) => {
  const { sex, centuries, query } = filters;

  return people.filter(person => {
    const personMatchesSex = !sex || person.sex === sex;
    const personMatchesCentury =
      !centuries.length ||
      centuries.includes(calculateCentury(person.born) || '');
    const personMatchesQuery =
      !query ||
      [person.name, person.motherName, person.fatherName].some(name =>
        name?.toLowerCase().includes(query.toLowerCase()),
      );

    return personMatchesSex && personMatchesCentury && personMatchesQuery;
  });
};

const sortPeople = (people: Person[], sortField: string, sortOrder: string) => {
  return [...people].sort((a, b) => {
    const fieldA = a[sortField as keyof Person];
    const fieldB = b[sortField as keyof Person];

    let comparison = 0;

    if (typeof fieldA === 'number' && typeof fieldB === 'number') {
      comparison = fieldA - fieldB;
    } else if (typeof fieldA === 'string' && typeof fieldB === 'string') {
      comparison = fieldA.localeCompare(fieldB);
    }

    return sortOrder === 'desc' ? -comparison : comparison;
  });
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorMessages | null>(null);
  const [searchParams] = useSearchParams();

  const sortField = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';
  const selectedCenturies = searchParams.getAll('centuries');
  const selectedSex = searchParams.get('sex') || '';
  const selectedQuery = searchParams.get('query') || '';

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setError(ErrorMessages.LoadPeople))
      .finally(() => setIsLoading(false));
  }, []);

  const hasFilters = selectedSex || selectedCenturies.length || selectedQuery;

  let filteredPeople = [...people];

  if (hasFilters) {
    filteredPeople = filterPeople(filteredPeople, {
      sex: selectedSex,
      centuries: selectedCenturies,
      query: selectedQuery,
    });
  }

  if (sortField) {
    filteredPeople = sortPeople(filteredPeople, sortField, sortOrder);
  }

  const isFilteredEmpty = filteredPeople.length === 0;
  const hasPeople = people.length > 0;

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p data-cy="peopleLoadingError">{error}</p>;
  }

  if (!hasPeople) {
    return <p data-cy="noPeopleMessage">{ErrorMessages.NoPeopleOnServer}</p>;
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
              {isFilteredEmpty ? (
                <p>{ErrorMessages.NoMatchingPeople}</p>
              ) : (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
