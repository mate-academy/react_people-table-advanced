import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'bulma';

import {
  useRouteMatch,
  useLocation,
  NavLink,
  Route,
  useHistory,
} from 'react-router-dom';
import classNames from 'classnames';
import { PersonRow } from '../PersonRow';

export function PeopleTable({ people }) {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const sortedBy = searchParams.get('sortBy') || '';
  const [sortedPeople, setSortedPeople] = useState(people);
  const history = useHistory();
  const { slug } = useRouteMatch('/people/:slug?');
  const { url } = useRouteMatch();

  useEffect(() => {
    switch (sortedBy) {
      case 'name':
      case 'sex':
        setSortedPeople([...sortedPeople.sort(
          (currentValue, nextValue) => (
            currentValue[sortedBy].localeCompare(nextValue[sortedBy])),
        )]);
        break;

      case 'born':
      case 'died':
        setSortedPeople([...sortedPeople.sort(
          (currentValue, nextValue) => (
            currentValue[sortedBy] - nextValue[sortedBy]),
        )]);
        break;

      default:
        setSortedPeople(people);
    }
  }, [sortedBy, people]);

  const findPersonByName = (personName) => {
    const foundPerson = sortedPeople.find(({ name }) => name === personName);

    if (foundPerson) {
      return {
        pathname: `${url}/${foundPerson.slug}`,
        search,
      };
    }

    return false;
  };

  const sortBy = (type) => {
    searchParams.set('sortBy', type);
    history.push(`?${searchParams.toString()}`);
  };

  return (
    <>
      <Route path={`${url}/:slug`}>
        <PersonRow people={sortedPeople} />
      </Route>
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th
              className={classNames({ is_selected: sortedBy === 'name' })}
              onClick={() => sortBy('name')}
            >
              Name
            </th>
            <th
              className={classNames({ is_selected: sortedBy === 'sex' })}
              onClick={() => sortBy('sex')}
            >
              Sex
            </th>
            <th
              className={classNames({ is_selected: sortedBy === 'born' })}
              onClick={() => sortBy('born')}
            >
              Born
            </th>
            <th
              className={classNames({ is_selected: sortedBy === 'died' })}
              onClick={() => sortBy('died')}
            >
              Died
            </th>
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>
        <tbody>
          {sortedPeople.map(person => (
            <tr
              key={person.slug}
              className={slug === person.slug ? 'back' : ''}
            >
              <td>
                <NavLink
                  to={{
                    pathname: `${url}/${person.slug}`,
                    search,
                  }}
                  className={
                    classNames(
                      {
                        man: person.sex === 'm',
                        woman: person.sex === 'f',
                      },
                    )
                  }
                >
                  {person.name}
                </NavLink>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td
                className={classNames(
                  { woman: sortedPeople.some(
                    ({ name }) => name === person.motherName,
                  ) },
                )}
              >
                {
                  findPersonByName(person.motherName)
                    ? (
                      <NavLink
                        to={findPersonByName(person.motherName)}
                        className="woman"
                      >
                        {person.motherName}
                      </NavLink>
                    )
                    : person.motherName
                }
              </td>
              <td
                className={classNames(
                  { woman: sortedPeople.some(
                    ({ name }) => name === person.motherName,
                  ) },
                )}
              >
                {
                  findPersonByName(person.fatherName)
                    ? (
                      <NavLink
                        to={findPersonByName(person.fatherName)}
                        className="man"
                      >
                        {person.fatherName}
                      </NavLink>
                    )
                    : person.fatherName
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      sex: PropTypes.string.isRequired,
      born: PropTypes.number.isRequired,
      died: PropTypes.number.isRequired,
      motherName: PropTypes.string,
      fatherName: PropTypes.string,
    }),
  ).isRequired,
};
