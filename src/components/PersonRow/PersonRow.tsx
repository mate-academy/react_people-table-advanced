import React from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Person } from '../../types/Person';
import './PersonRow.scss';

interface Props {
  person: Person;
  sortColumn: string | null;
}

export const PersonRow: React.FC<Props> = ({ person, sortColumn }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  return (
    <tr className={person.slug === slug ? 'PersonRow--active' : ''}>
      <td
        className={`PersonRow__cell
          ${sortColumn === 'name' ? 'PersonRow__cell--active' : ''}
        `}
      >
        <Link
          to={`${person.slug}?${searchParams}`}
          className={`PersonRow__link--${person.sex === 'f' ? 'female' : 'male'}`}
        >
          {person.name}
        </Link>
      </td>
      <td
        className={`PersonRow__cell
            ${sortColumn === 'sex' ? 'PersonRow__cell--active' : ''}
        `}
      >
        {person.sex}
      </td>
      <td
        className={`PersonRow__cell
          ${sortColumn === 'born' ? 'PersonRow__cell--active' : ''}
        `}
      >
        {person.born}
      </td>
      <td
        className={`PersonRow__cell
          ${sortColumn === 'died' ? 'PersonRow__cell--active' : ''}
        `}
      >
        {person.died}
      </td>
      {person.motherName && (
        <td className="PersonRow__cell">
          <Link
            to={`${person.mother?.slug}?${searchParams}`}
            className={
              person.mother?.slug
                ? 'PersonRow__link--female'
                : 'PersonRow__link'
            }
          >
            {person.motherName}
          </Link>
        </td>
      )}
      {person.fatherName && (
        <td className="PersonRow__cell">
          <Link
            to={`${person.father?.slug}?${searchParams}`}
            className={
              person.mother?.slug
                ? 'PersonRow__link--male'
                : 'PersonRow__link'
            }
          >
            {person.fatherName}
          </Link>
        </td>
      )}
    </tr>
  );
};
