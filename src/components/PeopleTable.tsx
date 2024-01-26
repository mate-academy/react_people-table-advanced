import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { PeopleContext } from '../App';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = ({ filtering, slug }) => {
  const arrayOfPeople = useContext(PeopleContext);
  const [activePersonSlug, setActivePersonSlug] = useState('');

  const peopleWithParents = filtering.map((person) => ({
    ...person,
    mother: arrayOfPeople.find((p) => p.name === person.fatherName) ? (
      <Link
        to={`#/${arrayOfPeople.find((p) => p.name === person.motherName)?.slug}`}
        onClick={() => setActivePersonSlug(arrayOfPeople.find((p) => p.name === person.motherName)?.slug)}
      >
        {person.motherName}
      </Link>
    ) : (
      null
    ),
    father: arrayOfPeople.find((p) => p.name === person.fatherName) ? (
      <Link
        to={`#/${arrayOfPeople.find((p) => p.name === person.fatherName)?.slug}`}
        onClick={() => setActivePersonSlug(arrayOfPeople.find((p) => p.name === person.fatherName)?.slug)}
      >
        {person.fatherName}
      </Link>
    ) : (
      null
    ),
  }));

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
              <a href="#/people?sort=name">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href="#/people?sort=sex">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a href="#/people?sort=born&amp;order=desc">
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#/people?sort=died">
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
        {peopleWithParents.map((person) => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames('tr', {
              'has-background-warning': person.slug === activePersonSlug
            })}
          >
            <td>
              <Link
                to={`#/${person.slug}`}
                onClick={() => setActivePersonSlug(person.slug)}
                className={classNames({
                  'has-text-danger': person.sex === 'f'
                })}
              >
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <td>{person.mother || <p>{person.motherName}</p>}</td>
            </td>
            <td>
              <td>{person.father || <p>{person.fatherName}</p>}</td>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
