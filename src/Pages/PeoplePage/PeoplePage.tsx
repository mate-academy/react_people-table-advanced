import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { PeopleFilters } from '../../components/PeopleFilters';
import { PeopleTable } from '../../components/PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleLoadingError } from '../PeopleLoadingError';
import { NoPeopleMessage } from '../NoPeopleMessage';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [setIsLoading, setHasError, setPeople]);

  const getFilteredPeople = (data: Person[],
    filterCallback: (person: Person) => boolean) => {
    return data.filter(filterCallback);
  };

  const filterByName = (person: Person): boolean => {
    const name = person.name ? person.name.toLowerCase() : '';
    const motherName = person.motherName ? person.motherName.toLowerCase() : '';
    const fatherName = person.fatherName ? person.fatherName.toLowerCase() : '';

    return (
      name.includes(query.toLowerCase())
      || motherName.includes(query.toLowerCase())
      || fatherName.includes(query.toLowerCase())
    );
  };

  const filterBySex = (person: Person) => {
    return !sex || person.sex === sex;
  };

  const filterByCenturies = (person: Person) => {
    return centuries.length === 0 || centuries.includes(`${Math.ceil(person.born / 100)}`);
  };

  const sortPeople = (data: Person[]) => {
    switch (sort) {
      case 'name':
      case 'sex':
        return data.sort((p1, p2) => p1[sort].localeCompare(p2[sort]));

      case 'born':
      case 'died':
        return data.sort((p1, p2) => p1[sort] - p2[sort]);

      default:
        return data;
    }
  };

  const reversePeopleOrder = (data: Person[]) => {
    return order ? data.reverse() : data;
  };

  const getPreparedPeople = () => {
    let result = [...people];

    result = getFilteredPeople(result, filterByName);
    result = getFilteredPeople(result, filterBySex);
    result = getFilteredPeople(result, filterByCenturies);
    result = sortPeople(result);
    result = reversePeopleOrder(result);

    return result;
  };

  const preparedPeople = getPreparedPeople();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          {hasError && (<PeopleLoadingError />)}

          {people.length === 0 && !isLoading && (<NoPeopleMessage />)}

          {preparedPeople.length === 0 && !isLoading && (
            <p>There are no people matching the current search criteria</p>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!!preparedPeople.length && (
                <PeopleTable people={preparedPeople} />
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
