import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [peopleMessage, setPeopleMessage] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((response) => {
        setPeople(response);

        if (response.length === 0) {
          setPeopleMessage(true);
        }
      })

      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const displayedPeople = () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    let filteredPeople = [...people];
    const centuries = searchParams.getAll('centuries') || [];
    const gender = searchParams.get('sex') || '';
    const query = searchParams.get('query') || '';

    filteredPeople = centuries.length > 0
      ? filteredPeople.filter(person => centuries
        .includes((Math.ceil(Number(person.born) / 100)).toString()))
      : filteredPeople;

    filteredPeople = gender
      ? filteredPeople.filter(person => person.sex === gender)
      : filteredPeople;

    filteredPeople = query
      ? filteredPeople.filter(person => (
        person.name.toLowerCase().includes(query.toLowerCase()))
        || person.motherName?.toLocaleLowerCase()
          .includes(query.toLocaleLowerCase())
        || person.fatherName?.toLocaleLowerCase()
          .includes(query.toLocaleLowerCase()))
      : filteredPeople;

    const sort = searchParams.get('sort');

    if (sort) {
      if (sort === 'born' || sort === 'died') {
        filteredPeople.sort((a, b) => {
          return a[sort] - b[sort];
        });
      }

      if (sort === 'name' || sort === 'sex') {
        filteredPeople.sort((a, b) => {
          return a[sort].localeCompare(b[sort]);
        });
      }
    }

    const order = searchParams.get('order');

    if (order) {
      filteredPeople.reverse();
    }

    return filteredPeople;
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length > 0
              && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {peopleMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!displayedPeople() && (
                <p>There are no people matching the current search criteria</p>
              )}

              {people.length > 0 && <PeopleTable people={displayedPeople()} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
