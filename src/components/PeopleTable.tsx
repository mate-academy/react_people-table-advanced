import { Link, SetURLSearchParams, useParams } from 'react-router-dom';
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

  const params = new URLSearchParams(searchParams);
  const [currentParams, setCurrentParams] = useState('');

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const handleClick = (par: string) => {
    if (!sort) {
      params.set('sort', par);
      setSearchParams(params);

      setCurrentParams(`sort=${par}`);

      return;
    }

    if (sort === par && !order) {
      params.set('order', 'desc');
      setSearchParams(params);
      setCurrentParams(`sort=${par}&order=desc`);

      return;
    }

    params.delete('order');
    params.delete('sort');
    setSearchParams(params);
    setCurrentParams('');
  };

  useEffect(() => {
    const sortedPeople = handleSort();
    console.log(sortedPeople);

    if (sortedPeople) {
      setVisibilePeople(sortedPeople);
    }
  }, [handleSort, searchParams]);

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
      'fa-sort': currentParams === '',
      'fa-sort-up': currentParams === `?sort=${name}`,
      'fa-sort-down': currentParams === `?sort=${name}&order=desc`,
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
              <Link
                to={`${currentParams}`}
                onClick={() => handleClick('name')}
                aria-label="Sort by Name"
              >
                <span className="icon">
                  <i
                    className={classNames('fas', 'fa-sort', {
                      'fa-sort': currentParams === '',
                      'fa-sort-up': currentParams === '?sort=name',
                      'fa-sort-down': currentParams === '?sort=name&order=desc',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                href={`#/people${currentParams}`}
                onClick={() => handleClick('sex')}
                aria-label="Sort by Sex"
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': currentParams === '',
                      'fa-sort-up': currentParams === '?sort=sex',
                      'fa-sort-down': currentParams === '?sort=sex&order=desc',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                href={`#/people${currentParams}`}
                onClick={() => handleClick('born')}
                aria-label="Sort by Born"
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
              <a
                href={`#/people${currentParams}`}
                onClick={() => handleClick('died')}
                aria-label="Sort by Died"
              >
                <span className="icon">
                  <i className={getFasClass('died')} />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead >

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
    </table >
  );
};
