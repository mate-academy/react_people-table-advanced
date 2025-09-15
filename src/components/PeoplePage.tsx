import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries') || [];

  const linkParents = (people: Person[]): Person[] => {
    return people.map(person => ({
      ...person,
      mother: people.find(p => p.name === person.motherName) || undefined,
      father: people.find(p => p.name === person.fatherName) || undefined,
    }));
  };

  useEffect(() => {
    setLoading(true);
    setError('');
    getPeople()
      .then(peopleFromServer =>
        setPeopleFromServer(linkParents(peopleFromServer)),
      )
      .catch(() => setError('Error loading people from the server'))
      .finally(() => setLoading(false));
  }, []);

  const filterPeople = (people: Person[]): Person[] => {
    let filtered = [...people];

    if (query) {
      filtered = filtered.filter(
        person =>
          person.name.toLowerCase().includes(query.toLowerCase()) ||
          (person.motherName &&
            person.motherName.toLowerCase().includes(query.toLowerCase())) ||
          (person.fatherName &&
            person.fatherName.toLowerCase().includes(query.toLowerCase())),
      );
    }

    if (sex) {
      filtered = filtered.filter(person => person.sex === sex);
    }

    if (centuries.length > 0) {
      filtered = filtered.filter(person => {
        const personBornCentury = `${Math.ceil(person.born / 100)}`;
        const personDeadCentury = `${Math.ceil(person.died / 100)}`;

        if (
          centuries.includes(personBornCentury) ||
          centuries.includes(personDeadCentury)
        ) {
          return true;
        }
        return false;
      });
    }

    return filtered;
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && !error && <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>}

          <div className="column">
            <div className="box table-container">
              {loading ? (
                <Loader />
              ) : (
                <>
                  {error && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      {error}
                    </p>
                  )}

                  {!error && peopleFromServer.length === 0 && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {!error && peopleFromServer.length > 0 && (
                    <PeopleTable people={filterPeople(peopleFromServer)} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
