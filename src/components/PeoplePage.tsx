import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { SortOrder } from '../types/SortOrder';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [visiblePeople, setVisiblePeople] = useState<Person[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>({});
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  useEffect(() => {
    setIsLoading(true);
    setPeople([]);

    getPeople()
      .then(data => {
        const dataWithParents = data.map(person => {
          const foundFather = data.find(
            findingFather => findingFather.name === person.fatherName,
          );
          const foundMother = data.find(
            findingMother => findingMother.name === person.motherName,
          );

          return {
            ...person,
            mother: foundMother || undefined,
            father: foundFather || undefined,
          };
        });

        setPeople(dataWithParents);
        setVisiblePeople(dataWithParents);
        setIsError(false);
      })
      .catch(() => {
        setIsError(true);
        setPeople([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const sortPeople = (persons: Person[], order: SortOrder) => {
    const foundEntry = Object.entries(order).find(
      ([, value]) => value !== undefined,
    );

    if (!foundEntry) {
      return persons;
    }

    const [sortKey, sortDirection] = foundEntry;

    return [...persons].sort((a, b) => {
      const aValue = a?.[sortKey as keyof Person] ?? '';
      const bValue = b?.[sortKey as keyof Person] ?? '';

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };

  useEffect(() => {
    let result = [...people];

    if (sex) {
      result = result.filter(person => person.sex === sex);
    }

    if (query) {
      result = result.filter(
        person =>
          person.name.toLowerCase().includes(query.trim()) ||
          person.motherName?.toLowerCase().includes(query.trim()) ||
          person.fatherName?.toLowerCase().includes(query.trim()),
      );
    }

    if (centuries.length > 0) {
      result = result.filter(person => {
        const bornCentury = String(Math.ceil(person.born / 100) || 1);

        return centuries.includes(bornCentury);
      });
    }

    result = sortPeople(result, sortOrder);

    setVisiblePeople(prevVisiblepeople => {
      if (JSON.stringify(prevVisiblepeople) !== JSON.stringify(result)) {
        return result;
      }

      return prevVisiblepeople;
    });
  }, [sex, query, centuries, people, sortOrder]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              sex={sex}
              query={query}
              centuries={centuries}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {visiblePeople && visiblePeople.length === 0 ? (
                <p>There are no people matching the current search criteria</p>
              ) : (
                <PeopleTable
                  visiblePeople={visiblePeople}
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
