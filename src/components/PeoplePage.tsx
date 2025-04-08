import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useState, useEffect } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

const createPerson = (list: Person[]) => {
  return list.map((completePerson, index, arr) => {
    let finalPerson = {
      ...completePerson,
    };

    if (completePerson.fatherName) {
      finalPerson = {
        ...finalPerson,
        father: arr.filter(
          (parentPerson: Person) =>
            parentPerson.name === completePerson.fatherName,
        )[0],
      };
    }

    if (completePerson.motherName) {
      finalPerson = {
        ...finalPerson,
        mother: arr.filter(
          (parentPerson: Person) =>
            parentPerson.name === completePerson.motherName,
        )[0],
      };
    }

    return finalPerson;
  });
};

export const PeoplePage = () => {
  const [peopleList, setPeopleList] = useState<Person[] | []>([]);
  const [originalPeopleList, setOriginalPeopleList] = useState<Person[] | []>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query');

  useEffect(() => {
    getPeople()
      .then(response => {
        setPeopleList(createPerson(response));
        setOriginalPeopleList(createPerson(response));
        setIsError(false);
      })
      .catch(error => {
        setIsError(true);
        throw new Error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    let newList = [...originalPeopleList];

    if (sex) {
      newList = newList.filter(person => person.sex === sex);
    }

    if (centuries && centuries.length > 0) {
      const filteredList: Person[] = [];

      centuries.forEach(century => {
        const list = newList.filter(person => {
          const personCentury = Math.floor(person.born / 100) + 1;

          return personCentury >= +century && personCentury < +century + 1;
        });

        list.map(person => filteredList.push(person));
      });
      newList = filteredList;
    }

    if (sort) {
      switch (sort) {
        case 'name':
          newList = newList.sort((personA, personB) => {
            if (order === 'desc') {
              return personB.name.localeCompare(personA.name);
            }

            return personA.name.localeCompare(personB.name);
          });
          break;
        case 'sex':
          newList = newList.sort((personA, personB) => {
            if (order === 'desc') {
              return personB.sex.localeCompare(personA.sex);
            }

            return personA.sex.localeCompare(personB.sex);
          });
          break;
        case 'born':
          newList = newList.sort((personA, personB) => {
            if (order === 'desc') {
              return personB.born - personA.born;
            }

            return personA.born - personB.born;
          });
          break;
        case 'died':
          newList = newList.sort((personA, personB) => {
            if (order === 'desc') {
              return personB.died - personA.died;
            }

            return personA.died - personB.died;
          });
          break;
      }
    }

    if (query) {
      const lowerQuery = query.toLowerCase();

      newList = newList.filter(person => {
        return (
          person.name.toLowerCase().includes(lowerQuery) ||
          person.fatherName?.toLowerCase().includes(lowerQuery) ||
          person.motherName?.toLowerCase().includes(lowerQuery)
        );
      });
    }

    setPeopleList(newList);
  }, [sex, sort, order, centuries, query]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>

              <div className="column">
                <div className="box table-container">
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <>
                      {isError ? (
                        <p
                          data-cy="peopleLoadingError"
                          className="has-text-danger"
                        >
                          Something went wrong
                        </p>
                      ) : (
                        <>
                          {peopleList.length > 0 ? (
                            <PeopleTable peopleList={peopleList} />
                          ) : (
                            <p data-cy="noPeopleMessage">
                              There are no people on the server
                            </p>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

{
  /* <p>There are no people matching the current search criteria</p> в box table-container
    если никого не матчится с критерием
  */
}
