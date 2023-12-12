import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [filteredPeople, setFilteredPeople] = useState<Person[] | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [centuriesList, setCenturiesList] = useState<number[]>([]);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then((response) => {
        setPeople(response);
      }).catch(() => {
        setError(true);
      });
  }, []);

  useEffect(() => {
    const query = searchParams.get('query');
    const sex = searchParams.get('sex');
    const selectedCenturies = searchParams.getAll('centuries');
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    if (people) {
      let peopleCopy = [...people];

      if (query) {
        peopleCopy = (people.filter((person) => (
          person.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        || (person.motherName && person.motherName
          .toLocaleLowerCase().includes(query.toLocaleLowerCase()))
        || (person.fatherName && person.fatherName
          .toLocaleLowerCase().includes(query.toLocaleLowerCase()))
        )));
      }

      if (sex) {
        peopleCopy = peopleCopy.filter((person) => person.sex === sex);
      }

      if (selectedCenturies.length > 0) {
        peopleCopy = peopleCopy.filter((person) => selectedCenturies.includes(
          (Math.ceil(person.born / 100)).toString(),
        ));
      }

      if (sort === 'name' || sort === 'sex') {
        if (order) {
          peopleCopy = peopleCopy.sort((person, person2) => (
            (person2[sort as keyof Person] as string)
              .localeCompare(person[sort as keyof Person] as string)
          ));
        } else {
          peopleCopy = peopleCopy.sort((person, person2) => (
            (person[sort as keyof Person] as string)
              .localeCompare(person2[sort as keyof Person] as string)
          ));
        }
      } else if (sort === 'born' || sort === 'died') {
        if (order) {
          peopleCopy = peopleCopy.sort((person, person2) => (
            person2[sort] - person[sort]
          ));
        } else {
          peopleCopy = peopleCopy.sort((person, person2) => (
            person[sort] - person2[sort]
          ));
        }
      }

      setFilteredPeople(() => peopleCopy);
    }
  }, [people, searchParams]);

  useEffect(() => {
    const centuries: number[] = [];

    if (people) {
      people.forEach((item) => {
        const tmp = Math.ceil(item.born / 100);

        if (!centuries.includes(tmp)) {
          centuries.push(tmp);
        }
      });
    }

    setCenturiesList(() => centuries.sort());
  }, [people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people && people.length > 0 && !error && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters centuriesList={centuriesList} />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {!people && !error && (<Loader />)}

              {error && (
                <p data-cy="peopleLoadingError">
                  Something went wrong
                </p>
              )}

              {people?.length === 0 && !error && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {people && people.length > 0 && !error
              && filteredPeople?.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {people && people.length > 0 && !error
              && filteredPeople && filteredPeople?.length > 0 && (
                <PeopleTable filteredPeople={filteredPeople} people={people} />
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/*

    <p data-cy="peopleLoadingError">Something went wrong</p>

    <p data-cy="noPeopleMessage">
      There are no people on the server
    </p>

    <p>There are no people matching the current search criteria</p>
*/
