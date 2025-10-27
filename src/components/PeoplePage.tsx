import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useFilters } from '../hooks/useFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const { sex, query, centuries, sort, order } = useFilters();

  useEffect(() => {
    async function loadPeople() {
      setLoading(true);
      setError(false);
      setLoaded(false);

      try {
        const result = await getPeople();

        setPeople(result);
        setLoaded(true);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadPeople();
  }, []);

  const filtredPeople = useMemo(() => {
    let newPeople = people;

    if (sex) {
      newPeople = newPeople.filter(person => person.sex === sex);
    }

    if (query) {
      newPeople = newPeople.filter(
        person =>
          person.name.toLowerCase().includes(query.toLocaleLowerCase()) ||
          person.fatherName
            ?.toLowerCase()
            .includes(query.toLocaleLowerCase()) ||
          person.motherName?.toLowerCase().includes(query.toLocaleLowerCase()),
      );
    }

    if (centuries.length > 0) {
      newPeople = newPeople.filter(person =>
        centuries.includes(String(Math.ceil(person.born / 100))),
      );
    }

    switch (sort) {
      case 'name':
        newPeople = [...newPeople].sort((a, b) =>
          order === 'desc'
            ? b.name.localeCompare(a.name)
            : a.name.localeCompare(b.name),
        );
        break;
      case 'sex':
        newPeople = [...newPeople].sort((a, b) =>
          order === 'desc'
            ? b.sex.localeCompare(a.sex)
            : a.sex.localeCompare(b.sex),
        );
        break;
      case 'born':
        newPeople = [...newPeople].sort((a, b) =>
          order === 'desc' ? b.born - a.born : a.born - b.born,
        );
        break;
      case 'died':
        newPeople = [...newPeople].sort((a, b) =>
          order === 'desc' ? b.died - a.died : a.died - b.died,
        );
        break;
    }

    return newPeople;
  }, [people, sex, query, centuries, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!!people.length && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!people.length && !error && loaded && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!!people.length && <PeopleTable people={filtredPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
