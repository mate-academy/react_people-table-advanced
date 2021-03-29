import React from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';

export function PersonRow({
  people,
}) {
  const match = useRouteMatch();
  const person = people.find(human => human.slug === match.params.slug);

  return (
    <>
      {person && (
        <ul className="person__list">
          <li>
            {
              `Name: ${person.name}`
            }
          </li>
          <li>
            {
              `Sex: ${person.sex === 'f' ? 'famale' : 'male'}`
            }
          </li>
          <li>
            {
              `Born:: ${person.born}`
            }
          </li>
          <li>
            {
              `Died: ${person.died}`
            }
          </li>
          <li>
            {
              `Mother: ${person.motherName}`
            }
          </li>
          <li>
            {
              `Father: ${person.fatherName}`
            }
          </li>
        </ul>
      )}
    </>
  );
}

PersonRow.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape({
      born: PropTypes.number.isRequired,
      died: PropTypes.number.isRequired,
      sex: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
