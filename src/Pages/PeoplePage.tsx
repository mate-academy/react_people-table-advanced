import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import React from 'react';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();
  const { slug } = useParams();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const filteredPeople = useMemo(() => {
    let result = [...people];

    const sex = searchParams.get('sex');

    if (sex) {
      result = result.filter(person => person.sex === sex);
    }

    const query = searchParams.get('query')?.trim().toLowerCase();

    if (query) {
      result = result.filter(person => {
        const nameMatch = person.name.toLowerCase().includes(query);
        const motherMatch = person.motherName?.toLowerCase().includes(query);
        const fatherMatch = person.fatherName?.toLowerCase().includes(query);

        return nameMatch || motherMatch || fatherMatch;
      });
    }

    const centuries = searchParams.getAll('centuries');

    if (centuries.length > 0) {
      result = result.filter(person => {
        const century = Math.ceil(person.born / 100).toString();

        return centuries.includes(century);
      });
    }

    const sortField = searchParams.get('sort');
    const order = searchParams.get('order');

    if (sortField) {
      result.sort((user1, user2) => {
        let comparison = 0;

        switch (sortField) {
          case 'name':
          case 'sex':
            comparison = user1[sortField].localeCompare(user2[sortField]);
            break;
          case 'born':
          case 'died':
            comparison = user1[sortField] - user2[sortField];
            break;
          default:
            break;
        }

        return order === 'desc' ? -1 * comparison : comparison;
      });
    }

    return result;
  }, [people, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      {loading && <Loader />}

      {error && <p data-cy="peopleLoadingError">Something went wrong</p>}

      {!loading && !error && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!loading && !error && people.length > 0 && (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            <div className="column">
              <div className="box table-container">
                {filteredPeople.length === 0 ? (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                ) : (
                  <PeopleTable
                    people={filteredPeople}
                    selectedPerson={people.find(person => person.slug === slug)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
