import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[],
};

enum Sex {
  male = 'm',
  female = 'f',
}

enum Params {
  sex = 'sex',
  sort = 'sort',
  query = 'query',
  order = 'order',
  centuries = 'centuries',
}

enum SortParams {
  sex = 'sex',
  name = 'name',
  born = 'born',
  died = 'died',
  desc = 'desc',
}

export const PeopleTable: React.FC<Props> = ({
  people,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get(Params.sex) || '';
  const sort = searchParams.get(Params.sort) || '';
  const query = searchParams.get(Params.query) || '';
  const order = searchParams.get(Params.order) || '';
  const centuries = searchParams.getAll(Params.centuries) || '';

  const filterPeopleByCenturies = (men: Person[]) => {
    if (centuries.length > 0) {
      return men.filter(person => {
        const century = Math.ceil(person.born / 100);

        return centuries.includes(century.toString());
      });
    }

    return men;
  };

  const filterPeopleByQuery = (men: Person[]) => {
    const queryLowerRegister = query.toLowerCase();

    return men.filter(person => {
      if (person.name.toLowerCase().includes(queryLowerRegister)) {
        return person;
      }

      if (person.fatherName?.toLowerCase().includes(queryLowerRegister)) {
        return person;
      }

      if (person.motherName?.toLowerCase().includes(queryLowerRegister)) {
        return person;
      }

      return false;
    });
  };

  const fullFiltrationPeople = (men: Person[]) => {
    switch (sex) {
      case Sex.female: {
        const result = men.filter(person => person.sex === Sex.female);

        return filterPeopleByCenturies(filterPeopleByQuery(result));
      }

      case Sex.male: {
        const result = men.filter(person => person.sex === Sex.male);

        return filterPeopleByCenturies(filterPeopleByQuery(result));
      }

      default:
        return filterPeopleByCenturies(filterPeopleByQuery(men));
    }
  };

  const handleClickSortPeople = (
    event: React.MouseEvent<HTMLSpanElement>,
    value: string,
  ) => {
    event.preventDefault();

    switch (value) {
      case SortParams.name: {
        const params = new URLSearchParams(searchParams);

        if (params.has(Params.order) && sort === SortParams.name) {
          params.delete(Params.order);
          params.delete(Params.sort);
          setSearchParams(params);

          break;
        }

        if (params.has(Params.order) && sort !== SortParams.name) {
          params.delete(Params.order);
          params.set(Params.sort, SortParams.name);
          setSearchParams(params);

          break;
        }

        if (sort === SortParams.name) {
          params.set(Params.order, SortParams.desc);
          setSearchParams(params);

          break;
        }

        params.set(Params.sort, SortParams.name);
        setSearchParams(params);

        break;
      }

      case SortParams.sex: {
        const params = new URLSearchParams(searchParams);

        if (params.has(Params.order) && sort === SortParams.sex) {
          params.delete(Params.order);
          params.delete(Params.sort);
          setSearchParams(params);

          break;
        }

        if (params.has(Params.order) && sort !== SortParams.sex) {
          params.delete(Params.order);
          params.set(Params.sort, SortParams.sex);
          setSearchParams(params);

          break;
        }

        if (sort === SortParams.sex) {
          params.set(Params.order, SortParams.desc);
          setSearchParams(params);

          break;
        }

        params.set(Params.sort, SortParams.sex);
        setSearchParams(params);

        break;
      }

      case SortParams.born: {
        const params = new URLSearchParams(searchParams);

        if (params.has(Params.order) && sort === SortParams.born) {
          params.delete(Params.order);
          params.delete('sort');
          setSearchParams(params);

          break;
        }

        if (params.has(Params.order) && sort !== SortParams.born) {
          params.delete(Params.order);
          params.set(Params.sort, SortParams.born);
          setSearchParams(params);

          break;
        }

        if (sort === SortParams.born) {
          params.set(Params.order, SortParams.desc);
          setSearchParams(params);

          break;
        }

        params.set(Params.sort, SortParams.born);
        setSearchParams(params);

        break;
      }

      case SortParams.died: {
        const params = new URLSearchParams(searchParams);

        if (params.has(Params.order) && sort === SortParams.died) {
          params.delete(Params.order);
          params.delete('sort');
          setSearchParams(params);

          break;
        }

        if (params.has(Params.order) && sort !== SortParams.died) {
          params.delete(Params.order);
          params.set(Params.sort, SortParams.died);
          setSearchParams(params);

          break;
        }

        if (sort === SortParams.died) {
          params.set(Params.order, SortParams.desc);
          setSearchParams(params);

          break;
        }

        params.set(Params.sort, SortParams.died);
        setSearchParams(params);

        break;
      }

      default: {
        break;
      }
    }
  };

  const sortPeople = (men: Person[]) => {
    switch (sort) {
      case SortParams.name: {
        if (order) {
          return men.sort((person1, person2) => {
            return person2.name.localeCompare(person1.name);
          });
        }

        return men.sort((person1, person2) => {
          return person1.name.localeCompare(person2.name);
        });
      }

      case SortParams.sex: {
        if (order) {
          return men.sort((person1, person2) => {
            return person2.sex.localeCompare(person1.sex);
          });
        }

        return men.sort((person1, person2) => {
          return person1.sex.localeCompare(person2.sex);
        });
      }

      case SortParams.born: {
        if (order) {
          return men.sort((person1, person2) => {
            return person2.born - person1.born;
          });
        }

        return men.sort((person1, person2) => {
          return person1.born - person2.born;
        });
      }

      case SortParams.died: {
        if (order) {
          return men.sort((person1, person2) => {
            return person2.died - person1.died;
          });
        }

        return men.sort((person1, person2) => {
          return person1.died - person2.died;
        });
      }

      default:
        return men;
    }
  };

  const filtredPeople = sortPeople(fullFiltrationPeople(people));

  return (
    <>
      {!filtredPeople.length ? (
        <p>There are no people matching the current search criteria</p>
      ) : (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <Link to="/people">
                    <span
                      className="icon"
                      onClick={(e) => handleClickSortPeople(e, SortParams.name)}
                      aria-hidden="true"
                    >
                      <i className={classNames('fas', {
                        'fa-sort': sort !== SortParams.name,
                        'fa-sort-up': sort === SortParams.name && !order,
                        'fa-sort-down': sort === SortParams.name && !!order,
                      })}
                      />
                    </span>
                  </Link>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <Link to="/people">
                    <span
                      className="icon"
                      onClick={(e) => handleClickSortPeople(e, SortParams.sex)}
                      aria-hidden="true"
                    >
                      <i className={classNames('fas', {
                        'fa-sort': sort !== SortParams.sex,
                        'fa-sort-up': sort === SortParams.sex && !order,
                        'fa-sort-down': sort === SortParams.sex && !!order,
                      })}
                      />
                    </span>
                  </Link>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <Link to="/people">
                    <span
                      className="icon"
                      onClick={(e) => handleClickSortPeople(e, SortParams.born)}
                      aria-hidden="true"
                    >
                      <i className={classNames('fas', {
                        'fa-sort': sort !== SortParams.born,
                        'fa-sort-up': sort === SortParams.born && !order,
                        'fa-sort-down': sort === SortParams.born && !!order,
                      })}
                      />
                    </span>
                  </Link>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <Link to="/people">
                    <span
                      className="icon"
                      onClick={(e) => handleClickSortPeople(e, SortParams.died)}
                      aria-hidden="true"
                    >
                      <i className={classNames('fas', {
                        'fa-sort': sort !== SortParams.died,
                        'fa-sort-up': sort === SortParams.died && !order,
                        'fa-sort-down': sort === SortParams.died && !!order,
                      })}
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
            {filtredPeople.map(person => (
              <PersonLink key={person.slug} person={person} people={people} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
