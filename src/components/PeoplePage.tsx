/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { Centuries } from '../types/Centuries';
import { Sex } from '../types/Sex';
import { preparedPeople } from '../utils/preparedPeople';

type Parent = 'father' | 'mother';

const getParent = (
  people: Person[],
  person: Person,
  parent: Parent,
) => {
  if (parent === 'father') {
    return people.find(({ name }) => name === person.fatherName);
  }

  return people.find(({ name }) => name === person.motherName);
};

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = (searchParams.get('sex') || '') as Sex;
  const centuries = (searchParams.get('centuries') || '') as Centuries;

  const sexClickHandler = (personSex: string): void => {
    const params = new URLSearchParams(searchParams);

    params.set('sex', personSex);

    setSearchParams(params);
  };

  const centuriesClickHandler = (someSenturies: string): void => {
    const params = new URLSearchParams(searchParams);

    if (centuries === someSenturies) {
      params.set('centuries', '');
    } else {
      params.set('centuries', someSenturies);
    }

    setSearchParams(params);
  };

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);

    setSearchParams(params);
  };

  const deleteFilters = () => {
    const params = new URLSearchParams();

    setSearchParams(params);
  };

  const preparePeople = () => {
    setIsPending(true);

    getPeople().then(result => {
      const prepared = result.map(person => ({
        ...person,
        father: getParent(result, person, 'father'),
        mother: getParent(result, person, 'mother'),
      }));

      setPeople(prepared);
    })
      .catch(() => setIsError(true))
      .finally(() => setIsPending(false));
  };

  useEffect(() => {
    preparePeople();
  }, []);

  const normalizedPeople = useMemo(() => {
    return preparedPeople({
      people, sex, query, centuries,
    });
  }, [searchParams, people]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isPending
            ? <Loader />
            : (
              <PeopleTable
                onError={isError}
                people={normalizedPeople}
                sex={sex as Sex}
                sexClickHandler={sexClickHandler}
                query={query}
                inputHandler={inputHandler}
                centuries={centuries as Centuries}
                centuriesClickHandler={centuriesClickHandler}
                deleteFilters={deleteFilters}
              />
            )}
          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
        </div>
      </div>
    </>
  );
};
