import React from 'react';
import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import './PersonName.scss';

type Props = {
  person: Person,
};

const PersonName: React.FC<Props> = (props) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  searchParams.set('slug', props.person.slug);

  const linkStylesClass = classNames({
    PersonLink: true,
    PersonLinkMale: props.person.sex === 'm',
    PersonLinkFemale: props.person.sex === 'f',
  });

  return (
    <NavLink
      className={linkStylesClass}
      to={`?${searchParams.toString()}`}
    >
      {props.children}
    </NavLink>
  );
};

export default PersonName;
