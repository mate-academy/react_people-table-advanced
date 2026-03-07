import { Link, useSearchParams } from 'react-router-dom';
import { normalizeSlug } from '../helper/functionHelp';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  person: Person | undefined;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();

  if (!person) {
    return;
  }

  return (
    <Link
      to={`/people/${normalizeSlug(person?.name)}-${person?.born}?${searchParams}`}
      className={classNames({ 'has-text-danger': person?.sex === 'f' })}
    >
      {person?.name}
    </Link>
  );
};
