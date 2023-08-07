/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { Centuries } from '../types/Centuries';
import { Sex } from '../types/Sex';

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
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.get('centuries') || '';

  const sexClickHandler = (personSex: string): void => {
    const params = new URLSearchParams(searchParams);

    params.set('sex', personSex);

    setSearchParams(params);
  };

  const centuriesClickHandler = (someSenturies: string): void => {
    const params = new URLSearchParams(searchParams);

    params.set('centuries', someSenturies);

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

  const preparedPeople = useMemo(() => {
    let newPeople = [...people];

    if (query) {
      const normalizedQuery = query.toLocaleLowerCase();

      newPeople = newPeople.filter(
        person => person.name.toLowerCase().includes(normalizedQuery),
      );
    }

    if (sex) {
      switch (sex) {
        case Sex.male:
          newPeople = newPeople.filter(person => person.sex === 'm');
          break;

        case Sex.female:
          newPeople = newPeople.filter(person => person.sex === 'f');
          break;

        default:
          newPeople = [...newPeople];
      }
    }

    if (centuries) {
      switch (centuries) {
        case Centuries.sixteen:
          newPeople = newPeople.filter(person => Math.ceil(person.born / 100) === 16);
          break;

        case Centuries.seventeen:
          newPeople = newPeople.filter(person => Math.ceil(person.born / 100) === 17);
          break;

        case Centuries.eighteen:
          newPeople = newPeople.filter(person => Math.ceil(person.born / 100) === 18);
          break;

        case Centuries.nineteen:
          newPeople = newPeople.filter(person => Math.ceil(person.born / 100) === 19);
          break;

        case Centuries.twenty:
          newPeople = newPeople.filter(person => Math.ceil(person.born / 100) === 20);
          break;

        default:
          newPeople = [...newPeople];
      }
    }

    return newPeople;
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
                people={preparedPeople}
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
