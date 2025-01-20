import React, { useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getPeopleContext } from '../contexts/ContextGetPeople';

type Props = {
  name: string;
};

export const PersonLink: React.FC<Props> = ({ name }) => {
  const { people } = useContext(getPeopleContext);
  const [searchParams] = useSearchParams();

  const person = people.find(
    personFromServer => personFromServer.name === name,
  );

  if (!person) {
    return <span>{name}</span>;
  }

  const link = [...name.toLowerCase().split(' '), person.born].join('-');

  const paramsString = searchParams.toString();
  const queryString = paramsString ? `?${paramsString}` : '';

  return (
    <Link
      to={`/people/${link}${queryString}`}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {name}
    </Link>
  );
};
