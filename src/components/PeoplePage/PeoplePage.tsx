/* eslint-disable max-len */
import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { SomethingWrongError } from '../../errorsAndNotifications/SomethingWrongError';
import { NoPeopleOnTheServer } from '../../errorsAndNotifications/NoPeopleOnTheServer';
import { SearchCriteriaNotification } from '../../errorsAndNotifications/SearchCriteriaNotification';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loadingError, setLoadingError] = useState(false);
  const [peopleOnLoading, setPeopleOnLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  // const timer = useRef(0);

  const query = searchParams.get('query') || '';
  const genders = searchParams.getAll('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    const loadingPeople = async () => {
      try {
        setPeopleOnLoading(true);

        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch (err) {
        setLoadingError(true);
      } finally {
        setPeopleOnLoading(false);
      }
    };

    loadingPeople();
  }, []);

  const handleInputQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInputQuery = event.target.value.trim();

    const newSearchParams = new URLSearchParams(searchParams);

    // if (timer.current) {
    //   clearTimeout(timer.current);
    // }

    if (newInputQuery) {
      newSearchParams.set('query', newInputQuery);
    } else {
      newSearchParams.delete('query');
    }

    setSearchParams(newSearchParams);

    // timer.current = window.setTimeout(() => {}, 500);
  };

  const filteredPeople = useMemo(() => {
    let peopleList = [...people];

    if (query) {
      const lowerQuery = query.toLowerCase();

      peopleList = peopleList.filter(person =>
        [person.name, person.motherName, person.fatherName]
          .filter(Boolean)
          .some(value => value?.toLowerCase().includes(lowerQuery)),
      );
    }

    if (genders.length > 0) {
      peopleList = peopleList.filter(person => genders.includes(person.sex));
    }

    if (centuries.length > 0) {
      peopleList = peopleList.filter(person => {
        const bornCentury = Math.ceil(person.born / 100);

        return centuries.includes(String(bornCentury));
      });
    }

    if (sort) {
      peopleList.sort((a, b) => {
        const aValue = a[sort as keyof Person];
        const bValue = b[sort as keyof Person];

        if (aValue === null || aValue === undefined) {
          return 1;
        }

        if (bValue === null || bValue === undefined) {
          return -1;
        }

        if (aValue < bValue) {
          return order === 'desc' ? 1 : -1;
        }

        if (aValue > bValue) {
          return order === 'desc' ? -1 : 1;
        }

        return 0;
      });
    }

    return peopleList;
  }, [people, query, genders, centuries, sort, order]);

  const { slug } = useParams();

  const isLoadingError = loadingError && !peopleOnLoading;
  const isPeopleEmpty =
    people.length === 0 && !loadingError && !peopleOnLoading;
  const isEverythingOk = people.length > 0 && !loadingError && !peopleOnLoading;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isEverythingOk && (
              <PeopleFilters handleInputQuery={handleInputQuery} />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {peopleOnLoading && <Loader />}

              {isLoadingError && <SomethingWrongError />}

              {isPeopleEmpty && <NoPeopleOnTheServer />}

              {isEverythingOk && (
                <PeopleTable people={filteredPeople} slug={slug} />
              )}

              {isEverythingOk && filteredPeople.length === 0 && (
                <SearchCriteriaNotification />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
