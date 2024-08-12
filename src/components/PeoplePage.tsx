import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const order = searchParams.get('order');

  useEffect(() => {
    setLoading(true);
    fetch('https://mate-academy.github.io/react_people-table/api/people.json')
      .then(response => response.json())
      .then(data => {
        setPeople(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const filteredPeople = people.filter(person => {
    const query = searchParams.get('query')?.toLowerCase() || '';
    const centuries = searchParams.getAll('centuries');
    const centuryMatch =
      centuries.length === 0 ||
      centuries.includes((Math.floor(person.born / 100) + 1).toString());
    const nameMatch =
      person.name.toLowerCase().includes(query) ||
      person.motherName?.toLowerCase().includes(query) ||
      person.fatherName?.toLowerCase().includes(query);

    return centuryMatch && nameMatch;
  })


  const sortedPeople =
    filteredPeople.sort((a, b) => {
      const sort = searchParams.get('sort');

      switch (sort) {
        case 'sex' || 'name':
          return a.sex.localeCompare(b.sex);

        case 'born' || 'died':
          return a.born - b.born;

        default:
          return 0;
      }
    })

    if (order) {
      sortedPeople.reverse();
      }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length > 0 && !loading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <div data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </div>
              )}

              {!people.length && !loading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!filteredPeople.length && !loading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {filteredPeople.length > 0 && !loading && (
                <PeopleTable people={sortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
