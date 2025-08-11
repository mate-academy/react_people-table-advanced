import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { Sex } from '../types/Sex';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const handleFilter = () => {
    let result = people;

    switch (sex) {
      case Sex.Male:
        result = result.filter(person => person.sex === Sex.Male);
        break;

      case Sex.Female:
        result = result.filter(person => person.sex === Sex.Female);
        break;

      default:
        break;
    }

    if (query) {
      result = result.filter(
        person =>
          person.name.toLowerCase().includes(query.toLowerCase()) ||
          person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
          person.fatherName?.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (centuries.length > 0) {
      result = result.filter(person =>
        centuries.includes(String(Math.floor((person.born - 1) / 100) + 1)),
      );
    }

    return result;
  };

  const filteredPeople = handleFilter();

  const handleSorting = () => {
    if (!sort) {
      return filteredPeople;
    }

    let result = filteredPeople.slice();

    switch (sort) {
      case 'name':
        result =
          order === 'desc'
            ? result.sort((a, b) => b.name.localeCompare(a.name))
            : result.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case 'sex':
        result =
          order === 'desc'
            ? result.sort((a, b) => b.sex.localeCompare(a.sex))
            : result.sort((a, b) => a.sex.localeCompare(b.sex));
        break;

      case 'born':
        result =
          order === 'desc'
            ? result.sort((a, b) => b.born - a.born)
            : result.sort((a, b) => a.born - b.born);
        break;

      case 'died':
        result =
          order === 'desc'
            ? result.sort((a, b) => b.died - a.died)
            : result.sort((a, b) => a.died - b.died);
        break;

      default:
        break;
    }

    return result;
  };

  const sortedPeople = handleSorting();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people && !isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!people.length && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!filteredPeople.length && !isLoading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!!filteredPeople.length && <PeopleTable people={sortedPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
