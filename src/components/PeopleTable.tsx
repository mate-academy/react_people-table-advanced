import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const [visiblePeople, setVisiblePeople] = useState<Person[]>([...people]);

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  let nameValue = 0;
  let sexValue = 0;
  let bornValue = 0;
  let diedValue = 0;

  const handleMotherFind = (motherName: string | undefined) => {
    const mother = people.find(person => person.name === motherName)?.slug;

    return mother;
  };

  const handleFatherFind = (fatherName: string | undefined) => {
    const father = people.find(person => person.name === fatherName)?.slug;

    return father;
  };

  function filterPeople() {
    let filteredPeople = [...people];

    if (centuries.length > 0) {
      filteredPeople = filteredPeople.filter(person => centuries
        .find(century => +century === Math.floor((person.born - 1) / 100 + 1)));
    }

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (query) {
      filteredPeople = filteredPeople
        .filter(person => person.name.toLocaleLowerCase().includes(query)
          || person.motherName?.toLocaleLowerCase().includes(query)
          || person.fatherName?.toLocaleLowerCase().includes(query));
    }

    return filteredPeople;
  }

  function sortPeople(filteredPeople: Person[]) {
    let sortedPeople = [...filteredPeople];

    switch (sort) {
      case 'name':
        sortedPeople = sortedPeople
          .sort((person1, person2) => person1.name.localeCompare(person2.name));
        break;

      case 'sex':
        sortedPeople = sortedPeople
          .sort((person1, person2) => person1.sex.localeCompare(person2.sex));
        break;

      case 'born':
        sortedPeople = sortedPeople
          .sort((person1, person2) => person1.born - person2.born);
        break;

      case 'died':
        sortedPeople = sortedPeople
          .sort((person1, person2) => person1.died - person2.died);
        break;

      default:
        break;
    }

    if (order) {
      sortedPeople = [...sortedPeople].reverse();
    }

    return sortedPeople;
  }

  useEffect(() => {
    const filteredPeople = filterPeople();
    const sortedPeople = sortPeople(filteredPeople);

    setVisiblePeople(sortedPeople);
  }, [searchParams]);

  function makeSearchParams(key: string) {
    switch (key) {
      case 'name':
        if (sort === 'name' && order) {
          nameValue = 0;

          return {
            search: getSearchWith(searchParams, { sort: null, order: null }),
          };
        }

        if (sort === 'name') {
          nameValue = 2;

          return {
            search: getSearchWith(searchParams,
              { sort: 'name', order: 'decr' }),
          };
        }

        nameValue = 1;

        return {
          search: getSearchWith(searchParams, { sort: 'name', order: null }),
        };

      case 'sex':
        if (sort === 'sex' && order) {
          sexValue = 0;

          return {
            search: getSearchWith(searchParams, { sort: null, order: null }),
          };
        }

        if (sort === 'sex') {
          sexValue = 2;

          return {
            search: getSearchWith(searchParams, { sort: 'sex', order: 'decr' }),
          };
        }

        sexValue = 1;

        return {
          search: getSearchWith(searchParams, { sort: 'sex', order: null }),
        };

      case 'born':
        if (sort === 'born' && order) {
          bornValue = 0;

          return {
            search: getSearchWith(searchParams, { sort: null, order: null }),
          };
        }

        if (sort === 'born') {
          bornValue = 2;

          return {
            search: getSearchWith(searchParams,
              { sort: 'born', order: 'decr' }),
          };
        }

        bornValue = 1;

        return {
          search: getSearchWith(searchParams, { sort: 'born', order: null }),
        };

      case 'died':
        if (sort === 'died' && order) {
          diedValue = 0;

          return {
            search: getSearchWith(searchParams,
              { sort: null, order: null }),
          };
        }

        if (sort === 'died') {
          diedValue = 2;

          return {
            search: getSearchWith(searchParams,
              { sort: 'died', order: 'decr' }),
          };
        }

        diedValue = 1;

        return {
          search: getSearchWith(searchParams, { sort: 'died', order: null }),
        };

      default:
        return searchParams.toString();
    }
  }

  return (
    <>
      {visiblePeople.length > 0
        ? (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Name
                    <Link
                      to={makeSearchParams('name')}
                    >
                      <span className="icon">
                        <i
                          className={classNames(
                            'fas',
                            { 'fa-sort': nameValue === 1 },
                            { 'fa-sort-up': nameValue === 2 },
                            { 'fa-sort-down': nameValue === 0 },
                          )}
                        />
                      </span>
                    </Link>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Sex
                    <Link
                      to={makeSearchParams('sex')}
                    >
                      <span className="icon">
                        <i
                          className={classNames(
                            'fas',
                            { 'fa-sort': sexValue === 1 },
                            { 'fa-sort-up': sexValue === 2 },
                            { 'fa-sort-down': sexValue === 0 },
                          )}
                        />
                      </span>
                    </Link>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Born
                    <Link
                      to={makeSearchParams('born')}
                    >
                      <span className="icon">
                        <i
                          className={classNames(
                            'fas',
                            { 'fa-sort': bornValue === 1 },
                            { 'fa-sort-up': bornValue === 2 },
                            { 'fa-sort-down': bornValue === 0 },
                          )}
                        />
                      </span>
                    </Link>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Died
                    <Link
                      to={makeSearchParams('died')}
                    >
                      <span className="icon">
                        <i
                          className={classNames(
                            'fas',
                            { 'fa-sort': diedValue === 1 },
                            { 'fa-sort-up': diedValue === 2 },
                            { 'fa-sort-down': diedValue === 0 },
                          )}
                        />
                      </span>
                    </Link>
                  </span>
                </th>

                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>

            <tbody>
              {visiblePeople.map(person => (
                <PersonLink
                  key={person.slug}
                  person={person}
                  onMotherFind={handleMotherFind}
                  onFatherFind={handleFatherFind}
                />
              ))}
            </tbody>
          </table>
        ) : <p> There are no people matching the current search criteria </p>}
    </>
  );
};
