import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './PeopleTable.scss';

export const PersonName = ({ people, id }) => {
  const newId = id.slice(0, -5).replace(/-/g, ' ');

  const human = people.find(person => (
    person.name === newId
  ));

  if (human) {
    return (
      <div className="person-name">
        <div
          className={classNames({
            'red-woman': human.sex === 'f',
            'blue-man': human.sex === 'm',
          })}
        >
          {`Name: ${human.name}`}
        </div>
        <div
          className={classNames({ 'red-woman': human.motherName })}
        >
          {`Mother: ${human.motherName || 'no data'}`}
        </div>
        <div
          className={classNames({ 'blue-man': human.fatherName })}
        >
          {`Father: ${human.fatherName || 'no data'}`}
        </div>
      </div>
    );
  }

  return '';
};

PersonName.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
};
