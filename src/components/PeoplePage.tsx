import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types/Person';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(loadedPeople => {
        // Create a map for quick lookups by name
        const peopleByName = new Map<string, Person>();

        loadedPeople.forEach(person => {
          peopleByName.set(person.name, person);
        });

        // Populate mother and father references
        const enrichedPeople = loadedPeople.map(person => ({
          ...person,
          mother: person.motherName
            ? peopleByName.get(person.motherName)
            : undefined,
          father: person.fatherName
            ? peopleByName.get(person.fatherName)
            : undefined,
        }));

        setPeople(enrichedPeople);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  // Get search params
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  // Filter people
  const filteredPeople = people.filter(person => {
    // Filter by query (name, motherName, fatherName)
    if (query) {
      const lowerQuery = query.toLowerCase();
      const matchesName = person.name.toLowerCase().includes(lowerQuery);
      const matchesMother = person.motherName
        ?.toLowerCase()
        .includes(lowerQuery);
      const matchesFather = person.fatherName
        ?.toLowerCase()
        .includes(lowerQuery);

      if (!matchesName && !matchesMother && !matchesFather) {
        return false;
      }
    }

    // Filter by sex
    if (sex && person.sex !== sex) {
      return false;
    }

    // Filter by centuries
    if (centuries.length > 0) {
      const personCentury = Math.floor(person.born / 100);

      if (!centuries.includes(String(personCentury))) {
        return false;
      }
    }

    return true;
  });

  // Sort people
  const sortedPeople = [...filteredPeople].sort((a, b) => {
    if (!sort) {
      return 0;
    }

    let comparison = 0;

    switch (sort) {
      case 'name':
      case 'sex':
        comparison = a[sort].localeCompare(b[sort]);
        break;
      case 'born':
      case 'died':
        comparison = a[sort] - b[sort];
        break;
      default:
        return 0;
    }

    return order === 'desc' ? -comparison : comparison;
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !hasError && people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !hasError && people.length > 0 && (
                <>
                  {sortedPeople.length === 0 && (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )}

                  {sortedPeople.length > 0 && (
                    <PeopleTable people={sortedPeople} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
