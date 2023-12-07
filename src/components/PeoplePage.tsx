import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [searchParams] = useSearchParams();

  const { slug } = useParams();

  useEffect(() => {
    setIsLoader(true);
    getPeople()
      .then(response => {
        const peopleServer: Person[] = response.map(person => {
          const mother = response
            .find(item => item.name === person.motherName);
          const father = response
            .find(item => item.name === person.fatherName);

          return ({
            ...person,
            mother,
            father,
          });
        });

        return peopleServer;
      })
      .then(preparedPeople => setPeople(preparedPeople))
      .catch(() => setErrorMessage(true))
      .finally(() => setIsLoader(false));
  }, []);

  const preparedPeople = () => {
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');
    const filterSex = searchParams.get('sex');
    const query = searchParams.get('query')?.trim().toLocaleLowerCase();
    const centuries = searchParams.getAll('centuries');
    let prepared = [...people];

    if (query) {
      prepared = prepared.filter(elem => elem.name.toLowerCase()
        .includes(query)
        || elem.motherName?.toLowerCase().includes(query)
        || elem.fatherName?.toLowerCase().includes(query));
    }

    if (filterSex) {
      prepared = prepared.filter(elem => elem.sex === filterSex);
    }

    if (centuries && centuries.length > 0) {
      prepared = prepared.filter(elem => (
        centuries?.includes(Math.ceil(elem.born / 100).toString())));
    }

    if (sort) {
      switch (sort) {
        case 'name':
        case 'sex':
        {
          prepared.sort((a, b) => a[sort].localeCompare(b[sort]));
          break;
        }

        case 'born':
        case 'died': {
          prepared.sort((a, b) => a[sort] - b[sort]);
          break;
        }

        default:
      }
    }

    if (order) {
      prepared.reverse();
    }

    return prepared;
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoader && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoader && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {(!isLoader && !errorMessage && !people.length) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {(!people.length && !isLoader) && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!!people.length && (
                <PeopleTable people={preparedPeople()} slugSelected={slug} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
