import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);

  useEffect(() => {
    setLoader(true);

    getPeople()
      .then(peop => {
        setPeople(peop);
        setError(false);
      })
      .catch(() => {
        setError(true);
        throw new Error('Cant find people');
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  function filterPeople() {
    const sex = searchParams.get('sex') || '';
    const query = searchParams.get('query')?.toLowerCase() || '';
    const centuries = searchParams.getAll('centuries');
    const sortType = searchParams.get('sort');

    let filPeople = people.filter(person => {
      const matchesSex = !sex || person.sex === sex;
      const matchesQuery = person.name.toLowerCase().includes(query);

      const matchesCenturies =
        centuries.length === 0 ||
        centuries.some(cen => {
          return +cen === Math.ceil(person.born / 100);
        });

      return matchesSex && matchesQuery && matchesCenturies;
    });

    if (sortType === 'born' || sortType === 'died') {
      filPeople = filPeople.toSorted((a, b) => a[sortType] - b[sortType]);
    } else if (sortType === 'sex' || sortType === 'name') {
      filPeople = filPeople.toSorted((a, b) =>
        a[sortType].localeCompare(b[sortType]),
      );
    }

    setFilteredPeople(filPeople);
  }

  useEffect(() => {
    filterPeople();
  }, [people, searchParams]);

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
              {loader && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {filteredPeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              <PeopleTable people={filteredPeople} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
