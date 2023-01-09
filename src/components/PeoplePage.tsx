import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { UpdatePerson } from '../types/UpdatePerson';

export const PeoplePage: React.FC = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowError, setIsShowError] = useState<boolean>(false);

  async function getPeopleFromServer() {
    setIsLoading(true);

    const peopleList = await getPeople();

    try {
      setPeopleFromServer(peopleList);
      setIsShowError(false);
    } catch {
      setTimeout(() => {
        setIsLoading(false);
        setIsShowError(true);
      }, 4000);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  function getParent() {
    return peopleFromServer.map(person => ({
      ...person,
      fatherName: person.fatherName ? person.fatherName : '-',
      motherName: person.motherName ? person.motherName : '-',
      father: peopleFromServer.find(human => human.name === person.fatherName)
        || null,
      mother: peopleFromServer.find(human => human.name === person.motherName)
        || null,
    }));
  }

  const [searchParam] = useSearchParams();

  const sex = searchParam.get('sex');
  const query = searchParam.get('query');
  const sort = searchParam.get('sort');
  const order = searchParam.get('order');
  const centuries = searchParam.getAll('centuries');

  function sortVisiblePeople(allPeople: UpdatePerson[]) {
    let newVisiblePeople = [...allPeople];

    const sortNumber = (arr: UpdatePerson[], param: string) => {
      return param === 'Born'
        ? arr.sort(
          (a, b) => a.born - b.born,
        )
        : arr.sort(
          (a, b) => a.died - b.died,
        );
    };

    const sortString = (arr: UpdatePerson[], param: string) => {
      return param === 'Sex'
        ? arr.sort((a, b) => (a.sex).localeCompare(b.sex))
        : arr.sort((a, b) => (a.name).localeCompare(b.name));
    };

    switch (sort) {
      case 'Sex':
      case 'Name':
        newVisiblePeople = sortString(newVisiblePeople, sort);
        break;

      case 'Born':
      case 'Died':
        newVisiblePeople = sortNumber(newVisiblePeople, sort);
        break;

      default:
        break;
    }

    if (sex) {
      newVisiblePeople = newVisiblePeople.filter(
        person => person.sex === sex[0].toLowerCase(),
      );
    }

    if (query) {
      newVisiblePeople = newVisiblePeople.filter(
        person => (person.name.toLowerCase()).includes(query.toLowerCase()),
      );
    }

    if (centuries.length) {
      newVisiblePeople = newVisiblePeople.filter(
        person => centuries.includes(String(Math.ceil(+person.born / 100))),
      );
    }

    if (order) {
      newVisiblePeople = newVisiblePeople.reverse();
    }

    return newVisiblePeople;
  }

  const people = useMemo(() => {
    const peopleList = getParent();

    return sortVisiblePeople(peopleList);
  }, [peopleFromServer, sex, query, sort, order, centuries]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && Boolean(peopleFromServer.length) && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && !isShowError && <Loader />}

              {!isLoading && isShowError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && Boolean(!peopleFromServer.length) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && Boolean(!people.length) && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && Boolean(people.length) && (
                <PeopleTable people={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
