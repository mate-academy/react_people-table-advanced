import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useContext, useEffect, useState, useCallback } from 'react';
import { PeopleContext } from '../utils/peopleContext';
import { getPeople } from '../api';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

export const PeoplePage = () => {
  const { people, setPeople } = useContext(PeopleContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('name') || '';
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);

  const filterPeople = useCallback(() => {
    const sexFilter = searchParams.get('sex');
    const nameFilter = searchParams.get('name')?.toLowerCase() || '';
    const centuriesFilter = searchParams.getAll('centuries');

    const result = people.filter(person => {
      if (sexFilter && person.sex !== sexFilter) {
        return false;
      }

      if (nameFilter && !person.name.toLowerCase().includes(nameFilter)) {
        return false;
      }

      if (centuriesFilter.length > 0) {
        const personCentury = Math.ceil(person.born / 100);

        if (!centuriesFilter.includes(personCentury.toString())) {
          return false;
        }
      }

      return true;
    });

    setFilteredPeople(result);
  }, [searchParams, people]);

  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;

    if (hash) {
      const element = document.getElementById(hash.slice(1));

      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        element.classList.add('highlight');
      }
    }
  }, [location, filteredPeople]);

  useEffect(() => {
    if (people.length === 0) {
      setLoading(true);
      getPeople()
        .then(data => {
          setPeople(data);
          setErrorMessage('');
        })
        .catch(() => setErrorMessage('Something went wrong'))
        .finally(() => setLoading(false));
    } else {
      filterPeople();
    }
  }, [people.length, setPeople, filterPeople]);

  useEffect(() => {
    filterPeople();
  }, [searchParams, filterPeople]);

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
              {loading && <Loader />}
              {!loading && errorMessage && (
                <p data-cy="peopleLoadingError">
                  There are no people matching the current search criteria
                </p>
              )}
              {filteredPeople.length === 0 && query && (
                <p data-cy="noPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              )}
              {!loading && !errorMessage && filteredPeople.length > 0 && (
                <PeopleTable visiblePeople={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
