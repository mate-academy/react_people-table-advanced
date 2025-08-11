import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
import { getSortedPeople } from '../utils/sortHelper';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [preparedPeople, setPreparedPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [timer, setTimer] = useState(false);

  const [searchParams] = useSearchParams();

  const getPersonLink = ({ name, born }: Person) =>
    `${name.toLowerCase().split(' ').join('-')}-${born}`;

  useEffect(() => {
    setTimer(true);

    const fetchPeople = async () => {
      try {
        const peopleFromServe = await getPeople();

        setPeople(peopleFromServe);
      } catch {
        setErrorMessage('Something went wrong');
      } finally {
        setTimer(false);
      }
    };

    fetchPeople();
  }, []);

  useEffect(() => {
    const peopleWithParents = people.map(person => {
      const mom = people.find(p => p.name === person.motherName);
      const fath = people.find(p => p.name === person.fatherName);

      return {
        ...person,
        father: fath,
        mother: mom,
        slug: getPersonLink(person),
      };
    });

    const sortedPeople = getSortedPeople(peopleWithParents, searchParams);

    setPreparedPeople(sortedPeople);
  }, [people, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!timer && !errorMessage && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {timer && <Loader />}

              {!timer && errorMessage && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!timer && errorMessage?.trim() === '' && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {preparedPeople.length !== 0 ? (
                <PeopleTable
                  sortedPeople={preparedPeople}
                  getPersonLink={getPersonLink}
                />
              ) : (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
