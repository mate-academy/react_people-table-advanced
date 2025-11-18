import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { ErrorMessage } from '../types/ErrorMessage';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [visiblePeople, setVisiblePeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(
    ErrorMessage.none,
  );
  const [loading, setLoading] = useState(true);

  const getCentury = (year: number) => {
    return `${Math.ceil(year / 100)}`;
  };

  useEffect(() => {
    getPeople()
      .then(items => {
        setPeople(items);
        setVisiblePeople(items);
      })
      .catch(() => {
        setErrorMessage(ErrorMessage.undefinedError);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filterPeople = (query: string, centuries: string[], sex?: string) => {
    const normalizedQuery = query.trim().toLowerCase();

    const filteredPeople = people.filter(person => {
      if (centuries?.length && !centuries.includes(getCentury(person.died))) {
        return false;
      }

      if (sex && person.sex !== sex) {
        return false;
      }

      const name = person.name.toLowerCase();
      const fatherName = person.fatherName?.toLowerCase();
      const motherName = person.motherName?.toLowerCase();

      return (
        name.includes(normalizedQuery) ||
        fatherName?.includes(normalizedQuery) ||
        motherName?.includes(normalizedQuery)
      );
    });

    setVisiblePeople(filteredPeople);

    if (!filteredPeople.length) {
      setErrorMessage(
        people.length ? ErrorMessage.noMatched : ErrorMessage.noPeopleOnServer,
      );
    } else {
      setErrorMessage(ErrorMessage.none);
    }
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && !errorMessage && (
              <PeopleFilters filterPeople={filterPeople} />
            )}
          </div>
          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {errorMessage === ErrorMessage.undefinedError && (
                <p data-cy="peopleLoadingError">
                  {ErrorMessage.undefinedError}
                </p>
              )}

              {errorMessage === ErrorMessage.noPeopleOnServer && (
                <p data-cy="noPeopleMessage">{ErrorMessage.noPeopleOnServer}</p>
              )}

              {errorMessage === ErrorMessage.noMatched && (
                <p>{ErrorMessage.noMatched}</p>
              )}

              {errorMessage === ErrorMessage.none && !loading && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
