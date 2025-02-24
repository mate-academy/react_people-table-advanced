import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(data => {
        return data.map(d => {
          const mother = data.find(({ name }) => name === d.motherName);
          const father = data.find(({ name }) => name === d.fatherName);

          return { ...d, mother, father };
        });
      })
      .then(setPeople)
      .catch(setFetchError)
      .finally(() => setIsLoading(false));
  }, []);

  const peopleFiltered = useMemo(() => {
    const sex = searchParams.get('sex');
    const centuries = searchParams.getAll('centuries');
    const search = searchParams.get('search');

    return people.filter(p => {
      const matchesSex = !sex || p.sex === sex;

      const matchesCentury =
        !centuries.length ||
        centuries.includes(String(Math.floor(p.born / 100) + 1));

      const matchesSearch =
        !search ||
        p.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());

      return matchesSex && matchesCentury && matchesSearch;
    });
  }, [people, searchParams]);

  const peopleSorted = useMemo(() => {
    const sortBy = searchParams.get('sort');
    const sortDirection = searchParams.get('order');

    const sorted = [...peopleFiltered];

    switch (sortBy) {
      case 'name':
      case 'sex':
        return sorted.sort((a, b) =>
          sortDirection
            ? b[sortBy].localeCompare(a[sortBy])
            : a[sortBy].localeCompare(b[sortBy]),
        );
      case 'born':
      case 'died':
        return sorted.sort((a, b) =>
          sortDirection ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy],
        );
      default:
        return sorted;
    }
  }, [peopleFiltered, searchParams]);

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
              {fetchError ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : null}

              {!isLoading && !people.length ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : null}

              {!people.length && false ? (
                <p>There are no people matching the current search criteria</p>
              ) : null}

              {isLoading ? <Loader /> : <PeopleTable people={peopleSorted} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
