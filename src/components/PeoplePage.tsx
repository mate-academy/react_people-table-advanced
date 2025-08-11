import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
import { SortField } from '../types/SortField';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);

  const [noMatching, setNoMatching] = useState(false);

  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort') as SortField;
  const sortOrder = searchParams.get('order');

  function getPeopleTable() {
    setIsLoading(true);

    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setHasErrors(true);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(getPeopleTable, []);

  const filteredPeople = people.filter((person: Person) => {
    const query = searchParams.get('query')?.toLowerCase() || '';
    const sex = searchParams.get('sex');
    const centuries = searchParams.getAll('centuries');

    const nameMatch =
      !query ||
      person.name.toLowerCase().includes(query) ||
      (person.motherName && person.motherName.toLowerCase().includes(query)) ||
      (person.fatherName && person.fatherName.toLowerCase().includes(query));

    const sexMatch = !sex || person.sex === sex;

    const centuryMatch =
      centuries.length === 0 ||
      centuries.includes(String(Math.floor(person.born / 100) + 1));

    return nameMatch && sexMatch && centuryMatch;
  });

  useEffect(() => {
    setNoMatching(filteredPeople.length === 0);
  }, [filteredPeople]);

  const sortedPeople = [...filteredPeople].sort((a, b) => {
    if (!sortField) {
      return 0;
    }

    const isDesc = sortOrder === 'desc';
    const multiplier = isDesc ? -1 : 1;
    const compare =
      sortField === 'name' || sortField === 'sex'
        ? a[sortField].localeCompare(b[sortField])
        : a[sortField] - b[sortField];

    return multiplier * compare;
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !hasErrors && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : hasErrors ? (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              ) : people.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : noMatching ? (
                <p>There are no people matching the current search criteria</p>
              ) : (
                <PeopleTable peoples={sortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
