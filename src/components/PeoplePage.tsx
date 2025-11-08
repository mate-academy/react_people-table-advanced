import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import '../App.scss';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { PeopleFilters } from './PeopleFilters';
import { useSearchParams } from 'react-router-dom';

const PeoplePage = () => {
  const [people, setPeople] = React.useState<Person[]>([]);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = React.useState(false);
  const [loadingError, setLoadingError] = React.useState(false);
  const [filteredPeople, setFilteredPeople] = useState(people);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setLoadingError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = [...people];

    const sex = searchParams.get('sex');
    const centuries = searchParams.getAll('centuries');
    const query = searchParams.get('query');

    if (sex) {
      filtered = filtered.filter(person => person.sex === sex);
    }

    if (centuries.length > 0) {
      filtered = filtered.filter(person =>
        centuries.includes(Math.ceil(person.born / 100).toString()),
      );
    }

    if (query) {
      filtered = filtered.filter(person =>
        person.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    setFilteredPeople(filtered);
  }, [searchParams, people]);

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
              {loading ? (
                <Loader />
              ) : loadingError ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : people.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
