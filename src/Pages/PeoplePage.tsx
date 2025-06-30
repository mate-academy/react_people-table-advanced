import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [peopleData, setPeopleData] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);

    getPeople()
      .then(setPeopleData)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const rawPeopleList = useMemo(() => {
    return peopleData.map(person => {
      const father =
        peopleData.find(male => male.name === person.fatherName) || null;
      const mother =
        peopleData.find(fem => fem.name === person.motherName) || null;

      return {
        ...person,
        father,
        mother,
      };
    });
  }, [peopleData]);

  const preparedPeopleList = (list: Person[], filters: URLSearchParams) => {
    const sex = filters.get('sex');
    const centuries = filters.getAll('centuries');
    const query = filters.get('query');
    const sort = filters.get('sort');
    const order = filters.get('order');

    let preparedList = [...list];

    if (sex) {
      preparedList = preparedList.filter(person => person.sex === sex);
    }

    if (centuries.length) {
      preparedList = preparedList.filter(person => {
        const century = Math.ceil(person.born / 100).toString();

        return centuries.includes(century);
      });
    }

    if (query) {
      const normalizedQuery = query.toLowerCase();

      preparedList = preparedList.filter(person =>
        [person.name, person.motherName, person.fatherName].some(name =>
          name?.toLowerCase().includes(normalizedQuery),
        ),
      );
    }

    if (sort) {
      preparedList = preparedList.sort((person1, person2) => {
        switch (sort) {
          case 'name':
            return person1.name.localeCompare(person2.name);
          case 'sex':
            return person1.sex.localeCompare(person2.sex);
          case 'born':
            return person1.born - person2.born;
          case 'died':
            return person1.died - person2.died;
          default:
            return 0;
        }
      });
    }

    return order ? preparedList.reverse() : preparedList;
  };

  const peopleList = preparedPeopleList(rawPeopleList, searchParams);

  const isSuccessUpload = !isError && !isLoading;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isSuccessUpload && !!rawPeopleList?.length && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && !isLoading && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {isSuccessUpload && !rawPeopleList?.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isSuccessUpload && !peopleList.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {isSuccessUpload && !!peopleList.length && (
                <PeopleTable peopleList={peopleList} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
