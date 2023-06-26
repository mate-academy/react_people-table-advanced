import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

import { Person } from '../types';

import { getPeople } from '../api';
import { getPeopleWithParents } from '../utils/peopleModifier';
import { normalize } from '../utils/normailzer';
import { getCenturyFromYear } from '../utils/getCenturyString';

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

  const sortBy = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';
  const filterBySex = searchParams.get('sex') || '';
  const filterQuery = searchParams.get('query') || '';
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

  const filteredWithQuery = useMemo(() => {
    return people.filter(({ name, motherName, fatherName }) => {
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
  }, [filterQuery, people]);

  const filteredBySex = useMemo(() => {
    switch (filterBySex) {
      case 'm':
        return filteredWithQuery.filter(person => person.sex === 'm');

      case 'f':
        return filteredWithQuery.filter(person => person.sex === 'f');

      case '':
      default:
        return filteredWithQuery;
    }
  }, [filterBySex, filteredWithQuery]);

  const filteredByCentury = useMemo(() => {
    if (!filterByCenturies.length) {
      return filteredBySex;
    }

    return filteredBySex.filter(person => {
      return filterByCenturies.includes(getCenturyFromYear(person.born));
    });
  }, [filteredBySex, filterByCenturies]);

  const sortedPeople = useMemo(() => {
    const copy = [...filteredByCentury];

    switch (sortBy) {
      case 'name':
        return copy.sort((a, b) => a.name.localeCompare(b.name));

      case 'sex':
        return copy.sort((a, b) => a.sex.localeCompare(b.sex));

      case 'born':
        return copy.sort((a, b) => a.born - b.born);

      case 'died':
        return copy.sort((a, b) => a.died - b.died);

      case '':
      default:
        return filteredByCentury;
    }
  }, [sortBy, filteredByCentury]);

  const sortedWithOrder = useMemo(() => {
    switch (sortOrder) {
      case 'desc':
        return [...sortedPeople].reverse();

      case '':
      default:
        return sortedPeople;
    }
  }, [sortOrder, sortedPeople]);

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
                filterQuery={filterQuery}
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

                    {!sortedWithOrder.length
                      ? (
                        <p>
                          There are no people
                          matching the current search criteria
                        </p>
                      ) : (
                        <PeopleTable
                          people={sortedWithOrder}
                          selectedPerson={slug}
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
