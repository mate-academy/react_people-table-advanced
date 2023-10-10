import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { getSearchWith } from '../utils/searchHelper';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(getSearchWith(searchParams,
      { query: event.target.value || null }));
  };

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries') || [];
  const sortBy = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const loadPeople = async () => {
    try {
      setIsLoading(true);
      const loadedPeople = await getPeople();

      const peopleWithCenturies = loadedPeople.map(person => {
        return { ...person, century: String(Math.ceil(person.died / 100)) };
      });

      setPeople(peopleWithCenturies);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const visiblePeople = useMemo(() => {
    let filteredPeople = people;

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (query) {
      filteredPeople = filteredPeople.filter(person => {
        const textToSearch = `
          ${person.name}
          ${person.fatherName}
          ${person.motherName}
        `.toLowerCase();

        return textToSearch.includes(query.toLowerCase());
      });
    }

    if (centuries.length > 0) {
      filteredPeople = filteredPeople
        .filter(person => centuries.includes(person.century));
    }

    if (sortBy) {
      switch (sortBy) {
        case 'name':
          filteredPeople = filteredPeople
            .sort((firstPerson, secondPerson) => firstPerson.name
              .localeCompare(secondPerson.name));
          break;
        case 'sex':
          filteredPeople = filteredPeople
            .sort((firstPerson, secondPerson) => firstPerson.sex
              .localeCompare(secondPerson.sex));
          break;
        case 'born':
          filteredPeople = filteredPeople
            .sort((firstPerson, secondPerson) => firstPerson.born
              - secondPerson.born);
          break;
        case 'died':
          filteredPeople = filteredPeople
            .sort((firstPerson, secondPerson) => firstPerson.died
              - secondPerson.died);
          break;
        default:
          break;
      }

      if (order === 'desc') {
        filteredPeople = filteredPeople.reverse();
      }
    }

    return filteredPeople;
  }, [people, sex, query, centuries, sortBy, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !hasError
            && (
              <PeopleFilters
                query={query}
                onChangeQuery={handleChangeQuery}
                sex={sex}
                centuries={centuries}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && hasError
                && <p data-cy="peopleLoadingError">Something went wrong</p> }

              {!isLoading && people.length === 0
                && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

              {!isLoading && !hasError && !visiblePeople.length
              && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}

              {!isLoading && !hasError && visiblePeople.length > 0
              && (
                <PeopleTable
                  people={visiblePeople}
                  order={order}
                  sortBy={sortBy}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
