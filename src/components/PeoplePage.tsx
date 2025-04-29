import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchParams] = useSearchParams();

  console.log(searchParams.toString());

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

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => {
        setPeople(makeFullPeopleInfo(data));
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredBySearch = (search: string) => {
    const filtered = [
      ...people.filter(person =>
        Object.values(person).some(value => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(search.toLowerCase());
          }
        }),
      ),
    ];
    return filtered;
  };

  const handleFilterChange = (params: any, searchParams: any) => {
    filteredBySearch(searchParams);
  };

  const filteredPeople = () => {
    if (searchParams.size === 0) {
      return people;
    }
if(searchParams.has('query')) {
      const query = searchParams.get('query') || '';
      return filteredBySearch(query);
    }

  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length > 0 && (
              <PeopleFilters filterChange={handleFilterChange} />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && <p data-cy="peopleLoadingError">{error}</p>}

              {!loading && !error && people.length < 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              <p>There are no people matching the current search criteria</p>

              <PeopleTable people={people} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
