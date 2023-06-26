import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PeopleFilters } from './PeopleFilters';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { SortEnum } from '../types/SortEnum';
import { SexEnum } from '../types/SexEnum';
import { OrderEnum } from '../types/OrderEnum';

type Props = {
  slugPerson: string | undefined,
};

export const PeoplePage: React.FC<Props> = ({ slugPerson }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [seachParams] = useSearchParams();
  const sexParam = seachParams.get('sex');
  const centuriesParams = seachParams.getAll('centuries') || [];
  const queryParam = seachParams.get('query') || '';
  const sort = seachParams.get('sort');
  const order = seachParams.get('order');

  const handleFiltering = (peopleFromSever: Person[]) => {
    let peopleResult = [...peopleFromSever];

    // filtering by sex
    switch (sexParam) {
      case SexEnum.female:
        peopleResult = peopleResult.filter(p => p.sex === SexEnum.female);
        break;
      case SexEnum.male:
        peopleResult = peopleResult.filter(p => p.sex === SexEnum.male);
        break;
      default:
        break;
    }
    // end filtering by sex

    // filtering by century
    if (centuriesParams.length > 0) {
      const resultArr: Person[] = [];

      centuriesParams.forEach((cent) => {
        peopleResult.forEach(per => {
          if (per.born >= +`${cent}00` && per.died <= +`${+cent + 1}00`) {
            resultArr.push(per);
          }
        });
      });
      peopleResult = resultArr;
    }
    // end filtering by century

    // filtering by query
    if (queryParam !== '') {
      peopleResult = peopleResult.filter(
        p => {
          return p.name.toLocaleLowerCase().includes(
            queryParam.toLocaleLowerCase(),
          );
        },
      );
    }
    // end filtering by query

    return peopleResult;
  };

  const handleSorting = (peopleForSort: Person[]) => {
    switch (sort) {
      case SortEnum.name:
      case SortEnum.sex:
        return peopleForSort.sort((a, b) => (a.sex.localeCompare(b.sex)));

      case SortEnum.born:
      case SortEnum.died:
        return peopleForSort.sort((a, b) => (a.died - b.died));

      default:
        return peopleForSort;
    }
  };

  let visiblePeople = handleFiltering(people);

  visiblePeople = order === OrderEnum.desc
    ? handleSorting(visiblePeople).reverse()
    : handleSorting(visiblePeople);

  const loadPeople = async () => {
    setIsLoading(true);
    try {
      const result = await getPeople();

      setPeople(result);
      setIsLoading(false);
    } catch (e) {
      setError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

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
              {isLoading && (<Loader />)}

              {error && !isLoading && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {!isLoading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length > 0 && (
                <PeopleTable
                  people={visiblePeople}
                  slugPerson={slugPerson}
                />
              )}
              {people.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
