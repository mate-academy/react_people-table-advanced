import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';
import { PeopleFilters } from '../PeopleFilters';
import {
  ERROR_MESSAGE,
  FEMALE_SEX,
  MALE_SEX,
  NO_MATCHING_PEOPLE,
  NO_PEOPLE_ON_SERVER,
  ALL_CENTURIES,
} from '../../utils/constants';
import { getPreparedPeople, getSortPeople } from '../../utils/helpers';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || ALL_CENTURIES;
  const query = searchParams.get('query') as string;
  const order = searchParams.get('order');
  const sort = searchParams.get('sort') as string;

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);
  const preparedPeople = getPreparedPeople(people);

  const peopleWithParents = preparedPeople.filter(person => {
    if (searchParams.toString().includes(MALE_SEX)) {
      return person.sex === MALE_SEX;
    }

    if (searchParams.toString().includes(FEMALE_SEX)) {
      return person.sex === FEMALE_SEX;
    }

    return person;
  }).filter(person => {
    if (centuries.length !== 0) {
      return centuries.includes(Math.ceil(person.born / 100).toString());
    }

    return person;
  }).filter(person => {
    if (query !== null) {
      return person.name.toLowerCase().includes(query.toLowerCase())
        || person.motherName?.toLowerCase().includes(query.toLowerCase())
        || person.fatherName?.toLowerCase().includes(query.toLowerCase());
    }

    return person;
  })
    .sort((a, b) => {
      if (sort === 'name') {
        return getSortPeople(a.name, b.name, order);
      }

      if (sort === 'sex') {
        return getSortPeople(a.sex, b.sex, order);
      }

      if (sort === 'born') {
        return getSortPeople(a.born, b.born, order);
      }

      if (sort === 'died') {
        return getSortPeople(a.died, b.died, order);
      }

      return 0;
    });

  const noPeopleMessage = !people.length && !isLoading && !isError;
  const noMatchingPeople = !isLoading && !peopleWithParents.length;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading
              && <PeopleFilters /> }
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError
                && <p data-cy="peopleLoadingError">{ERROR_MESSAGE}</p>}

              {noPeopleMessage
                && (
                  <p data-cy="noPeopleMessage">
                    {NO_PEOPLE_ON_SERVER}
                  </p>
                )}

              {noMatchingPeople
                && (
                  <p>
                    {NO_MATCHING_PEOPLE}
                  </p>
                )}

              {!isLoading && (
                <PeopleTable
                  people={peopleWithParents}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
