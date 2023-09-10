import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { SortBy } from '../types/SortBy';


const findParents = (people: Person []) => {
  return people.map(person => {
    const mother = people
      .find(p => p.name === person.motherName);
    const father = people
      .find(p => p.name === person.fatherName);

    return {
      ...person,
      mother,
      father,
    };
  });
};

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person []>([]);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();
  
  const query = searchParams.get('query');
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const preparedPeople = useMemo(() => {
    const peopleWithParents = findParents(people);

    const filtered = peopleWithParents
      .filter(personData => {
        const nameContains = personData.name
          ?.toLowerCase().includes(query || '');
        const motherNameContains = personData.motherName
          ?.toLowerCase().includes(query || '');
        const fatherNameContains = personData.fatherName
          ?.toLowerCase().includes(query || '');

        return nameContains || motherNameContains || fatherNameContains;
      }).filter(person => !centuries.length
        || centuries.includes(String(Math.ceil(person.born / 100))))
      .filter(person => !sex || person.sex === sex);

    if (sort) {
      filtered.sort((a, b) => {
        switch (sort) {
          case SortBy.Name:
          case SortBy.Sex:
            return a[sort].localeCompare(b[sort]);
          case SortBy.Born:
          case SortBy.Died:
            return a[sort] - b[sort];

          default:
            return 0;
        }
      });
    }

    return order === 'desc' ? filtered.reverse() : filtered;
  }, [people, query, centuries]);

  const notMatchingSearch = !preparedPeople.length
    && !isError && !isLoading;

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong. Please try again later.
      </p>
    );
  }

  if (!people.length) {
    return (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
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
              {notMatchingSearch
               && (
                 <p>
                   There are no people matching the current search criteria
                 </p>
               )}

              <PeopleTable people={preparedPeople} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
