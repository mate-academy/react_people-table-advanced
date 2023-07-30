import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

const getPreparedPeople = (people: Person[]): Person[] => {
  const preparedPeople = people.map(person => {
    return {
      ...person,
      father: people.find(p => p.name === person.fatherName),
      mother: people.find(p => p.name === person.motherName),
    };
  });

  return preparedPeople;
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((data) => {
        setIsEmpty(!data.length);
        setPeople(getPreparedPeople(data));
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

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
              {isLoading && (
                <Loader />
              )}

              {isError && (
                <p data-cy="peopleLoadingError">
                  Something went wrong
                </p>
              )}

              {isEmpty ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <PeopleTable
                  people={people}
                  slug={slug}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
