import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/getSearchWith';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sortBy = searchParams.get('sort');
  const order = searchParams.get('order');

  const isNoPeople = people.length === 0 && !isLoading && !errors;

  const visiblePeople = people.filter(person => {
    const lowerQuery = query.toLowerCase();
    const sex = searchParams.get('sex');
    const matchesSex = !sex || person.sex === sex;
    const matchesQuery =
      person.name.toLowerCase().includes(lowerQuery) ||
      person.motherName?.toLowerCase().includes(lowerQuery) ||
      person.fatherName?.toLowerCase().includes(lowerQuery);

    if (centuries.length === 0) {
      return matchesQuery && matchesSex;
    }

    const personCentury = Math.ceil(person.born / 100);
    const matchesCentury = centuries.includes(String(personCentury));

    return matchesCentury && matchesQuery && matchesSex;
  });

  const sortedPeople = [...visiblePeople].sort((personA, personB) => {
    if (sortBy === 'name') {
      if (order === 'asc') {
        return personA.name.localeCompare(personB.name);
      }

      return personB.name.localeCompare(personA.name);
    }

    if (sortBy === 'sex') {
      if (order === 'asc') {
        return personA.sex.localeCompare(personB.sex);
      }

      return personB.sex.localeCompare(personA.sex);
    }

    if (sortBy === 'born') {
      if (order === 'asc') {
        return personA.born - personB.born;
      }

      return personB.born - personA.born;
    }

    if (sortBy === 'died') {
      if (order === 'asc') {
        return personA.died - personB.died;
      }

      return personB.died - personA.died;
    }

    return 0;
  });

  const handleSort = (field: string) => {
    let newParams = getSearchWith({ searchParams, key: 'sort', value: field });

    if (sortBy !== field) {
      newParams = getSearchWith({
        searchParams: newParams,
        key: 'order',
        value: 'asc',
      });
    } else if (sortBy === field) {
      if (order === 'asc') {
        newParams = getSearchWith({
          searchParams: newParams,
          key: 'order',
          value: 'desc',
        });
      } else if (order === 'desc') {
        newParams = getSearchWith({
          searchParams: newParams,
          key: 'sort',
          value: null,
        });
        newParams = getSearchWith({
          searchParams: newParams,
          key: 'order',
          value: null,
        });
      }
    }

    setSearchParams(newParams);
  };

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(peopleFromServer => {
        const peopleWithParents = peopleFromServer.map(person => {
          const mother = peopleFromServer.find(
            parent => parent.name === person.motherName,
          );
          const father = peopleFromServer.find(
            parent => parent.name === person.fatherName,
          );

          return {
            ...person,
            father,
            mother,
          };
        });

        setPeople(peopleWithParents);
      })
      .catch(() => {
        setErrors('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : errors ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errors}
                </p>
              ) : isNoPeople ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : visiblePeople.length !== 0 ? (
                <PeopleTable
                  people={sortedPeople}
                  onSort={handleSort}
                  sortBy={searchParams.get('sort')}
                  order={searchParams.get('order')}
                />
              ) : (
                <p data-cy="noPeopleMatchingCriteria">
                  There are no people matching the current search criteria
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
