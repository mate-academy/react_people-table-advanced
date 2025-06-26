import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useState, useEffect } from 'react';
import { Person } from '../types';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';

const filterPeople = (
  people: Person[],
  query: string,
  selectedCenturies: string[],
  sex: string | null,
): Person[] => {
  const normalizedQuery = query.trim().toLowerCase();

  return people.filter(person => {
    if (normalizedQuery) {
      const fields = [person.name, person.fatherName, person.motherName];
      const matchesQuery = fields.some(f =>
        f?.toLowerCase().includes(normalizedQuery),
      );

      if (!matchesQuery) {
        return false;
      }
    }

    if (selectedCenturies.length > 0) {
      const century = Math.floor(person.born / 100) + 1;

      if (!selectedCenturies.includes(century.toString())) {
        return false;
      }
    }

    if (sex && person.sex !== sex) {
      return false;
    }

    return true;
  });
};

const sortPeople = (
  people: Person[],
  sortBy: string | null,
  sortOrder: string | null,
) => {
  const sorted = [...people];

  switch (sortBy) {
    case 'name':
      sorted.sort((a, b) => {
        return sortOrder === 'desc'
          ? b.name.localeCompare(a.name)
          : a.name.localeCompare(b.name);
      });
      break;

    case 'sex':
      sorted.sort((a, b) => {
        return sortOrder === 'desc'
          ? b.sex.localeCompare(a.sex)
          : a.sex.localeCompare(b.sex);
      });
      break;

    case 'born':
      sorted.sort((a, b) => {
        return sortOrder === 'desc' ? b.born - a.born : a.born - b.born;
      });
      break;

    case 'died':
      sorted.sort((a, b) => {
        return sortOrder === 'desc' ? b.died - a.died : a.died - b.died;
      });
      break;

    default:
      break;
  }

  return sorted;
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort');
  const sortOrder = searchParams.get('order');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');

  const filteredPeople = filterPeople(people, query, centuries, sex);
  const preparedPeople = sortPeople(filteredPeople, sortBy, sortOrder);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setHasError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const showNoMatchesMessage =
    !isLoading && !hasError && people.length > 0 && preparedPeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !hasError && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

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

              {showNoMatchesMessage && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !hasError && preparedPeople.length > 0 && (
                <PeopleTable
                  people={preparedPeople}
                  selectedSlug={slug}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
