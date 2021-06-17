import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import { PersonName } from '../PersonName';

export const PersonRow = (
  { name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
    father,
    mother },
) => {
  const { pathname } = useLocation();

  return (
    <tr
      name={slug}
      className={`${pathname.includes(slug) && 'is-selected'}`}
    >

      <td>
        <PersonName
          name={name}
          sex={sex}
          slug={slug}
        />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        <PersonName
          name={fatherName}
          sex="m"
          slug={father ? father.slug : ''}
        />
      </td>
      <td>
        <PersonName
          name={motherName}
          sex="f"
          slug={mother ? mother.slug : ''}
        />
      </td>
    </tr>
  );
};

PersonRow.propTypes = {
  name: PropTypes.string.isRequired,
  sex: PropTypes.string.isRequired,
  born: PropTypes.number.isRequired,
  died: PropTypes.number.isRequired,
  fatherName: PropTypes.string.isRequired,
  motherName: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  father: PropTypes.shape({
    slug: PropTypes.string,
  }),
  mother: PropTypes.shape({
    slug: PropTypes.string,
  }),
};

PersonRow.defaultProps = {
  father: '',
  mother: '',
};
