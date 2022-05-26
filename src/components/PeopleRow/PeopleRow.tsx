import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { People } from '../../types/people';
import './PeopleRow.scss';

type Props = {
  person: People,
  selectedSort: string,
};

const PeopleRow:React.FC<Props> = ({ person, selectedSort }) => {
  const location = useLocation();

  return (
    <>
      <td
        className={(selectedSort === 'name') ? 'is-selected' : ''}
      >
        <Link
          to={{
            pathname: `/people/${person.slug}`,
            search: location.search,
          }}
          className={(person.sex === 'm') ? 'man' : 'woman'}
        >
          {person.name}
        </Link>
      </td>
      <td
        className={(selectedSort === 'sex') ? 'is-selected' : ''}
      >
        {person.sex}
      </td>
      <td
        className={(selectedSort === 'born') ? 'is-selected' : ''}
      >
        {person.born}
      </td>
      <td
        className={(selectedSort === 'died') ? 'is-selected' : ''}
      >
        {person.died}
      </td>
      <td>
        {person.mother
          ? (
            <Link
              to={{
                pathname: `/people/${person.mother.slug}`,
                search: location.search,
              }}
              className="woman"
            >
              {person.motherName}
            </Link>
          )
          : (
            <>
              {person.motherName}
            </>
          )}
      </td>
      <td>
        {person.father
          ? (
            <Link
              to={{
                pathname: `/people/${person.father.slug}`,
                search: location.search,
              }}
              className="man"
            >
              {person.fatherName}
            </Link>
          )
          : (
            <>
              {person.fatherName}
            </>
          )}
      </td>
    </>
  );
};

export default PeopleRow;
