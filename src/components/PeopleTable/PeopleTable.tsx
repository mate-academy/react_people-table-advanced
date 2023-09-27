import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { PeopleLink } from '../PeopleLink';
import { ParentsLink } from '../ParentsLink';

const columnsNames = ['name', 'sex', 'born', 'died'];

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columnsNames.map(columnName => (
            <th key={columnName}>
              <span className="is-flex is-flex-wrap-nowrap is-capitalized">
                {columnName}
                <a href={`#/people?sort=${columnName}`}>
                  <span className="icon">
                    <i className="fas fa-sort" />
                  </span>
                </a>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': slug === person.slug,
            })}
          >
            <td>
              <PeopleLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <ParentsLink parentName={person.motherName} />
            </td>
            <td>
              <ParentsLink parentName={person.fatherName} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

/* <table
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
*/
