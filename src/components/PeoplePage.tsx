import { PeopleTable } from './PeopleTable';
import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { Loader } from './Loader';
import { useLocation, useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { PeopleFilters } from './PeopleFilters';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const { slug } = useParams();
  const selectedPerson = slug ? people.find(p => p.slug === slug) : null;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query' || '');
  const sex = searchParams.get('sex' || null);
  const centuries = searchParams.getAll('centuries' || []);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(true))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function preparePeople() {
    let preparedPeople = [...people];
    const normalizedQuery = query?.trim().toLowerCase();

    if (normalizedQuery) {
      preparedPeople = preparedPeople.filter(
        person =>
          person.name.toLowerCase().includes(normalizedQuery) ||
          person.fatherName?.toLowerCase().includes(normalizedQuery) ||
          person.motherName?.toLowerCase().includes(normalizedQuery),
      );
    }

    if (sex) {
      preparedPeople = preparedPeople.filter(person => person.sex === sex);
    }

    if (!!centuries.length) {
      preparedPeople = preparedPeople.filter(person =>
        centuries.some(century => Math.ceil(person.born / 100) === +century),
      );
    }

    return preparedPeople;
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}
          {loading ? (
            <Loader />
          ) : (
            <>
              <PeopleTable
                people={preparePeople()}
                selectedPerson={selectedPerson}
                errorMessage={errorMessage}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};
