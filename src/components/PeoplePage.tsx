import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

function getVisiblePeople(
  peopleWithParents: Person[],
  filterSex: string,
  query: string,
  centuries: number[],
) {
  let peopleForWork = peopleWithParents.filter(person => {
    switch (filterSex) {
      case 'm':
        return person.sex === 'm';
      case 'f':
        return person.sex === 'f';
      case '':
      default:
        return true;
    }
  });

  if (query) {
    peopleForWork = peopleForWork.filter(person => {
      const normalizedQuery = query.trim().toLowerCase();

      return (
        person.name.toLowerCase().includes(normalizedQuery) ||
        person.motherName?.toLowerCase().includes(normalizedQuery) ||
        person.fatherName?.toLowerCase().includes(normalizedQuery)
      );
    });
  }

  if (centuries.length) {
    peopleForWork = peopleForWork.filter(person => {
      const birthCentury = Math.ceil(person.born / 100);

      return centuries.includes(birthCentury);
    });
  }

  return peopleForWork;
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterSex, setFilterSex] = useState('');
  const [query, setQuery] = useState('');
  const [centuries, setCenturies] = useState<number[]>([]);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(peopleFromApi => {
        setPeople(peopleFromApi);
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  const getParent = (name: string | null) => {
    return people.find(parent => parent.name === name);
  };

  const peopleWithParents = people.map(person => {
    const mother = getParent(person.motherName);
    const father = getParent(person.fatherName);

    return { ...person, mother, father };
  });

  const visiblePeople = getVisiblePeople(
    peopleWithParents,
    filterSex,
    query,
    centuries,
  );

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              setFilterSex={setFilterSex}
              setQuery={setQuery}
              setCenturies={setCenturies}
              filterSex={filterSex}
              centuries={centuries}
            />
          </div>

          <div className="column">
            {/* <p>There are no people matching the current search criteria</p> */}

            <PeopleTable
              people={visiblePeople}
              loading={loading}
              errorMessage={errorMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
