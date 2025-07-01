import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

function sort(list: Person[], sortField: string | null, backOrder: boolean) {
  list.sort((a, b) => {
    switch (sortField) {
      case 'name':
      case 'sex':
        return !backOrder
          ? a[sortField].localeCompare(b[sortField])
          : b[sortField].localeCompare(a[sortField]);
      case 'born':
      case 'died':
        return !backOrder
          ? a[sortField] - b[sortField]
          : b[sortField] - a[sortField];
      default:
        return 0;
    }
  });
}

function filter(list: Person[], key: string, value: string[]): Person[] {
  switch (key) {
    case 'sex':
      return list.filter(item => item.sex === value[0]);
    case 'centuries':
      return list.filter(
        item =>
          value.includes('' + (Math.floor(item.born / 100) + 1)) ||
          value.includes('' + (Math.floor(item.died / 100) + 1)),
      );
    case 'query':
      return list.filter(
        item =>
          item.name.toLowerCase().includes(value[0].toLowerCase().trim()) ||
          item.fatherName
            ?.toLowerCase()
            .includes(value[0].toLowerCase().trim()) ||
          item.motherName
            ?.toLowerCase()
            .includes(value[0].toLowerCase().trim()),
      );
    default:
      return list;
  }
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const filtredPeopleList = useMemo(() => {
    if (Array.from(searchParams.keys()).length === 0) {
      return people;
    }

    let newList = [...people];

    if (searchParams.get('sort')) {
      sort(
        newList,
        searchParams.get('sort'),
        searchParams.get('order') !== null,
      );
    }

    const filtredParams = searchParams
      .keys()
      .filter(k => k !== 'sort' && k !== 'order');

    filtredParams.forEach(param => {
      newList = filter(newList, param, searchParams.getAll(param) || '');
    });

    return newList;
  }, [people, searchParams]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    getPeople()
      .then(result => {
        setPeople(
          result.map(person => {
            const mother = result.find(p => p.name === person.motherName);
            const father = result.find(p => p.name === person.fatherName);

            return {
              ...person,
              ...(mother && { mother }),
              ...(father && { father }),
            };
          }),
        );
      })
      .catch(() => {
        setError(true);
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
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!loading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && !error && people.length > 0 && (
                <PeopleTable people={filtredPeopleList} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
