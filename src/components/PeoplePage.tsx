/* eslint-disable @typescript-eslint/indent */
import { PeopleFilters } from './PeopleFilters';
import React, { useEffect, useState } from 'react';
import PeopleTable from './PeopleTable';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';

function findParents(people: Person[]) {
  return people.map(person => {
    const findFather = people.find(el => person.fatherName === el.name);
    const findMother = people.find(el => person.motherName === el.name);

    if (findFather && findMother) {
      return { ...person, father: findFather, mother: findMother };
    }

    if (findFather) {
      return { ...person, father: findFather };
    }

    if (findMother) {
      return { ...person, mother: findMother };
    }

    return person;
  });
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    getPeople()
      .then(res => {
        setPeople(findParents(res));
      })
      .catch(() => {
        setErro(true);
      })
      .finally(() => setLoading(true));
  }, []);

  if (people?.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  const filteredPeople = people
    ?.filter(person => {
      const sexfilter = sex === '' ? true : person.sex === sex;

      const queryfilter = person.name
        .toLowerCase()
        .includes(query.toLowerCase());
      const centuriesfilter =
        centuries.length === 0
          ? true
          : centuries.includes(
              String(parseInt(person.born.toString().slice(0, 2)) + 1),
            );

      return sexfilter && queryfilter && centuriesfilter;
    })
    .sort((a: Person, b: Person): number => {
      if (order !== '') {
        if (sort === 'name') {
          return b.name.localeCompare(a.name);
        }

        if (sort === 'sex') {
          return b.sex.localeCompare(a.sex);
        }

        if (sort === 'born') {
          return b.born - a.born;
        }

        if (sort === 'died') {
          return b.died - a.died;
        }
      }

      if (sort === 'name') {
        return a.name.localeCompare(b.name);
      }

      if (sort === 'sex') {
        return a.sex.localeCompare(b.sex);
      }

      if (sort === 'born') {
        return a.born - b.born;
      }

      if (sort === 'died') {
        return a.died - b.died;
      }

      return 1;
    });

  return (
    <>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {loading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                sex={sex}
                centuries={centuries}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {!loading ? (
                <Loader />
              ) : filteredPeople?.length !== 0 ? (
                <PeopleTable
                  people={filteredPeople}
                  erro={erro}
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                />
              ) : (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
