import { Link, SetURLSearchParams, useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Person } from '../types';

type Props = {
  handleSort: () => Person[] | undefined;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
};

export const PeopleTable: React.FC<Props> = ({
  handleSort,
  searchParams,
  setSearchParams,
}) => {
  const [visibilePeople, setVisibilePeople] = useState<Person[]>([]);
  const { slug } = useParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const params = new URLSearchParams(searchParams);
  // const [currentParams, setCurrentParams] = useState(params.toString());

  const handleClick = (par: string) => {
    if (!sort) {
      params.set('sort', par);
      // setCurrentParams(params.toString());
      setSearchParams(params);

      return;
    }

    if (sort === par && !order) {
      params.append('order', 'desc');
      setSearchParams(params);
      // setCurrentParams(params.toString());

      return;
    }

    params.delete('order');
    params.delete('sort');
    setSearchParams(params);
    // setCurrentParams(params.toString());
  };

  useEffect(() => {
    const sortedPeople = handleSort();

    if (sortedPeople) {
      setVisibilePeople(sortedPeople);
    }
  }, [handleSort]);

  const getLinkPerson = (name: string) => {
    const foundPerson = visibilePeople.find((p: Person) => p.name === name);

    if (foundPerson) {
      return (
        <Link
          className={classNames({ 'has-text-danger': foundPerson.sex === 'f' })}
          to={`/people/${foundPerson.slug}`}
        >
          {name}
        </Link>
      );
    }

    return name;
  };

  // const getLink = () => {
  //   return setTimeout(() => {
  //     return `/people?${currentParams}`;
  //   }, 200);
  // };

  // const link = getLink();

  return (
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
                to={{ search: params.toString() }}
                onClick={() => handleClick('name')}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href="#/people?sort=sex" onClick={() => handleClick('sex')} >

                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                href="#/people?sort=born&amp;order=desc"
                onClick={() => handleClick('born')}
              >
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#/people?sort=died" onClick={() => handleClick('died')}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visibilePeople.map((person: Person, index) => (
          <tr
            data-cy="person"
            key={person.slug ?? index}
            className={classNames({
              'has-background-warning': slug === person.slug,
            })}
          >
            <td>{getLinkPerson(person.name)}</td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{getLinkPerson(person.motherName || '-')}</td>
            <td>{getLinkPerson(person.fatherName || '-')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
