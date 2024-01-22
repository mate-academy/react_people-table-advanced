import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { PeopleContext } from '../App';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = () => {
  const arrayOfPeople = useContext(PeopleContext);
  const [activePersonSlug, setActivePersonSlug] = useState('');

  const getParentSlug = (parentName) => {
    const findParent = arrayOfPeople
      .find((person) => person.name === parentName);

    if (findParent) {
      setActivePersonSlug(findParent?.slug);
    }
  };

  const handleActivePersonSlug = (slug) => {
    setActivePersonSlug(slug);
    getParentSlug(slug);
    console.log(activePersonSlug)
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
        {arrayOfPeople.map((person) => (
          <tr key={person.slug} data-cy="person">
            <td>
              <NavLink onClick={() => handleActivePersonSlug(person.slug)} to={`#/people/${person.slug}`} className={classNames({ 'has-text-danger': person.sex === 'f' })}>{person.name}</NavLink>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {arrayOfPeople.find((p) => p.name === person.motherName) ? (
                <NavLink onClick={() => handleActivePersonSlug(person.motherName)} to={`#/people/${activePersonSlug}`}>
                  {person.motherName}
                </NavLink>
              ) : (
                <p> {person.motherName}</p>
              )}
            </td>
            <td>
              {arrayOfPeople.find((p) => p.name === person.fatherName) ? (
                <NavLink onClick={() => handleActivePersonSlug(person.fatherName)} to={`#/people/${activePersonSlug}`}>
                  {person.fatherName}
                </NavLink>
              ) : (
                <p> {person.fatherName}</p>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
