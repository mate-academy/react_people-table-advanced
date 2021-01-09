import React from 'react';
import { NavLink, useRouteMatch, useLocation } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import { validName } from '../helpers/Helpers';

export const PersonName = ({ people }) => {
  const match = useRouteMatch('/people/:slug?');
  const location = useLocation();
  const { search } = location;
  const { slug } = match.params;
  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sortBy') || '';

  const includesName = name => people.some(item => item.name === name);
  const includesSlug = (slugPar, slugPer) => (
    slug ? slugPer.includes(slugPar.slice(0, -5)) : ''
  );

  return (
    people.map(person => (
      <tr
        key={person.name}
        className={classNames('table_body', {
          male: person.sex === 'm',
          female: person.sex === 'f',
        })}
      >
        {Object.entries(person).slice(0, -1).map(per => (
          (per[0] === 'sex' || per[0] === 'born' || per[0] === 'died')
            ? (
              <td
                key={per[0]}
                className={classNames('Person', 'person_date', {
                  checked: includesSlug(slug, person.slug) || sortBy === per[0],
                })}
              >
                {per[0] && per[0] !== 'sex'
                  ? per[1]
                  : `${per[1] === 'f' ? 'female' : 'male'}` }
              </td>
            ) : (
              <td
                key={per[0]}
                className={classNames('Person', {
                  checked: sortBy === per[0] || includesSlug(slug, person.slug),
                })}
              >
                <NavLink
                  to={`${slug === 'new'
                    ? '/people/new'
                    : `/people/${per[0] === 'name'
                      ? person.slug
                      : validName(per[1], person.born)}${search}`}`}
                  className={classNames('link', {
                    checked: sortBy === per[0]
                      || includesSlug(slug, person.slug),
                    no_parents: slug && slug === validName(per[1], person.born)
                      ? !includesName(per[1])
                      : '',
                  })}
                >
                  {per[1]}
                </NavLink>
              </td>
            )))}
      </tr>
    ))
  );
};

PersonName.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object.isRequired),
};
