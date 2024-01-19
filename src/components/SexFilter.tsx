import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

const GENDERS = ['All', 'Male', 'Female'];

export const SexFilter: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';

  const getSexParam = (gender: string) => {
    switch (gender) {
      case 'Male':
        return {
          sex: 'm',
        };
      case 'Female':
        return {
          sex: 'f',
        };
      default:
        return {
          sex: null,
        };
    }
  };

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      {GENDERS.map(gender => {
        const getLinkClass = () => {
          const all = gender === 'All' && !sex;
          const male = gender === 'Male' && sex === 'm';
          const female = gender === 'Female' && sex === 'f';

          return all || male || female ? 'is-active' : '';
        };

        return (
          <NavLink
            key={gender}
            className={getLinkClass}
            to={{
              search: getSearchWith(searchParams, getSexParam(gender)),
            }}
          >
            {gender}
          </NavLink>
        );
      })}
    </p>
  );
};
