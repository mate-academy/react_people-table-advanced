import { Link, SetURLSearchParams, useParams } from 'react-router-dom';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Person } from '../types';

type Props = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  handleSort: () => void | Person[];
  loader: boolean;
};

export const PeopleTable: React.FC<Props> = ({
  handleSort,
  searchParams,
  setSearchParams,
  loader,
}) => {
  const { slug } = useParams();
  const [visibilePeople, setVisibilePeople] = useState<Person[]>([]);
  const params = new URLSearchParams(searchParams);

  useEffect(() => {
    const sortedPeople = handleSort();

    if (sortedPeople) {
      setVisibilePeople(sortedPeople);
    }
  }, [handleSort, searchParams, loader]);

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const handleClick = (par: string) => {
    if (!sort) {
      params.set('sort', par);
      setSearchParams(params);

      return;
    }

    if (sort === par && !order) {
      params.set('order', 'desc');
      setSearchParams(params);

      return;
    }

    params.delete('order');
    params.delete('sort');
    setSearchParams(params);
  };

  const getStyleButton = () => ({
    cursor: 'pointer',
    border: 'none',
    background: 'none',
  });

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

  const getFasClass = (name: string) =>
    classNames('fas', {
      'fa-sort': !sort || sort !== name,
      'fa-sort-up': sort === name && !order,
      'fa-sort-down': sort === name && order,
    });

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
              <span className="icon">
                <button
                  type="button"
                  onClick={() => handleClick('name')}
                  aria-label="Sort by Name"
                  className="icon-text"
                  style={getStyleButton()}
                >
                  <i className={getFasClass('name')} />
                </button>
              </span>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <button
                type="button"
                onClick={() => handleClick('sex')}
                aria-label="Sort by Name"
                className="icon-text"
                style={getStyleButton()}
              >
                <span className="icon">
                  <i className={getFasClass('sex')} />
                </span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <button
                type="button"
                onClick={() => handleClick('born')}
                aria-label="Sort by Name"
                className="icon-text"
                style={getStyleButton()}
              >
                <span className="icon">
                  <i className={getFasClass('born')} />
                </span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <button
                type="button"
                onClick={() => handleClick('died')}
                aria-label="Sort by Name"
                className="icon-text"
                style={getStyleButton()}
              >
                <span className="icon">
                  <i className={getFasClass('died')} />
                </span>
              </button>
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
