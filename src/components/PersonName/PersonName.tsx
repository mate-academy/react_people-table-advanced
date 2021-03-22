import React, { useEffect, useState } from 'react';
import { NavLink, useRouteMatch, useLocation } from 'react-router-dom';

import { Identity } from '../../utils/type';
import './PersonName.scss';

export const PersonName: React.FC<Identity> = ({ human, slug, people }) => {
  const match = useRouteMatch();
  const { search } = useLocation();
  const [subject, setSubject] = useState<any>('');

  useEffect(() => {
    setSubject(people.find(individ => individ.name === human) || undefined);
  }, [slug]);

  return (
    <td>
      <NavLink
        key={slug}
        to={{
          pathname: `${match.url}/${slug}`,
          search,
        }}
      >
        {subject !== undefined
          ? (
            <span className={`${subject.sex === 'm' ? 'blue' : 'red'}`}>
              {human}
            </span>
          )
          : (
            <span className="black">
              {human}
            </span>
          )}
      </NavLink>
    </td>
  );
};
