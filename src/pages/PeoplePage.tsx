import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

import { Person, SearchParamsType } from '../types';
import { getPeople } from '../api';
import { SearchParamsOptions } from '../types/enums';

import {
  filteredBySex,
  filteredByCenturies,
  filterByQuery,
  sortByParams,
} from '../utils/filterHelper';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);

  const fetchPeoples = async () => {
    try {
      setIsError(false);
      const data: Person[] = await getPeople();

      if (!data) {
        throw new Error('false get');
      }

      const peopleWithParents = data.map((person: Person) => {
        const updatedPerson = { ...person };

        data.forEach(parent => {
          if (parent.name === person.fatherName) {
            updatedPerson.father = parent;
          }

          if (parent.name === person.motherName) {
            updatedPerson.mother = parent;
          }
        });

        return updatedPerson;
      });

      setPeopleList(peopleWithParents);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPeoples();
  }, []);

  const [searchParams] = useSearchParams();

  const params = {
    centuries: searchParams.getAll(SearchParamsOptions.centuries) || [],
    sex: searchParams.get(SearchParamsOptions.sex) || '',
    query: searchParams.get(SearchParamsOptions.query) || '',
    order: searchParams.get(SearchParamsOptions.order) || '',
    sort: searchParams.get(SearchParamsOptions.sort) || '',
  };

  const filteredPeople = (filteredParams: SearchParamsType) => {
    let filteredList = peopleList;

    if (filteredParams.centuries.length > 0) {
      filteredList = filteredByCenturies(
        filteredList,
        filteredParams.centuries,
      );
    }

    if (filteredParams.sex) {
      filteredList = filteredBySex(filteredList, filteredParams.sex);
    }

    if (params.query) {
      filteredList = filterByQuery(filteredList, params.query);
    }

    if (filteredParams.sort) {
      filteredList = sortByParams(filteredList, filteredParams.sort);
    }

    if (params.order !== '') {
      filteredList = filteredList.reverse();
    }

    return filteredList;
  };

  const visiblePeople = filteredPeople(params);

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
              {isLoading && !isError && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {!isError && !isLoading && visiblePeople.length < 1 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!isError && !isLoading && visiblePeople.length > 0 && (
                <PeopleTable peopleList={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
