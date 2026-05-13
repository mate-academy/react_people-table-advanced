import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const sex = searchParams.get('sex');
  const query = searchParams.get('query')?.toLowerCase().trim() || '';
  const centuries = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort') as keyof Person | null;
  const sortOrder = searchParams.get('order');

  const visiblePeople = people.filter(person => {
    if (sex && person.sex !== sex) {
      return false;
    }

    if (query) {
      const matchName = person.name.toLowerCase().includes(query);
      const matchMother = person.motherName?.toLowerCase().includes(query);
      const matchFather = person.fatherName?.toLowerCase().includes(query);

      if (!matchName && !matchMother && !matchFather) {
        return false;
      }
    }

    if (centuries.length > 0) {
      const personCentury = Math.ceil(person.born / 100).toString();

      if (!centuries.includes(personCentury)) {
        return false;
      }
    }

    return true;
  });

  if (sortField) {
    visiblePeople.sort((a, b) => {
      let result = 0;

      switch (sortField) {
        case 'name':
        case 'sex':
          result = String(a[sortField]).localeCompare(String(b[sortField]));
          break;
        case 'born':
        case 'died':
          result = Number(a[sortField]) - Number(b[sortField]);
          break;
      }

      return sortOrder === 'desc' ? -result : result;
    });
  }

  const showFilters = !isLoading && !hasError && people.length > 0;
  const noPeopleOnServer = !isLoading && !hasError && people.length === 0;
  const noMatch = showFilters && visiblePeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {showFilters && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {noPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {noMatch && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !hasError && visiblePeople.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
