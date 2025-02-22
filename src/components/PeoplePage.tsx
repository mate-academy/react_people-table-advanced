import { FiltersPanel } from './FiltersPanel';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

const sortPeople = (people: Person[], searchParams: URLSearchParams) => {
  const shouldSort = searchParams.has('sort');
  const sortingField = searchParams.get('sort') as keyof Person;
  const orderDirection = searchParams.has('order') ? -1 : 1;

  if (!shouldSort) {
    return people;
  }

  return people.sort((prev, next) => {
    let compareResult = 0;

    if (sortingField === 'born' || sortingField === 'died') {
      compareResult = prev[sortingField] - next[sortingField];
    }

    if (sortingField === 'name' || sortingField === 'sex') {
      compareResult = prev[sortingField].localeCompare(next[sortingField]);
    }

    return compareResult * orderDirection;
  });
};

const filterPeople = (people: Person[], searchParams: URLSearchParams) => {
  return people.filter(person => {
    if (searchParams.has('query')) {
      const query = searchParams.get('query') || '';
      const { name, motherName, fatherName } = person;

      const includesQuery = [name, motherName, fatherName]
        .join('')
        .toLowerCase()
        .includes(query);

      if (!includesQuery) {
        return false;
      }
    }

    if (searchParams.has('sex')) {
      if (searchParams.get('sex') !== person.sex) {
        return false;
      }
    }

    if (searchParams.has('centuries')) {
      if (
        !searchParams
          .getAll('centuries')
          .includes(Math.ceil(person.born / 100) + '')
      ) {
        return false;
      }
    }

    return true;
  });
};

const filterAndSortPeople = (
  people: Person[],
  searchParams: URLSearchParams,
) => {
  const filteredPeople = filterPeople(people, searchParams);

  return sortPeople(filteredPeople, searchParams);
};

const preparePeople = (people: Person[]): Person[] => {
  return people.map(child => {
    const mother = people.find(person => person.name === child.motherName);
    const father = people.find(person => person.name === child.fatherName);

    let result = { ...child };

    if (mother) {
      result = { ...result, mother };
    }

    if (father) {
      result = { ...result, father };
    }

    return result;
  });
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(peopleFromServer => {
        const preparedPeople = preparePeople(peopleFromServer);

        setPeople(preparedPeople);
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && <FiltersPanel />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {!people.length && !loading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!!people.length && !loading && (
                <PeopleTable
                  people={filterAndSortPeople(people, searchParams)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
