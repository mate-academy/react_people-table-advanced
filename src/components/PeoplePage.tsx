import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [peopleLoader, setPeopleLoader] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const loadPeople = async () => {
    try {
      setError(false);
      setPeopleLoader(true);
      const load = await getPeople();

      setPeople(load);
    } catch {
      setError(true);
    }

    setPeopleLoader(false);
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const noPeopleOnServer = () => {
    return !people.length && !error && !peopleLoader;
  };

  const peopleFiltered = () => {
    let filtered = [...people];

    if (centuries.length) {
      filtered = [
        ...filtered.filter(
          person => centuries.some(
            century => {
              return Math.ceil(person.born / 100)
              === Number(century);
            },
          ),
        ),
      ];
    }

    if (query) {
      filtered = [...filtered.filter(({
        name,
        fatherName,
        motherName,
      }) => (
        name.toLowerCase().includes(query.toLowerCase())
        || fatherName?.toLowerCase().includes(query.toLowerCase())
        || motherName?.toLowerCase().includes(query.toLowerCase())
      ))];
    }

    if (sex) {
      filtered = [...filtered.filter(person => person.sex === sex)];
    }

    return filtered;
  };

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        {peopleLoader && (
          <div className="column">
            <div className="box table-container">
              <Loader />
            </div>
          </div>
        )}

        {!peopleLoader && (
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            <div className="column">
              <div className="box table-container">

                {error && !peopleLoader && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

                {noPeopleOnServer() && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                {peopleFiltered().length ? (
                  <PeopleTable people={peopleFiltered()} />
                ) : (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
};
