/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { updatePeopleListFromDB } from '../service';
import { ParentLink } from './ParentLink';
import { Context } from '../../../utils/context/MainContext';
import { FetchDBParams } from '../types';
import { PeopleTableProps } from '../PeopleTable';

export const TableBody: React.FC<PeopleTableProps> = ({
  setPeoplePageState,
  peoplePageState,
}) => {
  const { user } = useParams();
  const contextData = useContext(Context);

  const {
    context: { listToShow },
  } = contextData;

  const fetchDBParams: FetchDBParams = {
    contextData,
    setPeoplePageState,
    peoplePageState,
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => updatePeopleListFromDB(fetchDBParams), []);

  return (
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
              <ParentLink person={person} parentSex="f" />
            </td>
            <td>
              <ParentLink person={person} parentSex="m" />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
