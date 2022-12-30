/* eslint no-nested-ternary: "off" */
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = React.useState<Person[]>();
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(result => setPeople(result))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  function isValueIncluded(element: string, value: string | null) {
    return value?.toLowerCase().includes(element.toLowerCase());
  }

  const filteredPeople = React.useMemo(() => {
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');
    const sex = searchParams.get('sex');
    const query = searchParams.get('query') || '';
    const centuries = searchParams.getAll('centuries') || [];

    if (!people) {
      return [];
    }

    const filtered = people.filter(person => {
      return (
        (centuries.includes(`${Math.ceil(person.born / 100)}`) || centuries.length === 0)
        && (
          isValueIncluded(query, person.name)
            || isValueIncluded(query, person.fatherName)
            || isValueIncluded(query, person.motherName)
        )
        && (person.sex === sex || sex === null)
      );
    });

    const sorted = [...filtered].sort((person1, person2) => {
      switch (sort) {
        case 'name':
          return person1.name.toLowerCase()
            .localeCompare(person2.name.toLowerCase());
        case 'sex':
          return person1.sex.toLowerCase()
            .localeCompare(person2.sex.toLowerCase());
        case 'born':
          return person1.born - person2.born;
        case 'died':
          return person1.died - person2.died;

        default:
          return 0;
      }
    });

    if (order) {
      sorted.reverse();
    }

    return sorted;
  }, [people, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isError && people && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {people && (
                !people.length
                  ? (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )
                  : filteredPeople.length
                    ? <PeopleTable people={filteredPeople} />
                    : (
                      <p>
                        There are no people matching the current search criteria
                      </p>
                    )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
