import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
// import { SearchParams } from '../utils/searchHelper';
import { useSearchParams } from 'react-router-dom';

// export function getSearchWith(
//   paramsToUpdate: SearchParams,
//   search?: string | URLSearchParams,
// ): string {
//   const newParams = new URLSearchParams(search);

//   Object.entries(paramsToUpdate).forEach(([key, value]) => {
//     if (value === null) {
//       newParams.delete(key);
//     } else if (Array.isArray(value)) {
//       newParams.delete(key);
//       value.forEach(part => {
//         newParams.append(key, part);
//       });
//     } else {
//       newParams.set(key, value);
//     }
//   });

//   return newParams.toString();
// }

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const [filtredPeople, setFiltredPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(data => {
        setPeople(data);
        setFiltredPeople(data);
      })
      .catch(error => {
        setHasError(true);
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!people) {
      return;
    } // чекати дані

    let result = people.slice();

    // query
    const q = (searchParams.get('query') ?? '').toString().trim().toLowerCase();

    if (q) {
      result = result.filter(person => {
        const name = (person.name ?? '').toLowerCase();
        const father = (person.fatherName ?? '').toLowerCase();
        const mother = (person.motherName ?? '').toLowerCase();

        return name.includes(q) || father.includes(q) || mother.includes(q);
      });
    }

    // sex
    const selectedSex = searchParams.get('sex');

    if (selectedSex) {
      result = result.filter(person => person.sex === selectedSex);
    }

    // centuries (наприклад)
    const centuries = searchParams.getAll('centuries');

    if (centuries.length) {
      result = result.filter(person => {
        const personCenturies = Math.ceil(+person.born / 100);

        return centuries.includes(String(personCenturies));
      });
    }

    // sort
    type SortKey = 'name' | 'sex' | 'born' | 'died';
    const sort = searchParams.get('sort') as SortKey | null;

    if (sort) {
      result = result.sort((a, b) => {
        if (Number.isFinite(a[sort])) {
          return Number(a[sort]) - Number(b[sort]);
        }

        return a[sort].toString().localeCompare(b[sort].toString());
      });
    }

    // order
    const order = searchParams.get('order');

    if (order) {
      result = result.reverse();
    }

    setFiltredPeople(result);
  }, [people, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !hasError && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {people?.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {/* <p>There are no people matching the current search criteria</p> */}

              {!isLoading && !hasError && (
                <PeopleTable people={filtredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
