import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { peoplePath } from '../consts/paths';
import { SexOption } from '../types/types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug, sex, name } = person;
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={`${peoplePath}/${slug}?${searchParams.toString()}`}
      className={classNames({ 'has-text-danger': sex === SexOption.Female })}
    >
      {name}
    </Link>
  );
};
