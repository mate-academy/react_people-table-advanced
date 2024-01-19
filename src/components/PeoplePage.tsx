import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

const prepareData = (people: Person[]) => {
  return people.map(person => {
    const mother = people.find(
      motherObject => motherObject.name === person.motherName,
    );
    const father = people.find(
      fatherObject => fatherObject.name === person.fatherName,
    );

    const personCopy = {
      ...person,
      mother,
      father,
    };

    return personCopy;
  });
};

const filterData = (people: Person[], searchParams: URLSearchParams) => {
  let filteredData = [...people];

  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const input = searchParams.get('query');

  if (sex) {
    filteredData = filteredData.filter((person) => person.sex === sex);
  }

  if (centuries.length > 0) {
    filteredData = filteredData.filter(
      (person) => centuries.find(
        century => Math.floor(person.born / 100) === Number(century),
      ),
    );
  }

  if (input) {
    const preparedInput = input.toLocaleLowerCase().trim();

    filteredData = filteredData.filter(
      (person) => person.name.toLocaleLowerCase().includes(preparedInput),
    );
  }

  return filteredData;
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [URLSearchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((data) => {
        setPeople(prepareData(filterData(data, URLSearchParams)));
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, [URLSearchParams]);

  const tableVisible = !isLoading && !error && people.length > 0;

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
              {isLoading && <Loader />}

              {error && !isLoading
              && <p data-cy="peopleLoadingError">Something went wrong</p>}

              {people.length === 0 && !isLoading
              && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              <p>There are no people matching the current search criteria</p>

              {tableVisible && <PeopleTable people={people} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
