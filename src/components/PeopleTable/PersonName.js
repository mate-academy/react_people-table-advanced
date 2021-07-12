import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './PeopleTable.scss';

export const PersonName = ({ people, id }) => {
  const { name, sex, motherName, fatherName } = people.find(person => (
    person.name === id.slice(0, -5).replace(/-/g, ' ')
  ));

  return (
    <div className="person-name">
      <div
        className={classNames({
          'red-woman': sex === 'f',
          'blue-man': sex === 'm',
        })}
      >
        {`Name: ${name}`}
      </div>
      <div
        className={classNames({ 'red-woman': motherName })}
      >
        {`Mother: ${motherName || 'no data'}`}
      </div>
      <div
        className={classNames({ 'blue-man': fatherName })}
      >
        {`Father: ${fatherName || 'no data'}`}
      </div>
    </div>
  );
};

PersonName.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
};
