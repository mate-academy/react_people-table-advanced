import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { useLocation } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [peopleLoadingError, setPeopleLoadingError] = useState(false);
  const [noPeopleMessage, setNoPeopleMessage] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries' || []);
  const selectedSex = searchParams.get('sex') || null;

  useEffect(() => {
    setLoading(true);
    setNoPeopleMessage(false);
    setPeopleLoadingError(false);
    getPeople()
      .then(fetchedPeople => {
        setPeople(fetchedPeople);

        if (!fetchedPeople.length) {
          setNoPeopleMessage(true);
        }
      })
      .catch(() => setPeopleLoadingError(true))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getCentury = (year: number): string => {
    return Math.ceil(year / 100).toString();
  };

  const filteredPeople = people.filter(person => {
    const personName = [person.name, person.motherName, person.motherName].some(
      name => name && name.toLowerCase().includes(query.toLowerCase()),
    );

    const personCentury =
      selectedCenturies.length === 0 ||
      selectedCenturies.includes(getCentury(person.born));

    const personSex = !selectedSex || person.sex === selectedSex;

    return personName && personCentury && personSex;
  });

  const sortedPeople = filteredPeople.sort((a, b) => {
    const sortOrder = searchParams.get('order') === 'desc' ? -1 : 1;

    if (searchParams.get('sort') === 'name') {
      return sortOrder * a.name.localeCompare(b.name);
    } else if (searchParams.get('sort') === 'sex') {
      return (
        sortOrder * (a.sex.localeCompare(b.sex) || a.name.localeCompare(b.name))
      );
    } else if (searchParams.get('sort') === 'born') {
      return sortOrder * (a.born - b.born);
    } else if (searchParams.get('sort') === 'died') {
      return sortOrder * (a.died - b.died);
    } else {
      return 0;
    }
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && !peopleLoadingError && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {peopleLoadingError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {noPeopleMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!sortedPeople.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loading && !peopleLoadingError && !!sortedPeople.length && (
                <PeopleTable people={sortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
