import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { PeopleFilters } from '../PeopleFilters/PeopleFilters';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [peopleToRender, setPeopleToRender] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query');

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => {
        setPeople(data);
        setPeopleToRender(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let peopleProcessed = [...people];

    if (sex) {
      peopleProcessed = peopleProcessed.filter(person => person.sex === sex);
    }

    if (query) {
      peopleProcessed = peopleProcessed.filter(person => {
        return (
          person.name.toLowerCase().includes(query) ||
          person.motherName?.toLowerCase().includes(query) ||
          person.fatherName?.toLowerCase().includes(query)
        );
      });
    }

    if (centuries.length) {
      peopleProcessed = peopleProcessed.filter(person => {
        return centuries.some(
          century => +century === Math.ceil(person.born / 100),
        );
      });
    }

    if (sort) {
      switch (sort) {
        case 'name':
          peopleProcessed = [...peopleProcessed].sort((person1, person2) =>
            person1.name.localeCompare(person2.name),
          );
          break;
        case 'sex':
          peopleProcessed = [...peopleProcessed].sort((person1, person2) =>
            person1.sex.localeCompare(person2.sex),
          );
          break;
        case 'born':
          peopleProcessed = [...peopleProcessed].sort(
            (person1, person2) => person1.born - person2.born,
          );
          break;
        case 'died':
          peopleProcessed = [...peopleProcessed].sort(
            (person1, person2) => person1.died - person2.died,
          );
          break;
        default:
          break;
      }
    }

    if (order) {
      peopleProcessed = peopleProcessed.reverse();
    }

    setPeopleToRender(peopleProcessed);
  }, [sort, order, sex, query, centuries, people]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!loading && error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!people.length && !error && !loading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length && !peopleToRender.length ? (
                <p>There are no people matching the current search criteria</p>
              ) : (
                !loading && <PeopleTable people={peopleToRender} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
