import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

type Props = {
  activePerson: Person | null,
  setActivePerson(person: Person): void,
};

export const PeoplePage: React.FC<Props> = ({
  activePerson,
  setActivePerson,
}) => {
  const [people, setPeople] = useState<Person[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex' || '');
  const centuries = searchParams.getAll('centuries').map(century => +century);
  const query = searchParams.get('query' || '');
  const sort = searchParams.get('sort' || '') as keyof Person;
  const order = searchParams.get('order' || '');
  let filteredPeople: Person[];
  const getPersons = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await getPeople();

      setPeople(response);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSearch = (params: {
    [key: string]: number[] | string[] | string | null
  }) => {
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        searchParams.delete(key);
      } else if (Array.isArray(value)) {
        searchParams.delete(key);

        value.forEach(part => {
          searchParams.append(key, String(part));
        });
      } else {
        searchParams.set(key, value);
      }

      setSearchParams(searchParams);
    });
  };

  const setAsc = () => {
    filteredPeople = filteredPeople.sort(
      (curr, prev) => {
        if (typeof curr[sort] === 'string') {
          return (curr[sort] as 'string').localeCompare(
            prev[sort] as 'string',
          );
        }

        return Number(curr[sort]) - Number(prev[sort]);
      },
    );
  };

  const setDesc = () => {
    filteredPeople = filteredPeople.sort(
      (curr, prev) => {
        if (typeof curr[sort] === 'string') {
          return (prev[sort] as 'string').localeCompare(
            curr[sort] as 'string',
          );
        }

        return Number(prev[sort]) - Number(curr[sort]);
      },
    );
  };

  const setDefault = () => {
    filteredPeople = ([...people]);
  };

  filteredPeople = [...people];

  useEffect(() => {
    getPersons();
  }, []);

  if (sort !== null && order === null) {
    setAsc();
  }

  if (sort !== null && order !== null) {
    setDesc();
  }

  if (sort === null && order === null) {
    setDefault();
  }

  if (sex === 'm') {
    filteredPeople = filteredPeople.filter(person => person.sex === 'm');
  }

  if (sex === 'f') {
    filteredPeople = filteredPeople.filter(person => person.sex === 'f');
  }

  if (centuries.length > 0) {
    filteredPeople = [...filteredPeople].filter(
      person => centuries.includes(Math.ceil(person.born / 100)),
    );
  }

  if (query !== null) {
    filteredPeople = filteredPeople.filter(
      person => person.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              query={query}
              sex={sex}
              centuries={centuries}
              updateSearch={updateSearch}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {(!isLoading && !isError) && (
                <PeopleTable
                  activePerson={activePerson}
                  setActivePerson={setActivePerson}
                  filteredPeople={filteredPeople}
                  people={people}
                  updateSearch={updateSearch}
                  sort={sort}
                  order={order}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
