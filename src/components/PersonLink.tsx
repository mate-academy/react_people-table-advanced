import { NavLink } from 'react-router-dom';
import { Person } from '../types/Person';
import { FC } from 'react';
import classNames from 'classnames';

interface Props {
  person: Person | null;
}


export const PersonLink: FC<Props> = ({ person }) => {
  if (!person) {
    return <>-</>
  }

  return (
    <NavLink to={`/people/${person.slug}`} className={classNames({ 'has-text-danger' : person.sex === 'f'})} >{person.name}</NavLink>
  );
};
