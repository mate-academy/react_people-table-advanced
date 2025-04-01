/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { PeopleStateType } from '../PeoplePage';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { getPeopleListFromDB } from './service';
import { TableStateType } from './types';
import { ParentLink } from './ParentLink';

type Props = {
  setPeopleState: React.Dispatch<React.SetStateAction<PeopleStateType>>;
  peopleState: PeopleStateType;
};

export const PeopleTable: React.FC<Props> = ({
  setPeopleState,
  peopleState,
}) => {
  const { user } = useParams();
  const [tableState, setTableState] = useState<TableStateType>({
    initialList: [],
    listToShow: [],
  });

  const { initialList, listToShow } = tableState;

  useEffect(() => {
    getPeopleListFromDB(
      getPeople,
      peopleState,
      setPeopleState,
      tableState,
      setTableState,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {listToShow.map(person => {
          const { name, sex, born, died, slug } = person;

          return (
            <tr
              key={name}
              data-cy="person"
              className={classNames({
                'has-background-warning': user === slug,
              })}
            >
              <td>
                <a
                  className={classNames({ 'has-text-danger': sex === 'f' })}
                  href={`#/people/${slug}`}
                >
                  {name}
                </a>
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                <ParentLink
                  person={person}
                  parentSex="f"
                  peopleList={initialList}
                />
              </td>
              <td>
                <ParentLink
                  person={person}
                  parentSex="m"
                  peopleList={initialList}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
