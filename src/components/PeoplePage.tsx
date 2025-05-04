import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { SortName, SortOrder } from '../types/SortTypes';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filteredPeople, setFilteredPeople] = useState<Person[] | []>([]);

  const [searchParams] = useSearchParams();
  const filteredSearchParams = new URLSearchParams(searchParams);

  const sortName = (filteredSearchParams.get('sort') as SortName) || '';
  const orderName = (filteredSearchParams.get('order') as SortOrder) || '';

  const filteredePeople = (people: Person[], searchParams: URLSearchParams) => {
    const filtered = [...people]
      .filter(person => {
        if (searchParams.has('query')) {
          const query = searchParams.get('query');
          return Object.values(person).some(value => {
            if (typeof value === 'string') {
              return query && value.toLowerCase().includes(query.toLowerCase());
            }
            return false;
          });
        }
        return true;
      })
      .filter(person => {
        if (searchParams.has('sex')) {
          const sex = searchParams.get('sex');
          return person.sex === sex;
        }
        return true;
      })
      .filter(person => {
        if (searchParams.has('centuries')) {
          const centuries = searchParams.getAll('centuries');
          for (let century of centuries) {
            if (Math.ceil(+person.born / 100) === +century) {
              return true;
            }
          }
          return false;
        }
        return true;
      });

    return filtered;
  };

  const makeFullPeopleInfo = (peopleParams: Person[]) => {
    const convertedPeopleObjects = peopleParams.reduce<Record<string, Person>>(
      (acc, person) => {
        return {
          ...acc,
          [person.name]: person,
        };
      },
      {},
    );

    return peopleParams.map(person => {
      return {
        ...person,
        mother: person.motherName
          ? convertedPeopleObjects[person.motherName] || person.motherName
          : null,
        father: person.fatherName
          ? convertedPeopleObjects[person.fatherName] || person.fatherName
          : null,
      };
    });
  };

  const sortedPeople = (sortName: SortName, sortOrder: SortOrder) => {
    if (sortName === '' || sortOrder === '') {
      setFilteredPeople(filteredePeople(people, filteredSearchParams));
      return;
    }

    if (sortOrder === 'desc') {
      setFilteredPeople(prevPeople => {
        return [...prevPeople].reverse();
      });
    }

    setFilteredPeople(prevPeople => {
      return [...prevPeople].sort((a, b) => {
        if (
          (sortName === 'name' || sortName === 'sex') &&
          sortOrder === 'asc'
        ) {
          return a[sortName].localeCompare(b[sortName]);
        } else if (typeof sortName === 'number' && sortOrder === 'asc') {
          return a.born - b.born;
        } else if (sortName === 'died') {
          return a.died - b.died;
        }
        return 0;
      });
    });
  };

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => {
        setPeople(makeFullPeopleInfo(data));
        setFilteredPeople(makeFullPeopleInfo(data));
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setFilteredPeople(filteredePeople(people, filteredSearchParams));
  }, [searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && <p data-cy="peopleLoadingError">{error}</p>}

              {!loading && !error && filteredPeople.length < 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!filteredPeople.length ? (
                <p>There are no people matching the current search criteria</p>
              ) : (
                <PeopleTable
                  people={filteredPeople}
                  sortedPeople={sortedPeople}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
