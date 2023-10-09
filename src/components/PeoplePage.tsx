import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [filtredPeople, setFiltredPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const location = useLocation();

  function getCentury(bornYear: number) {
    const century = Math.ceil(bornYear / 100);

    return century;
  }

  useEffect(() => {
    getPeople()
      .then((data) => {
        setPeople(data);
        setIsLoading(false);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error fetching people data:', error);
        setIsLoading(false);
        setLoadingError(true);
      });
  }, []);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const query = urlSearchParams.get('query');
    const sex = urlSearchParams.get('sex');
    const centuries = urlSearchParams.getAll('centuries');

    const newPeople = people.filter(person => (
      (query === null || person.name.toLowerCase().includes(query.toLowerCase())
      || person.motherName?.toLowerCase().includes(query.toLowerCase())
      || person.fatherName?.toLowerCase().includes(query.toLowerCase()))
      && (sex === null || person.sex === sex)
      && (centuries.length === 0 || centuries
        .includes(getCentury(person.born).toString()))
    ));

    setFiltredPeople(newPeople);
  }, [location.search, people]);

  return (
    <div data-cy="peoplePage">
      <h1 className="title">People Page</h1>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            <div className="column">
              <div className="box table-container">
                {loadingError ? (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                ) : (
                  <div>
                    {people.length === 0 ? (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
                    ) : (
                      <PeopleTable
                        people={people}
                        filtredPeople={filtredPeople}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
