import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../types';
import { PersonSex } from '../enums';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();

  const { name, sex, slug } = person;

  return (
    <Link
      className={classNames({ 'has-text-danger': sex === PersonSex.Female })}
      to={{
        pathname: `../${slug}`,
        search: searchParams.toString(),
      }}
    >
      {name}
    </Link>
  );
};
