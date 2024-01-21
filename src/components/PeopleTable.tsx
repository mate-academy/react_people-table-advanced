import { useContext, useEffect } from 'react';
import { PeopleContext } from '../App';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = () => {
  const arrayOfPeople = useContext(PeopleContext);

  useEffect(() => {
    console.log(`I use context ${arrayOfPeople}`);
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
        {arrayOfPeople.map(() => (
          <tr data-cy="person">
            <td>
              <a href="#/people/pieter-haverbeke-1602">a</a>
            </td>
            <td>m</td>
            <td>1602</td>
            <td>1642</td>
            <td>-</td>
            <td>
              <a href="#/people/lieven-van-haverbeke-1570">
                Lieven van Haverbeke
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
