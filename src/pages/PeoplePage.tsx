/* eslint-disable @typescript-eslint/indent */
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const activeSex = searchParams.get('sex') || null;
  const sortField = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => setPeople(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  function sortPeople(currentPeople: Person[], sortBy: string) {
    const newPeople = [...currentPeople];

    newPeople.sort((a: Person, b: Person) => {
      switch (sortBy) {
        case 'name':
        case 'sex':
          return a[sortBy].localeCompare(b[sortBy]);
        case 'born':
        case 'died':
          return a[sortBy] - b[sortBy];
        default:
          return 0;
      }
    });

    return newPeople;
  }

  function preparePeople(
    currentPeople: Person[],
    {
      filterQuery,
      filterCenturies,
      filterActiveSex,
    }: {
      filterQuery: string;
      filterCenturies: string[];
      filterActiveSex: string | null;
    },
  ) {
    const lowerQuery = filterQuery.toLowerCase();
    let preparedPeople = currentPeople;

    if (sortField) {
      preparedPeople = sortPeople(preparedPeople, sortField);

      if (order === 'desc') {
        preparedPeople = preparedPeople.reverse();
      }
    }

    if (filterQuery) {
      preparedPeople = preparedPeople.filter(person => {
        return (
          person.name.toLowerCase().includes(lowerQuery) ||
          person.fatherName?.toLowerCase().includes(lowerQuery) ||
          person.motherName?.toLowerCase().includes(lowerQuery)
        );
      });
    }

    if (filterCenturies.length > 0) {
      preparedPeople = preparedPeople.filter(person => {
        const century = Math.ceil(person.died / 100).toString();

        return filterCenturies.includes(century);
      });
    }

    if (filterActiveSex) {
      preparedPeople = preparedPeople.filter(person => {
        return person.sex === filterActiveSex;
      });
    }

    return preparedPeople;
  }

  const filteredPeople = preparePeople(people, {
    filterQuery: query,
    filterCenturies: centuries,
    filterActiveSex: activeSex,
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!error && !loading && people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && !loading && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!error && !loading && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!error &&
                !loading &&
                people.length > 0 &&
                filteredPeople.length === 0 && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}

              {!error && !loading && filteredPeople.length > 0 && (
                <PeopleTable
                  people={filteredPeople}
                  loading={loading}
                  order={order}
                  sort={sortField}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
