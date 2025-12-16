import React, { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { Sex } from '../types/Sex';
import { Century } from '../types/Century';
import { SortFields } from '../types/SortFields';
import { SortOrder } from '../types/SortOrder';
import { useSearchParams } from 'react-router-dom';

export function getPreparedPeople(
  people: Person[],
  { query }: { query?: string },
  sex: Sex,
  centuries: Century[],
  sortField: SortFields,
  sortOrder: SortOrder,
) {
  let preparedPeople = [...people];

  if (query) {
    preparedPeople = preparedPeople.filter(
      (person: Person) =>
        person.name.toLowerCase().includes(query.toLowerCase()) ||
        person.fatherName?.toLowerCase().includes(query.toLowerCase()) ||
        person.motherName?.toLowerCase().includes(query.toLowerCase()),
    );
  }

  switch (sex) {
    default:
      break;
    case 'm':
      preparedPeople = preparedPeople.filter(person => person.sex === 'm');
      break;
    case 'f':
      preparedPeople = preparedPeople.filter(person => person.sex === 'f');
      break;
  }

  if (!centuries.includes('All')) {
    preparedPeople = preparedPeople.filter(person =>
      centuries.some(c => {
        switch (c) {
          case '16':
            return person.born > 1500 && person.born <= 1600;
          case '17':
            return person.born > 1600 && person.born <= 1700;
          case '18':
            return person.born > 1700 && person.born <= 1800;
          case '19':
            return person.born > 1800 && person.born <= 1900;
          case '20':
            return person.born > 1900 && person.born <= 2000;
          default:
            return false;
        }
      }),
    );
  }

  if (sortField) {
    preparedPeople = preparedPeople.sort((person1: Person, person2: Person) => {
      switch (sortField) {
        case 'name': {
          if (sortOrder === 'asc') {
            return person1.name.localeCompare(person2.name);
          }

          if (sortOrder === 'desc') {
            return person2.name.localeCompare(person1.name);
          } else {
            return;
          }
        }

        case 'sex': {
          if (sortOrder === 'asc') {
            return person1.sex.localeCompare(person2.sex);
          }

          if (sortOrder === 'desc') {
            return person2.sex.localeCompare(person1.sex);
          } else {
            return;
          }
        }

        case 'born': {
          if (sortOrder === 'asc') {
            return person1.born - person2.born;
          }

          if (sortOrder === 'desc') {
            return person2.born - person1.born;
          } else {
            return;
          }
        }

        case 'died': {
          if (sortOrder === 'asc') {
            return person1.died - person2.died;
          }

          if (sortOrder === 'desc') {
            return person2.died - person1.died;
          } else {
            return;
          }
        }

        default:
          return 0;
      }
    });
  }

  return preparedPeople;
}

export const PeoplePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isPeopleLoading, setIsPeopleLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') as Sex;
  const century =
    searchParams.getAll('centuries').length > 0
      ? (searchParams.getAll('centuries') as Century[])
      : ['All'];
  const sortField = searchParams.get('sort') as SortFields;
  const sortOrder: SortOrder =
    sortField && searchParams.get('order') === 'desc'
      ? 'desc'
      : sortField
        ? 'asc'
        : null;

  useEffect(() => {
    setIsPeopleLoading(true);

    getPeople()
      .then(data =>
        data.map(person => ({
          ...person,
          slug: `${person.name.toLowerCase().replaceAll(' ', '-')}-${person.born}`,
        })),
      )
      .then(processed => setPeople(processed))
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsPeopleLoading(false));
  }, []);

  const visiblePeople = getPreparedPeople(
    people,
    { query },
    sex,
    century,
    sortField,
    sortOrder,
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const handleSort = (field: SortFields) => {
    const params = new URLSearchParams(searchParams);

    const currentSort = params.get('sort');
    const currentOrder = params.get('order');

    if (currentSort !== field) {
      params.set('sort', field);
      params.delete('order');
    } else if (currentOrder !== 'desc') {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {(visiblePeople.length > 0 || query) && (
              <PeopleFilters
                query={query}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                handleQueryChange={handleQueryChange}
                sex={sex}
                century={century}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isPeopleLoading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {people.length === 0 && !isPeopleLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {query && visiblePeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {visiblePeople.length > 0 && (
                <PeopleTable
                  people={visiblePeople}
                  sortField={sortField}
                  handleSort={handleSort}
                  sortOrder={sortOrder}
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
