import { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { PersonFull } from '../../services/types';
import './PersonName.scss';

interface Props {
  person: PersonFull;
}

export const PersonName: FC<Props> = ({ person }) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={cn({
        sexMale: person.sex === 'm',
        sexFemale: person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};
