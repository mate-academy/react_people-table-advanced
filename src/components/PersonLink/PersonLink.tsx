import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person | null;
  parentName?: string
};

export const PersonLink: React.FC<Props> = ({ person, parentName }) => (
  <>
    {person ? (
      <Link
        to={`../${person.slug}`}
        className={classNames(
          { 'has-text-danger': person.sex === 'f' },
        )}
      >
        {person.name}
      </Link>
    ) : (
      <>
        {parentName}
      </>
    )}

  </>

);
