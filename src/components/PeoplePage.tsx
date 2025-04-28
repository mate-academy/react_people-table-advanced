import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { cloneWith, set } from 'cypress/types/lodash';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);

  const makeFullPeopleInfo = (peopleParams: Person[]) => {
    const convertedPeopleObjects = peopleParams.reduce<Record<string, Person>>(
      (acc, person) => {
        return {
          ...acc,
          [person.name]: person,
        };
      },
      {},
    );

    return peopleParams.map(person => {
      return {
        ...person,
        mother: person.motherName
          ? convertedPeopleObjects[person.motherName] || person.motherName
          : null,
        father: person.fatherName
          ? convertedPeopleObjects[person.fatherName] || person.fatherName
          : null,
      };
    });
  };

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => {
        setPeople(makeFullPeopleInfo(data));
        setFilteredPeople(makeFullPeopleInfo(data));
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filterSexPeople = (sex: string) => {
    return filteredPeople.filter(person => person.sex === sex);
  };

  const filteredBySearch = (search: string) => {
    setFilteredPeople([
      ...people.filter(person =>
        Object.values(person).some(value => {
          if (typeof value === 'string') {
            console.log(value);
            return value.toLowerCase().includes(search.toLowerCase());
          }
        }),
      ),
    ]);
  };

  const handleFilterChange = (params: any, searchParams: any) => {
    filteredBySearch(searchParams);
  };

  // const handleFilterChange = (params: any, searchParams: any) => {
  //   let newFiltered = [...people];

  //   Object.entries(searchParams).forEach(([key, value]) => {
  //     if (value === null || '') {
  //       return;
  //     } else if (Array.isArray(value)) {
  //       newFiltered = [
  //         ...newFiltered?.filter(person => {
  //           return (
  //             +person.born / 100 < +value && +person.born / 100 > +value - 1
  //           );
  //         }),
  //       ];
  //     } else if (typeof value === 'string' && typeof key === 'string') {
  //       newFiltered = [
  //         ...newFiltered?.filter((person: any) => {
  //           return (
  //             person![key].toLowerCase().includes(value.toLowerCase()) || null
  //           );
  //         }),
  //       ];
  //     }
  //   });

  //   setFilteredPeople(newFiltered || []);
  // };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters filterChange={handleFilterChange} />
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && <p data-cy="peopleLoadingError">{error}</p>}

              {!loading && !error && people.length < 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              <p>There are no people matching the current search criteria</p>

              <PeopleTable people={filteredPeople} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
