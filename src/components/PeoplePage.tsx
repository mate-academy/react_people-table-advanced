import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { Sort } from '../types/Sort';

interface FilterParams {
  sex: string | null;
  query: string | null;
  centuries: string[];
  sortField: string | null;
  order: boolean;
}

function getFilteredPeople(
  people: Person[],
  { sex, query, centuries, sortField, order }: FilterParams,
) {
  let preparedList = [...people];

  if (sex) {
    preparedList = preparedList.filter(person => {
      switch (sex) {
        case 'f':
          return person.sex === 'f';
        case 'm':
          return person.sex === 'm';
        default:
          return true;
      }
    });
  }

  if (query) {
    preparedList = preparedList.filter(
      person =>
        person.name.toLowerCase().includes(query.toLowerCase()) ||
        person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
        person.fatherName?.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (centuries.length > 0) {
    preparedList = preparedList.filter(person => {
      const personCentury = Math.ceil(+person.born / 100);

      return centuries.includes(`${personCentury}`);
    });
  }

  if (sortField) {
    preparedList = preparedList.sort((person1, person2) => {
      switch (sortField) {
        case Sort.Name:
        case Sort.Sex:
          return person1[sortField].localeCompare(person2[sortField]);
        case Sort.Born:
        case Sort.Died:
          return +person1[sortField] - +person2[sortField];
        default:
          return 0;
      }
    });
  }

  if (order) {
    preparedList.reverse();
  }

  return preparedList;
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setErrorMessage('');
    setIsloading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsloading(false));
  }, []);

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sortField = searchParams.get('sort') || '';
  const order = searchParams.has('order');

  const filteredPeople = getFilteredPeople(people, {
    sex,
    query,
    centuries,
    sortField,
    order,
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {people.length === 0 && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {people.length > 0 && <PeopleTable people={filteredPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
