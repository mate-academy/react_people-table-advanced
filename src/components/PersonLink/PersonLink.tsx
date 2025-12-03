import cn from 'classnames';
import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  personData: Person | string;
  people: Person[];
}
export const PersonLink: React.FC<Props> = ({ personData, people }) => {
  let p: Person | null;
  const [searchParams] = useSearchParams();

  if (typeof personData === 'string') {
    if (personData !== '-') {
      p = people.find(pers => pers.name === personData) || null;
    } else {
      p = null;
    }
  } else {
    p = personData;
  }

  return (
    <td>
      {p === null && typeof personData === 'string' ? (
        personData
      ) : (
        <NavLink
          to={{
            pathname: `/people/${p?.slug}`,
            search: searchParams.toString(),
          }}
          // to={`/people/${p?.slug}`}
          className={() =>
            cn({ 'has-text-danger': p?.sex === 'f' ? true : false })
          }
        >
          {p?.name}
        </NavLink>
      )}
    </td>
  );
};
