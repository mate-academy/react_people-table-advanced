/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { PeopleFilters } from "../components/PeopleFilters";
import { PeopleTable } from "../components/PeopleTable";
import { Person } from "../types";
import { getPeople } from "../api";
import { useSearchParams } from "react-router-dom";

function getVisiblePeople(
  people: Person[],
  sex: string | null,
  query: string | null,
  centuries: string[],
  sort: string | null,
  order: string | null,
): Person[] {
  let visiblePeople = [...people];

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (query) {
    const queryLower = query.toLowerCase();

    visiblePeople = visiblePeople.filter(person => {
      return (
        person.name.toLowerCase().includes(queryLower) ||
          person.motherName?.toLowerCase().includes(queryLower) ||
            person.fatherName?.toLowerCase().includes(queryLower)
      );
    });
  }

  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(person => {
      const personCentury = Math.ceil(person.born / 100).toString();

      return centuries.includes(personCentury);
    });
  }

  if (sort) {
    visiblePeople.sort((personA, personB) => {
      let comparison = 0;

      switch (sort) {
        case 'name':
          comparison = personA.name.localeCompare(personB.name);
          break;
        case 'sex':
          comparison = personA.sex.localeCompare(personB.sex);
          break;
        case 'born':
          comparison = personA.born - personB.born;
          break;
        case 'died':
          comparison = personA.died - personB.died;
          break;
      }

      return order === 'desc' ? comparison * -1 : comparison;
    });
  }

  return visiblePeople;
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(data => setPeople(data))
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const visiblePeople = getVisiblePeople(people, sex, query, centuries, sort, order);

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            {people.length > 0 && (
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>
            )}

            <div className="column">
              <div className="box table-container">

                {errorMessage && (
                  <p data-cy="peopleLoadingError">{errorMessage}</p>
                )}

                {people.length === 0 && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                {people.length > 0 && visiblePeople.length === 0 && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}

                <PeopleTable people={visiblePeople} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
