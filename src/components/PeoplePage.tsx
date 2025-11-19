import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { ErrorMessage } from '../types/ErrorMessage';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(
    ErrorMessage.none,
  );
  const [loading, setLoading] = useState(true);

  const getCentury = (year: number) => {
    return `${Math.ceil(year / 100)}`;
  };

  // load people
  useEffect(() => {
    getPeople()
      .then(items => {
        setPeople(items);
        setFilteredPeople(items);
      })
      .catch(() => {
        setErrorMessage(ErrorMessage.undefinedError);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  // function to filter people in PeopleFilter component
  const filterPeople = (query = '', centuries: string[] = [], sex?: string) => {
    const normalizedQuery = query.trim().toLowerCase();

    const result = people.filter(person => {
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

    setFilteredPeople(result);

    if (!result.length) {
      setErrorMessage(
        people.length ? ErrorMessage.noMatched : ErrorMessage.noPeopleOnServer,
      );
    } else {
      setErrorMessage(ErrorMessage.none);
    }
  };

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  // people to display, updating when filtred people or sort or order change
  const sortedPeople = useMemo(() => {
    if (!sort) {
      return filteredPeople;
    }

    const direction = order ? -1 : 1;
    const sexWeight = (sex: Person['sex']) => (sex === 'f' ? 0 : 1);

    return [...filteredPeople].sort((personA, personB) => {
      switch (sort) {
        case 'born':
          return (personB.born - personA.born) * direction;

        case 'died':
          return (personB.died - personA.died) * direction;
        case 'sex':
          return (sexWeight(personA.sex) - sexWeight(personB.sex)) * direction;

        case 'name':
          return (
            personA.name
              .toLowerCase()
              .localeCompare(personB.name.toLowerCase()) * direction
          );
        default:
          return 0;
      }
    });
  }, [filteredPeople, sort, order]);

  const shouldShowFilters =
    !loading &&
    ![ErrorMessage.noPeopleOnServer, ErrorMessage.undefinedError].includes(
      errorMessage,
    );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {shouldShowFilters && <PeopleFilters filterPeople={filterPeople} />}
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
                <PeopleTable people={sortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
