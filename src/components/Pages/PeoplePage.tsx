import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

const CENTURIES = ['16', '17', '18', '19', '20'];

const sortPeople = (
  a: string | number,
  b: string | number,
  orderOfSort: string | null,
) => {
  if (typeof a === 'string' && typeof b === 'string'
  && orderOfSort === null) {
    return a.localeCompare(b);
  }

  if (typeof a === 'string' && typeof b === 'string'
  && orderOfSort === 'desc') {
    return b.localeCompare(a);
  }

  if (typeof a === 'number' && typeof b === 'number'
  && orderOfSort === null) {
    return a - b;
  }

  return (b as number) - (a as number);
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<boolean>(false);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

  const [searchParams] = useSearchParams();

  const centuries = searchParams.getAll('centuries') || CENTURIES;
  const query = searchParams.get('query') as string;
  const order = searchParams.get('order');
  const sort = searchParams.get('sort') as string;

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((response) => {
        setPeople(response);
        setDataLoaded(true);

        if (response.length === 0) {
          setMessage(true);
        }
      })
      .catch(() => {
        setError(true);
        setDataLoaded(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const peopleWithParents = people.map(person => {
    const mother = people.find(element => element.name === person.motherName);
    const father = people.find(element => element.name === person.fatherName);

    return { ...person, mother, father };
  }).filter(person => {
    if (sort === 'name') {
      return true;
    }

    if (searchParams.toString().includes('m')) {
      return person.sex === 'm';
    }

    if (searchParams.toString().includes('f')) {
      return person.sex === 'f';
    }

    return true;
  }).filter(person => {
    if (centuries.length !== 0) {
      return centuries.includes(Math.ceil(person.born / 100).toString());
    }

    return true;
  }).filter(person => {
    if (query !== null) {
      return person.name.toLowerCase().includes(query.toLowerCase())
        || person.motherName?.toLowerCase().includes(query.toLowerCase())
        || person.fatherName?.toLowerCase().includes(query.toLowerCase());
    }

    return true;
  })
    .sort((a, b) => {
      if (sort === 'name') {
        return sortPeople(a.name, b.name, order);
      }

      if (sort === 'sex') {
        return sortPeople(a.sex, b.sex, order);
      }

      if (sort === 'born') {
        return sortPeople(a.born, b.born, order);
      }

      if (sort === 'died') {
        return sortPeople(a.died, b.died, order);
      }

      return 0;
    });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {message && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && dataLoaded && peopleWithParents.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}
              {dataLoaded && peopleWithParents.length > 0 && (
                <PeopleTable people={peopleWithParents} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
