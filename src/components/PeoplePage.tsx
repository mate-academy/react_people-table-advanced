import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import React from 'react';
import { Person } from '../types';
import { useOutletContext, useSearchParams } from 'react-router-dom';

type ContextType = {
  loader: boolean;
  errorMessage: boolean;
  people: Person[];
};

export const PeoplePage: React.FC = () => {
  const { loader, errorMessage, people } = useOutletContext<ContextType>();
  const [searchParams] = useSearchParams();

  const sortFunctions: Record<string, (a: Person, b: Person) => number> = {
    name: (a, b) => a.name.localeCompare(b.name),
    sex: (a, b) => a.sex.localeCompare(b.sex),
    born: (a, b) => a.born - b.born,
    died: (a, b) => a.died - b.died,
  };

  const filterPeople = () => {
    const gender = searchParams.getAll('sex');
    const century = searchParams.getAll('centuries');
    const querry = searchParams.get('querry') || '';
    const sort = searchParams.get('sort') || '';
    const order = searchParams.get('order') || '';

    const filteredPeople = people.filter(person => {
      const filteredByCentury =
        century.length === 0 ||
        century.includes(`${Math.floor(person.born / 100 + 1)}`);
      const filteredByGender =
        gender.length === 0 || gender.includes(person.sex);
      const filteredByQuerry =
        querry === '' ||
        person.name.toLowerCase().includes(querry) ||
        person.fatherName?.toLowerCase().includes(querry) ||
        person.motherName?.toLowerCase().includes(querry);

      return filteredByCentury && filteredByGender && filteredByQuerry;
    });

    if (sort && sortFunctions[sort]) {
      filteredPeople.sort((a, b) =>
        order === 'desc'
          ? sortFunctions[sort](b, a)
          : sortFunctions[sort](a, b),
      );
    }

    return filteredPeople;
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loader && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loader && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people.length === 0 && !loader && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {filterPeople().length === 0 && !loader && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loader && filterPeople().length !== 0 && (
                <PeopleTable people={filterPeople()} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
