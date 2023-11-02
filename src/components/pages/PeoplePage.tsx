import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { filteredPeople } from '../../utils/filteredPeople';

export const PeoplePage = () => {
  const [peopleFromServer, setPeopleFromServer]
    = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const isResponseSuccessful = peopleFromServer && !isLoading && !errorMessage;

  const preparedPeopleData = (people: Person[]) => {
    const preparedPeople = people.map((person) => {
      let mother;
      let father;

      if (person.motherName) {
        mother = people.find(({ name }) => person.motherName === name);
      }

      if (person.fatherName) {
        father = people.find(({ name }) => person.fatherName === name);
      }

      return { ...person, mother, father };
    });

    setPeopleFromServer(preparedPeople);
  };

  const filterPeople = useMemo(() => {
    return filteredPeople(peopleFromServer, {
      query,
      centuries,
      sex,
      sort,
      order,
    });
  }, [peopleFromServer, query, centuries, sex, sort, order]);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(preparedPeopleData)
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isResponseSuccessful && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError">{errorMessage}</p>
              )}

              {/* eslint-disable no-extra-boolean-cast */}
              {isResponseSuccessful
                && (!!peopleFromServer.length ? (
                  <PeopleTable people={filterPeople} />
                ) : (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                ))}

              {!!peopleFromServer.length && filterPeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
