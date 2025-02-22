import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import React, { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [errorLength, setErrorLength] = useState('');
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = useMemo(() => {
    return searchParams.getAll('centuries') || [];
  }, [searchParams]);

  const filteringPeople = useMemo(() => {
    let filteredPeople = [...people];

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (query) {
      filteredPeople = filteredPeople.filter(person => {
        return (
          person.name.toLowerCase().includes(query.toLowerCase()) ||
          person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
          person.fatherName?.toLowerCase().includes(query.toLowerCase())
        );
      });
    }

    if (!!centuries.length) {
      filteredPeople = filteredPeople.filter(person => {
        return centuries.includes(
          (+person.born.toString().slice(0, 2) + 1).toString(),
        );
      });
    }

    return filteredPeople;
  }, [people, query, sex, centuries]);

  useEffect(() => {
    setLoading(true);
    setError('');

    getPeople()
      .then(peopleFromServer => {
        if (peopleFromServer.length === 0) {
          setErrorLength('There are no people on the server');

          return;
        }

        let allPeople = peopleFromServer;

        allPeople = allPeople.map(person => {
          const mother = peopleFromServer.find(
            one => one.name === person.motherName,
          );
          const father = peopleFromServer.find(
            one => one.name === person.fatherName,
          );

          return {
            ...person,
            mother: mother || null,
            father: father || null,
          };
        });

        setPeople(allPeople);
      })
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!error && !loading && !!people.length && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!loading && !error && errorLength && (
                <p data-cy="noPeopleMessage">{errorLength}</p>
              )}

              {error && !loading && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {!error && !loading && !!people.length && (
                <>
                  {!filteringPeople.length ? (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  ) : (
                    <PeopleTable people={filteringPeople} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
