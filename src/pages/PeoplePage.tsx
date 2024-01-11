import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PersonList } from '../components/PersonList';

import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [fullPeople, setFullPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const updateFullPeople = (peopleData: Person[]) => {
    const allPeople = [...peopleData];

    allPeople.forEach((person) => {
      const newPerson = person;

      newPerson.mother = allPeople.find((p) => p.name === newPerson.motherName);
      newPerson.father = allPeople.find((p) => p.name === newPerson.fatherName);
    });

    return setFullPeople(allPeople);
  };

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then((fetchedPeople) => {
        setPeople(fetchedPeople);
        updateFullPeople(fetchedPeople);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  let filteredPeople = [...fullPeople];

  if (sex) {
    filteredPeople = filteredPeople.filter((person) => person.sex === sex);
  }

  if (query) {
    const queryNormalize = query.trim().toLowerCase();

    filteredPeople = filteredPeople.filter((person) => {
      return (
        person.name.toLowerCase().includes(queryNormalize)
        || person.motherName?.toLowerCase().includes(queryNormalize)
        || person.fatherName?.toLowerCase().includes(queryNormalize));
    });
  }

  if (centuries.length) {
    filteredPeople = filteredPeople.filter((person) => {
      return (
        centuries.includes(Math.ceil(person.born / 100).toString())
      );
    });
  }

  if (sort) {
    filteredPeople = filteredPeople.sort((a, b) => {
      switch (sort) {
        case 'Name':
          return a.name.localeCompare(b.name);
        case 'Sex':
          return a.sex.localeCompare(b.sex);
        case 'Born':
          return a.born - b.born;
        case 'Died':
          return a.died - b.died;
        default:
          return 0;
      }
    });

    if (order === 'desc') {
      filteredPeople.reverse();
    }
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!!people.length && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error
                && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

              {!loading && !error && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!!people.length && <PersonList people={filteredPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
