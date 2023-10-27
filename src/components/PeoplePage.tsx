import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [arePeople, setArePeople] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries');
  const sex = searchParams.get('sex') || '';

  useEffect(() => {
    setLoader(true);
    getPeople().then((response) => {
      setPeople(response);

      if (response.length === 0) {
        setArePeople(true);
      }
    }).catch(() => setError(true))
      .finally(() => setLoader(false));
  }, []);

  const filteredPeople = () => {
    const newQuery = query.toLowerCase().trim();
    let filterPeople = [...people];

    if (sex) {
      filterPeople = filterPeople.filter((person) => person.sex === sex);
    }

    if (query) {
      filterPeople = filterPeople.filter((person) => {
        return (
          person.name.toLowerCase().includes(newQuery)
          || person.fatherName?.toLowerCase().includes(newQuery)
          || person.motherName?.toLowerCase().includes(newQuery)
        );
      });
    }

    if (selectedCenturies.length) {
      filterPeople
      = filterPeople.filter((person) => selectedCenturies.includes(
          Math.ceil(+person.born / 100).toString(),
        ));
    }

    return filterPeople;
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {loader && <Loader />}

              {error
              && <p data-cy="peopleLoadingError">Something went wrong</p>}

              {arePeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loader && people.length > 0
              && <PeopleTable people={filteredPeople()} />}

              {!filteredPeople().length && !loader
              && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
