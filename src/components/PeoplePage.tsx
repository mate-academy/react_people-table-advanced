import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sortField = searchParams.get('sort');
  const isReversed = searchParams.get('order') === 'desc';

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const preparedPeople = people.map(person => ({
    ...person,
    mother: people.find(p => p.name === person.motherName),
    father: people.find(p => p.name === person.fatherName),
  }));

  const filterPeople = () => {
    let filteredPeople = [...preparedPeople];

    if (query) {
      filteredPeople = filteredPeople.filter(person => {
        return person.name.toLowerCase().includes(query.toLowerCase())
        || person.fatherName?.toLowerCase().includes(query.toLowerCase())
        || person.motherName?.toLowerCase().includes(query.toLowerCase());
      });
    }

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (centuries.length) {
      filteredPeople = filteredPeople.filter(person => {
        return centuries.includes(Math.ceil(person.born / 100).toString());
      });
    }

    return filteredPeople;
  };

  const readyPeople = filterPeople();

  if (sortField) {
    readyPeople.sort((a, b) => {
      switch (sortField) {
        case 'name':
        case 'sex':
          return a[sortField].localeCompare(b[sortField]);

        case 'born':
        case 'died':
          return a[sortField] - b[sortField];

        default:
          return 0;
      }
    });

    if (isReversed) {
      readyPeople.reverse();
    }
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && !error && people.length !== 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!loading && !error && (people.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <PeopleTable people={readyPeople} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
