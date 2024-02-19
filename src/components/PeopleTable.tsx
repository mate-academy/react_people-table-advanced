/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useState, useEffect } from 'react';
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

const makeGoodList = (people: Person[], order: string, cell: string) => {
  const correctPeopleList = people;

  switch (cell) {
    case 'Name':
      switch (order) {
        case 'increase':
          correctPeopleList.sort((a: Person, b: Person) =>
            a.name.localeCompare(b.name),
          );

          return correctPeopleList;

        case 'decrease':
          correctPeopleList.sort((a: Person, b: Person) =>
            b.name.localeCompare(a.name),
          );

          return correctPeopleList;

        default:
          return correctPeopleList;
      }

      break;

    case 'Sex':
      switch (order) {
        case 'increase':
          correctPeopleList.sort((a: Person, b: Person) =>
            a.sex.localeCompare(b.sex),
          );

          return correctPeopleList;

        case 'decrease':
          correctPeopleList.sort((a: Person, b: Person) =>
            b.sex.localeCompare(a.sex),
          );

          return correctPeopleList;

        default:
          return correctPeopleList;
      }

      break;

    case 'Born':
      switch (order) {
        case 'increase':
          correctPeopleList.sort((a, b) => a.born - b.born);

          return correctPeopleList;

        case 'decrease':
          correctPeopleList.sort((a, b) => b.born - a.born);

          return correctPeopleList;

        default:
          return correctPeopleList;
      }

      break;

    case 'Died':
      switch (order) {
        case 'increase':
          correctPeopleList.sort((a, b) => a.died - b.died);

          return correctPeopleList;

        case 'decrease':
          correctPeopleList.sort((a, b) => b.died - a.died);

          return correctPeopleList;

        default:
          return correctPeopleList;
      }

      break;

    default:
      return correctPeopleList;
  }
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [order, setOrder] = useState('');
  const [comparePart, setComparePart] = useState('');
  const [activeCell, setActiveCell] = useState('');

  const findParent = (parentName: string | null) => {
    const parent = people.find(p => p.name === parentName);

    return parent ? <PersonLink person={parent} /> : parentName;
  };

  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const { slug } = useParams();

  const selectedPerson = slug;

  useEffect(() => {
    if (comparePart === '') {
      setOrder('increase');
      setComparePart(`${activeCell}`);
    } else if (comparePart !== `${activeCell}`) {
      setOrder('increase');
      setComparePart(`${activeCell}`);
    } else if (comparePart === `${activeCell}` && order !== 'decrease') {
      setOrder('decrease');
    } else if (comparePart === `${activeCell}` && order === 'decrease') {
      setOrder('');
      setComparePart('');
    }
  }, [activeCell, comparePart, order]);

  const sort = () => {};

  const handlePartChange = (field: string) => {
    const params = new URLSearchParams(searchParams);

    params.set(`${field}`, order);

    setSearchParams(params);
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <p> {pathname} </p>
      <p> {searchParams} </p>
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <Link
                to="?sort=name"
                onClick={() => {
                  handlePartChange('name');
                  setActiveCell('Name');
                  makeGoodList(people, order, activeCell);
                }}
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
              <Link to="#/people?sort=sex" onClick={() => sort()}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to="#/people?sort=born&amp;order=desc"
                onClick={() => sort()}
              >
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to="#/people?sort=died" onClick={() => sort()}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={cn({
              'has-background-warning': person.slug === selectedPerson,
            })}
          >
            <td>
              <Link
                to={`../${person.slug}`}
                className={cn({
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td> {person.motherName ? findParent(person.motherName) : '-'} </td>
            <td> {person.fatherName ? findParent(person.fatherName) : '-'} </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
