import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../types';
import { PersonSex } from '../types/PersonSex';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug, sex } = person;
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={`/people/${slug}?${searchParams.toString()}`}
      className={classNames({ 'has-text-danger': sex === PersonSex.Female })}
    >
      {person.name}
    </Link>
  );
};
