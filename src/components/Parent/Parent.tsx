import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useTableContext } from '../Context';

interface Props {
  theMother?: string;
  parentName: string | null;
}

export const Parent: React.FC<Props> = ({ theMother, parentName }) => {
  const {
    necessaryPeople,
    peoples,
  } = useTableContext();

  const foundParent = necessaryPeople
    && necessaryPeople.find(wantedParent => wantedParent.name === parentName);

  return (
    <td>
      {foundParent ? (
        peoples.map(wantedParent => {
          if (wantedParent.name === parentName) {
            return (
              <NavLink
                key={wantedParent.slug}
                to={`${wantedParent.slug}`}
                className={classNames({
                  'has-text-danger': theMother,
                })}
              >
                {wantedParent.name}
              </NavLink>
            );
          }

          return null;
        })
      ) : (
        parentName ?? '-'
      )}
    </td>
  );
};
