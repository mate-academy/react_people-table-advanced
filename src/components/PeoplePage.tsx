import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

import { Person } from '../types';

import { getPeople } from '../api';
import { getPeopleWithParents } from '../utils/peopleModifier';
import { normalize } from '../utils/normailze';
import { getCenturyFromYear } from '../utils/getCentury';

enum ErrorType {
  none,
  loadingError,
  noPeopleOnServer,
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorType, setErrorType] = useState<ErrorType>(ErrorType.none);

  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sort');
  const sortOrder = searchParams.get('order');
  const filterBySex = searchParams.get('sex');
  const filterQuery = searchParams.get('query');
  const filterByCenturies = searchParams.getAll('centuries');

  const { slug = '' } = useParams();

  const loadPeople = async () => {
    try {
      const peopleFromServer = await getPeople();

      if (!peopleFromServer.length) {
        setErrorType(ErrorType.noPeopleOnServer);

        return;
      }

      const peopleWithParents = getPeopleWithParents(peopleFromServer);

      setPeople(peopleWithParents);
    } catch {
      setErrorType(ErrorType.loadingError);
    } finally {
      setIsLoaded(true);
    }
  };

  const sortedPeople = useMemo(() => {
    const copy = [...people];

    switch (sortBy) {
      case 'name':
        return copy.sort((a, b) => a.name.localeCompare(b.name));

      case 'sex':
        return copy.sort((a, b) => a.sex.localeCompare(b.sex));

      case 'born':
        return copy.sort((a, b) => a.born - b.born);

      case 'died':
        return copy.sort((a, b) => a.died - b.died);

      default:
        return people;
    }
  }, [sortBy, people]);

  const sortedWithOrder = useMemo(() => {
    switch (sortOrder) {
      case 'desc':
        return [...sortedPeople].reverse();

      case null:
      default:
        return sortedPeople;
    }
  }, [sortOrder, sortedPeople]);

  const filteredBySex = useMemo(() => {
    switch (filterBySex) {
      case 'm':
        return sortedWithOrder.filter(person => person.sex === 'm');

      case 'f':
        return sortedWithOrder.filter(person => person.sex === 'f');

      case null:
      default:
        return sortedWithOrder;
    }
  }, [filterBySex, sortedWithOrder]);

  const filterByCentury = useMemo(() => {
    if (!filterByCenturies.length) {
      return filteredBySex;
    }

    return filteredBySex.filter(person => {
      return filterByCenturies.includes(getCenturyFromYear(person.born));
    });
  }, [filteredBySex, filterByCenturies]);

  const filteredWithQuery = useMemo(() => {
    if (!filterQuery) {
      return filterByCentury;
    }

    return filterByCentury.filter(({ name, motherName, fatherName }) => {
      const query = normalize(filterQuery);

      const values = [
        normalize(name),
        normalize(motherName),
        normalize(fatherName),
      ];

      if (values.some(value => value.includes(query))) {
        return true;
      }

      return false;
    });
  }, [filterQuery, filterByCentury]);

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isLoaded && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                filterBySex={filterBySex}
                filterByCenturies={filterByCenturies}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {!isLoaded
                ? <Loader />
                : (
                  <>
                    {errorType === ErrorType.loadingError && (
                      <p
                        data-cy="peopleLoadingError"
                        className="has-text-danger"
                      >
                        Something went wrong
                      </p>
                    )}

                    {errorType === ErrorType.noPeopleOnServer && (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
                    )}

                    {!filteredWithQuery.length
                      ? (
                        <p>
                          There are no people
                          matching the current search criteria
                        </p>
                      ) : (
                        <PeopleTable
                          people={filteredWithQuery}
                          selectedPerson={slug}
                          sortBy={sortBy}
                          sortOrder={sortOrder}
                        />
                      )}
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
