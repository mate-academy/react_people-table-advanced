/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [order, setOrder] = useState('');
  const [comparePart, setComparePart] = useState('');
  const [activeCell, setActiveCell] = useState('');

  const findParent = (parentName: string | null) => {
    const parent = people.find(p => p.name === parentName);

    return parent ? <PersonLink person={parent} /> : parentName;
  };

  const { slug } = useParams();

  const selectedPerson = slug;

  let correctPeopleList = [...people];

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

  const sort = () => {
    // if (comparePart === '') {
    //   setOrder('increase');
    //   setComparePart(`${activeCell}`);
    // } else if (comparePart !== `${activeCell}`) {
    //   setOrder('increase');
    //   setComparePart(`${activeCell}`);
    // } else if (comparePart === `${activeCell}` && order !== 'decrease') {
    //   setOrder('decrease');
    // } else if (comparePart === `${activeCell}` && order === 'decrease') {
    //   setOrder('');
    //   setComparePart('');
    // }

    switch (activeCell) {
      case 'Name':
        switch (order) {
          case 'increase':
            correctPeopleList.sort((a, b) => a.name.localeCompare(b.name));
            break;

          case 'decrease':
            correctPeopleList.sort((a, b) => b.name.localeCompare(a.name));
            break;

          default:
            correctPeopleList = [...people];
        }

        break;

      case 'Sex':
        switch (order) {
          case 'increase':
            correctPeopleList.sort((a, b) => a.sex.localeCompare(b.sex));
            break;

          case 'decrease':
            correctPeopleList.sort((a, b) => b.sex.localeCompare(a.sex));
            break;

          default:
            correctPeopleList = [...people];
        }

        break;

      case 'Born':
        switch (order) {
          case 'increase':
            correctPeopleList.sort((a, b) => a.born - b.born);
            break;

          case 'decrease':
            correctPeopleList.sort((a, b) => b.born - a.born);
            break;

          default:
            correctPeopleList = [...people];
        }

        break;

      case 'Died':
        switch (order) {
          case 'increase':
            correctPeopleList.sort((a, b) => a.died - b.died);
            break;

          case 'decrease':
            correctPeopleList.sort((a, b) => b.died - a.died);
            break;

          default:
            correctPeopleList = [...people];
        }

        break;

      default:
        correctPeopleList = [...people];
    }
  };

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
                to="#/people?sort=name"
                onClick={() => {
                  setActiveCell('Name');
                  sort();
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
        {correctPeopleList.map(person => (
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
