import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { textColorByGender } from '../../functions/textColorByGender';
import { Human } from '../../types/Human';

interface Props {
  person: Human | null;
}

export const PersonName: FC<Props> = ({ person }) => {
  const personName = person ? person.name : 'not found';
  const styleClasses = classNames('link', textColorByGender(person));

  if (person) {
    return (
      <NavLink
        to={person.slug}
        className={styleClasses}
      >
        {personName}
      </NavLink>
    );
  }

  return (
    <p className={styleClasses}>
      {personName}
    </p>
  );
};
