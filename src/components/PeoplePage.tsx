import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';

import { Person } from '../types/Person';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query')?.trim().toLocaleLowerCase();
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  // console.log(order);

  useEffect(() => {
    setIsLoad(true);
    getPeople()
      .then((peopleFromServer) => setPeople(peopleFromServer))
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => setIsLoad(false));
  }, []);

  const getVisiblePeople = () => {
    if (!people) {
      return [];
    }

    let visiblePeople = [...people];

    if (sex) {
      visiblePeople = visiblePeople.filter((person) => person.sex === sex);
    }

    if (query) {
      visiblePeople = visiblePeople.filter((person) => person
        .name.toLocaleLowerCase().includes(query)
        || person.motherName?.toLocaleLowerCase().includes(query)
        || person.fatherName?.toLocaleLowerCase().includes(query));
    }

    if (centuries.length > 0) {
      visiblePeople = visiblePeople.filter((person) => centuries
        ?.includes(Math.ceil(person.born / 100).toString()));
    }

    if (sort) {
      visiblePeople.sort((a, b) => {
        switch (sort) {
          case 'name':
            return a.name.localeCompare(b.name);

          case 'sex':
            return a.sex.localeCompare(b.sex);

          case 'born':
            return (a.born - b.born);

          case 'died':
            return (a.died - b.died);

          default:
            return 0;
        }
      });
    }

    if (order) {
      visiblePeople.reverse();
    }

    return visiblePeople;
  };

  // const visiblePeople = people
  //   ? people.filter((person) => (sex ? person.sex === sex : true))
  //   : [];

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoad && <Loader />}
              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}
              {people && <PeopleTable people={getVisiblePeople()} />}
              {!isLoad && !error && !people && (
                <p data-cy="noPeopleMessage">no people</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Something went wrong

// There are no people on the server

// There are no people matching the current search criteria
//
// <p data-cy="peopleLoadingError">Something went wrong</p>

// <p data-cy="noPeopleMessage">There are no people on the server</p>

// <p>There are no people matching the current search criteria</p>
