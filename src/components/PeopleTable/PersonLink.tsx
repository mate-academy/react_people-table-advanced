import React from 'react';
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { Gender } from '../../types/Gender';

const MALE_SEX = Gender.Male;
const isMale = (sex: string) => {
  return sex === MALE_SEX;
};

type Props = {
  person: Person
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();
  const { name, slug, sex } = person;

  return (
    <Link
      className={classNames({
        'has-text-danger': !isMale(sex),
      })}
      to={{
        pathname: `../${slug}`,
        search: searchParams.toString(),
      }}
    >
      {name}
    </Link>
  );
};
