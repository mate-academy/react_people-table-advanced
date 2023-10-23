import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { NotificationMessage } from '../types/NotificationMessage';
import { Notification } from './Notification';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [loadingError, setLoadingError] = useState<boolean>(false);
  const [noPeopleOnServer, setNoPeopleOnServer] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorType, setErrorType] = useState<NotificationMessage>(
    NotificationMessage.noError,
  );

  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order');

  const selectedCenturies = searchParams.getAll('centuries') || null;
  const query = searchParams.get('query') || null;

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((data) => {
        if (data.length === 0) {
          setNoPeopleOnServer(true);
          setErrorType(NotificationMessage.noPeopleMessage);
        }

        setPeople(data);
        setIsLoading(false);
      })
      .catch(() => {
        setLoadingError(true);
        setErrorType(NotificationMessage.peopleLoadingError);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const findName = (string: string | null, prompt: string) => {
    return string?.toLowerCase().includes(prompt.toLowerCase());
  };

  const filteredPeople = React.useMemo(() => {
    let filter = [...people];

    if (selectedCenturies && selectedCenturies.length > 0) {
      filter = people.filter(
        (person) => selectedCenturies.includes(
          Math.ceil(person.born / 100).toString(),
        ),
      );
    }

    if (query) {
      filter = filter.filter(
        (person) => findName(person.name, query)
          || findName(person.motherName, query)
          || findName(person.fatherName, query),
      );
    }

    if (sort) {
      switch (sort) {
        case 'name':
          if (order === 'asc') {
            filter = filter.sort((a, b) => a.name.localeCompare(b.name));

            searchParams.set('order', 'desc');
          } else if (order === 'desc') {
            filter = filter.sort((a, b) => b.name.localeCompare(a.name));
          }

          break;

        case 'sex':
          if (order === 'asc') {
            filter = filter.sort((a, b) => a.sex.localeCompare(b.sex));
          } else if (order === 'desc') {
            filter = filter.sort((a, b) => b.sex.localeCompare(a.sex));
          }

          break;

        case 'born':
          if (order && order === 'asc') {
            filter = filter.sort((a, b) => a.born - b.born);
          } else if (order === 'desc') {
            filter = filter.sort((a, b) => b.born - a.born);
          }

          break;

        case 'died':
          if (order && order === 'asc') {
            filter = filter.sort((a, b) => a.died - b.died);
          } else if (order === 'desc') {
            filter = filter.sort((a, b) => b.died - a.died);
          }

          break;

        default:
          break;
      }
    }

    return filter;
  }, [people, selectedCenturies, query, sort, order]);

  const showTable = !isLoading && !loadingError
  && !noPeopleOnServer && filteredPeople.length > 0;
  const showCriteriaError = !isLoading && !loadingError
  && !noPeopleOnServer && filteredPeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !loadingError && !noPeopleOnServer && (
              <PeopleFilters query={query} />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && (loadingError || noPeopleOnServer) && (
                <Notification type={errorType} />
              )}

              {showTable && (
                <PeopleTable
                  people={filteredPeople}
                />
              )}

              {showCriteriaError && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
