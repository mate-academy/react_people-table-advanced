import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { SortType } from '../types/sortType';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();

  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
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
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const filterSex = searchParams.get('sex');
  const query = searchParams.get('query')?.trim().toLocaleLowerCase();
  const centuries = searchParams.getAll('centuries');

  const preparedPeople = () => {
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
        case SortType.Name:
        {
          prepared.sort((a, b) => a.name.localeCompare(b.name));
          break;
        }

        case SortType.Sex:
        {
          prepared.sort((a, b) => a.sex.localeCompare(b.sex));
          break;
        }

        case SortType.Born: {
          prepared.sort((a, b) => a.born - b.born);
          break;
        }

        case SortType.Died: {
          prepared.sort((a, b) => a.died - b.died);
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
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}
              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}
              {people.length === 0 && !error && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {query && preparedPeople().length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}
              {people.length > 0 && (
                <PeopleTable people={preparedPeople()} slugSelected={slug} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
