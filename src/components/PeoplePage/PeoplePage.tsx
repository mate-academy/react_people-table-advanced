import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { getFilteredPeople } from '../../utils/flteredPeopleList';

export const PeoplePage = () => {
  const [peopleList, setPeopleList] = useState<Person[] | null>(null);
  const [isError, setIsError] = useState();
  const [isLoad, setIsLoad] = useState(false);
  const [searchParams] = useSearchParams();

  const listOfPeople = () => (peopleList ? [...peopleList] : []);
  const list = listOfPeople();

  const sortParam = searchParams.get('sort');
  const orderParam = searchParams.get('order');

  const getPeopleList = () => {
    setIsLoad(true);

    getPeople()
      .then((data) => setPeopleList(data))
      .catch((error) => setIsError(error.message))
      .finally(() => setIsLoad(false));
  };

  const sortPerson = (a: Person, b: Person) => {
    switch (sortParam) {
      case 'name':
      case 'sex':
        return a[sortParam].localeCompare(b[sortParam]);
      case 'born':
      case 'died':
        return a[sortParam] - b[sortParam];

      default: return 0;
    }
  };

  const getSortedPeopleList = (): Person[] | null => {
    if (orderParam) {
      return list.sort((a, b) => sortPerson(a, b)).reverse();
    }

    if (sortParam) {
      return list.sort((a, b) => sortPerson(a, b));
    }

    return peopleList;
  };

  const addParentsData = (arrayOfPeople: Person[] | undefined) => {
    if (!arrayOfPeople) {
      return null;
    }

    return arrayOfPeople.map((item) => {
      const person = { ...item };

      if (item.fatherName || item.motherName) {
        list.forEach((itemList) => {
          if (itemList.name === item.fatherName) {
            person.father = { ...itemList };
          }

          if (itemList.name === item.motherName) {
            person.mother = { ...itemList };
          }
        });
      }

      return person;
    });
  };

  const currentPeopleList = addParentsData(getSortedPeopleList()
    ?.filter((person) => getFilteredPeople(person, searchParams)));

  useEffect(() => {
    getPeopleList();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {peopleList && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoad && (
                <Loader />
              )}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {isError}
                </p>
              )}

              {peopleList && !peopleList.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {currentPeopleList && !currentPeopleList.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {currentPeopleList && currentPeopleList.length > 0 && (
                <PeopleTable currentPeopleList={currentPeopleList} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
