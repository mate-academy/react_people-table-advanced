import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import PeopleTable from './PeopleTable';
import { Person } from '../types/Person';
import { getPeople } from '../api';

const PeoplePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(fetchedPeople => {
        //eslint-disable-next-line no-console
        console.log('Fetched people:', fetchedPeople);
        setPeople(fetchedPeople);
      })

      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const query = searchParams.get('query')?.toLowerCase();
    const centuries = searchParams.getAll('centuries');
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');
    const sex = searchParams.get('sex');

    let filtered = people;

    // Filter by query
    if (query) {
      filtered = filtered.filter(person =>
        [person.name, person.motherName, person.fatherName].some(field =>
          field?.toLowerCase().includes(query),
        ),
      );
    }

    // Filter by centuries
    if (centuries.length > 0) {
      filtered = filtered.filter(person =>
        centuries.some(
          century =>
            person.born >= +century * 100 && person.born < (+century + 1) * 100,
        ),
      );
    }

    // Filter by gender
    if (sex) {
      filtered = filtered.filter(person => person.sex === sex);
    }

    // Sorting
    if (sort) {
      filtered = [...filtered].sort((a, b) => {
        const fieldA = a[sort as keyof Person] as string | number;
        const fieldB = b[sort as keyof Person] as string | number;

        if (order === 'desc') {
          return fieldA > fieldB ? -1 : 1;
        }

        return fieldA > fieldB ? 1 : -1;
      });
    }

    setFilteredPeople(filtered);
  }, [searchParams, people]);

  return (
    <div>
      <h1 className="title">People Page</h1>

      <div className="columns">
        <div className="column">
          {isLoading ? <Loader /> : <PeopleTable people={filteredPeople} />}
        </div>
        <div className="column is-one-quarter">
          {isLoading ? null : (
            <PeopleFilters
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PeoplePage;
