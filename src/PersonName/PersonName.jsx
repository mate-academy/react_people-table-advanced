import React from 'react';
import { NavLink, useRouteMatch, useLocation } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import { validName } from '../helpers/Helpers';

export const PersonName = ({ visiblePeople }) => {
  const match = useRouteMatch('/people/:slug?');
  const location = useLocation();
  const { search } = location;
  const { slug } = match.params;
  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sortBy') || '';

  const includesName = name => visiblePeople.some(item => item.name === name);
  const includesSlug = (slugPar, slugPer) => (
    slug ? (slugPar.slice(0, -5) === slugPer.slice(0, -5)) : '');

  return (
    visiblePeople.map((person) => {
      const visiblePerson = Object.entries(person).slice(0, -1);

      return (
        <tr
          key={person.name}
          className={classNames('table_body', {
            male: person.sex === 'male',
            female: person.sex === 'female',
          })}
        >
          {visiblePerson.map(([key, value]) => (
            (['sex', 'born', 'died'].includes(key))
              ? (
                <td
                  key={key}
                  className={classNames('Person', 'person_date', {
                    check: sortBy === key
                      || includesSlug(slug, person.slug),
                  })}
                >
                  {value}
                </td>
              ) : (
                <td
                  key={key}
                  className={classNames('Person', {
                    check: sortBy === key
                     || includesSlug(slug, person.slug),
                  })}
                >
                  <NavLink
                    to={`${slug === 'new'
                      ? '/people/new'
                      : `/people/${validName(value, person.born)}${search}`}`}
                    className={classNames('link', {
                      check: sortBy === key
                        || includesSlug(slug, person.slug),
                      no_parents: !includesName(value)
                        && slug === validName(value, person.born),
                    })}
                  >
                    {value}
                  </NavLink>
                </td>
              )))}
        </tr>
      );
    })
  );
};

PersonName.propTypes = {
  visiblePeople: PropTypes.arrayOf(PropTypes.object.isRequired),
};
