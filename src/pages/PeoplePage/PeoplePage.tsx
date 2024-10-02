import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PeopleFilters } from '../../components/PeopleFilters';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';

export const PeoplePage: React.FC = () => {
  const [searchParam] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const options = {
    sex: searchParam.get('sex'),
    query: searchParam.get('query'),
    centuries: searchParam.getAll('centuries'),
    sort: searchParam.get('sort'),
    order: searchParam.get('order'),
  };

  const preparePeople = () => {
    const { sex, query, sort, order, centuries } = options;

    return people
      .filter(person => {
        if (!sex) {
          return person;
        }

        return person.sex === sex;
      })
      .filter(person => {
        return query ? person.name.includes(query) : person;
      })
      .filter(person => {
        if (centuries.length) {
          return centuries.includes(`${Math.floor(person.born / 100) + 1}`);
        }

        return person;
      })
      .sort((sort1, sort2) => {
        if (sort === 'name' || sort === 'sex') {
          return !order
            ? sort1[sort].localeCompare(sort2[sort])
            : sort2[sort].localeCompare(sort1[sort]);
        }

        if (sort === 'born' || sort === 'died') {
          return !order
            ? +sort1[sort] - +sort2[sort]
            : +sort2[sort] - +sort1[sort];
        }

        return 0;
      });
  };

  useEffect(() => {
    setErrorMessage('');
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : errorMessage ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              ) : !people.length ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <PeopleTable people={preparePeople()} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
