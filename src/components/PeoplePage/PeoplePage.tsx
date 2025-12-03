import React, { useEffect, useMemo, useState } from 'react';
import { Person } from '../../types';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { PeopleFilters } from '../PeopleFilter/PeopleFilter';

export type OrderType = 'desc' | null;
export type Sort = 'name' | 'sex' | 'born' | 'died' | null;

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [sortedPeople, setSortedPeople] = useState<Person[]>([]);
  const [allPeople, setAllPeople] = useState<Person[]>([]);
  const highlightedPersonSlug: string | null = useParams()?.slug || null;
  const [loadingState, setLoadingState] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [urlSearchParams] = useSearchParams();

  const sex = urlSearchParams.get('sex');
  const centuries = useMemo(
    () => urlSearchParams.getAll('centuries'),
    [urlSearchParams],
  );
  const query = urlSearchParams.get('query');
  const sort = urlSearchParams.get('sort') as Sort;
  const order = urlSearchParams.get('order') as OrderType;

  function compareFunc(
    elem1: string | number,
    elem2: string | number,
    direction: OrderType,
  ) {
    let copyElem1 = elem1;
    let copyElem2 = elem2;

    if (direction === 'desc') {
      copyElem1 = elem2;
      copyElem2 = elem1;
    }

    if (typeof copyElem1 === 'number' && typeof copyElem2 === 'number') {
      return copyElem1 - copyElem2;
    }

    return String(copyElem1).localeCompare(String(copyElem2));
  }

  useEffect(function () {
    setLoadingState(true);
    getPeople()
      .then(res => {
        if (res !== null) {
          setAllPeople(res);
          setPeople(res);
        }
      })
      .catch(() => {
        setLoadingError(true);
      })
      .finally(() => {
        setLoadingState(false);
      });
  }, []);

  useEffect(() => {
    let arrCopy = [...allPeople];

    if (sex !== null) {
      arrCopy = arrCopy.filter(person => {
        if (person.sex === sex) {
          return true;
        }

        return false;
      });
    }

    if (centuries.length !== 0) {
      arrCopy = arrCopy.filter(person => {
        const centuryOfBirthday = +String(person.born).slice(0, 2) + 1;

        const res = centuries.some(century => {
          if (+century === centuryOfBirthday) {
            return true;
          }

          return false;
        });

        if (res) {
          return true;
        }

        return false;
      });
    }

    if (query) {
      arrCopy = arrCopy.filter(person => {
        if (
          person.name.toLowerCase().includes(query) ||
          person.motherName?.toLowerCase().includes(query) ||
          person.fatherName?.toLowerCase().includes(query)
        ) {
          return true;
        }

        return false;
      });
    }

    setPeople(arrCopy);
  }, [sex, centuries, query, allPeople]);

  useEffect(() => {
    const arrPeopleCopy = [...people];

    if (sort) {
      arrPeopleCopy.sort((pers1, pers2) => {
        return compareFunc(pers1[sort], pers2[sort], order);
      });
    }

    setSortedPeople(arrPeopleCopy);
  }, [sort, order, people]);

  return (
    <React.Fragment>
      <h1 className="title">People Page</h1>

      <div className="box table-container">
        <div className="block">
          {loadingState && <Loader />}

          {loadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loadingState && !loadingError && (
            <React.Fragment>
              <PeopleFilters />
              <PeopleTable
                people={sortedPeople}
                highlightedPersonSlug={highlightedPersonSlug}
              />
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
