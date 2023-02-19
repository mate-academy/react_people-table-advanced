import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { filteredPeople } from '../../utils/flteredPeopleList';

export const PeoplePage = () => {
  const [peopleList, setPeopleList] = useState<Person[] | null>(null);
  const [isError, setIsError] = useState();
  const [isLoad, setIsLoad] = useState(false);
  const [searchParams] = useSearchParams();

  const listOfPeople = () => (peopleList ? [...peopleList] : []);

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
      case 'name': return a.name.localeCompare(b.name);
      case 'sex': return a.sex.localeCompare(b.sex);
      case 'born': return a.born - b.born;
      case 'died': return a.died - b.died;

      default: return 0;
    }
  };

  const getSortedPeopleList = (): Person[] | null => {
    if (orderParam) {
      return listOfPeople().sort((a, b) => sortPerson(a, b)).reverse();
    }

    if (sortParam) {
      return listOfPeople().sort((a, b) => sortPerson(a, b));
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
        for (let i = 0; i < listOfPeople().length; i += 1) {
          if (listOfPeople()[i].name === item.fatherName) {
            person.father = { ...listOfPeople()[i] };
          }

          if (listOfPeople()[i].name === item.motherName) {
            person.mother = { ...listOfPeople()[i] };
          }
        }
      }

      return person;
    });
  };

  const currentPeopleList = addParentsData(getSortedPeopleList()
    ?.filter((e) => filteredPeople(e, searchParams)));

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

              {peopleList?.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {currentPeopleList?.length === 0 && (
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
