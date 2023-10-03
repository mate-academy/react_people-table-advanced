import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { getPreparedPeople } from '../utils/PreparedPeople';
import { PeopleList } from './PeopleList/PeopleList';
import { CENTURY, ColumsNames, SearchParameters } from '../variables';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [searchParams] = useSearchParams();

  const query = searchParams.get(SearchParameters.Query) || '';
  const centuries = searchParams.getAll(SearchParameters.Centuries) || [];
  const sex = searchParams.get(SearchParameters.Sex) || '';
  const sort = searchParams.get(SearchParameters.Sort) || '';
  const order = searchParams.get(SearchParameters.Order) || '';

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(currentPeople => {
        setPeople(getPreparedPeople(currentPeople));
      })
      .catch(() => {
        setErrorMessage(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const visiblePeople = useMemo(() => {
    const preperedPerson = (person: string | null) => (
      person?.toLowerCase().includes(query.toLowerCase()) || false
    );

    const peopleCopy = people.filter(person => {
      let isVisible = true;

      if (query) {
        isVisible = isVisible
        && (preperedPerson(person.name)
          || preperedPerson(person.motherName)
          || preperedPerson(person.fatherName));
      }

      if (centuries.length) {
        isVisible = isVisible
        && centuries.includes(`${Math.ceil(person.born / CENTURY)}`);
      }

      if (sex) {
        isVisible = isVisible && person.sex === sex;
      }

      return isVisible;
    });

    if (sort) {
      peopleCopy.sort((personA, personB) => {
        switch (sort) {
          case ColumsNames.Name:
            return personA.name.localeCompare(personB.name);
          case ColumsNames.Sex:
            return personA.sex.localeCompare(personB.sex);
          case ColumsNames.Born:
            return personA.born - personB.born;
          case ColumsNames.Died:
            return personA.died - personB.died;
          default:
            return 0;
        }
      });
    }

    if (order) {
      peopleCopy.reverse();
    }

    return peopleCopy;
  }, [people, query, centuries, sex, sort, order]);

  const peopleLoadingError = errorMessage && !isLoading;
  const noPeopleMessage = !people.length && !isLoading && !errorMessage;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && (
              <PeopleFilters centuries={centuries} />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {peopleLoadingError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {noPeopleMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {/* <p>There are no people matching the current search criteria</p> */}

              {!!people.length && (
                <PeopleList people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
