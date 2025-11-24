import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);

  const query = searchParams.get('query');

  useEffect(() => {
    setLoading(true);
    setErrors(false);

    getPeople()
      .then(data => {
        let filtered = [...data];

        if (query) {
          const q = query.toLocaleLowerCase();

          filtered = filtered.filter(
            p =>
              p.name.toLowerCase().includes(q) ||
              (p.fatherName && p.fatherName.toLocaleLowerCase().includes(q)) ||
              (p.motherName && p.motherName.toLocaleLowerCase().includes(q)),
          );
        }

        const sex = searchParams.get('sex');

        if (sex) {
          filtered = filtered.filter(p => p.sex === sex);
        }

        const centuries = searchParams.getAll('centuries');

        if (centuries.length > 0) {
          filtered = filtered.filter(p => {
            const century = Math.floor(p.born / 100) + 1;

            return centuries.includes(String(century));
          });
        }

        const sortField = searchParams.get('sort');
        const order = searchParams.get('order');

        if (sortField) {
          filtered.sort((a, b) => {
            let valA = a[sortField as keyof Person] ?? '';
            let valB = b[sortField as keyof Person] ?? '';

            if (typeof valA === 'string' && typeof valB === 'string') {
              valA = valA.toLocaleLowerCase();
              valB = valB.toLocaleLowerCase();
            }

            if (valA < valB) {
              return order === 'desc' ? 1 : -1;
            }

            if (valA > valB) {
              return order === 'desc' ? -1 : 1;
            }

            return 0;
          });
        }

        setPeople(filtered);
      })
      .catch(() => setErrors(true))
      .finally(() => setLoading(false));
  }, [searchParams, query]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {errors && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loading && !errors && people.length === 0 && query && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loading && !errors && people.length === 0 && !query && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && !errors && people.length > 0 && (
                <PeopleTable
                  people={people}
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
