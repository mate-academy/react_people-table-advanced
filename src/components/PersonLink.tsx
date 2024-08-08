import classNames from 'classnames';
import { Person } from '../types';
import { Link, useSearchParams } from 'react-router-dom';

const FEMALE = 'f';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({
  person: { sex, slug, name },
}) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      className={classNames({
        'has-text-danger': sex === FEMALE,
      })}
      to={`${slug + '?' + searchParams}`}
    >
      {name}
    </Link>
  );
};
