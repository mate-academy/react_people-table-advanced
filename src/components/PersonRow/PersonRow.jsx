/* eslint-disable no-unreachable */
import React from 'react';
import ClassNames from 'classnames';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserType } from '../../HelpTools/types';
import { PersonName } from '../PersonName';

export const PersonRow = ({ person }) => {
  const keys = [
    'name', 'sex', 'born', 'died', 'mother', 'father',
  ];
  const { params } = useRouteMatch('/people/:personId?');
  const { personId } = params;

  return (
    <tr
      className={ClassNames('Person', {
        'is-selected': personId === person.slug,
      })}
    >
      {keys.map((key) => {
        const alternativeKey = `${key}Name`;

        switch (key) {
          case 'name':
            return (
              <td
                key={key}
              >
                <PersonName {...person} />
              </td>
            );
            break;

          case 'mother':
          case 'father':
            return (
              <td
                key={key}
              >
                {person[key]
                  ? (<PersonName {...person[key]} />)
                  : person[alternativeKey]}
              </td>
            );
            break;

          default:
            return (
              <td
                key={key}
              >
                {person[key]}
              </td>
            );
            break;
        }
      })}
    </tr>
  );
};

PersonRow.propTypes = {
  person: PropTypes.shape(UserType).isRequired,
};
