import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';

export const PeoplePage = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [noPeople, setNoPeople] = useState(false);
  const [filtredPeople, setFiltredPeople] =
    useState<Person[]>(peopleFromServer);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(people => {
        if (!people.length) {
          setNoPeople(true);
        } else {
          setPeopleFromServer(people);
        }
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filteredPeoples = peopleFromServer;

    const query = searchParams.get('query') || '';
    const sex = searchParams.get('sex') || '';
    const centuries = searchParams.getAll('centuries') || [];

    if (sex) {
      filteredPeoples = filteredPeoples.filter(
        (person: Person) => person.sex === sex,
      );
    }

    if (centuries.length) {
      filteredPeoples = filteredPeoples.filter((person: Person) => {
        return centuries.includes(person.born.toString().slice(0, 2));
      });
    }

    if (query !== '') {
      filteredPeoples = filteredPeoples.filter((person: Person) => {
        return (
          person.name.toLowerCase().includes(query.toLowerCase()) ||
          person.fatherName?.toLowerCase().includes(query.toLowerCase()) ||
          person.motherName?.toLowerCase().includes(query.toLowerCase())
        );
      });
    }

    setFiltredPeople(filteredPeoples);
  }, [searchParams, peopleFromServer]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!error && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {noPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!noPeople && !error && !loading && (
                <PeopleTable people={filtredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
