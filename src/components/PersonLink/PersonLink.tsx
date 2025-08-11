import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Sex } from '../../types/Sex';
import { Person } from '../../types/Person';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({
  person: { name, sex, slug },
}) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={slug + '?' + searchParams.toString()}
      className={cn({ 'has-text-danger': sex === Sex.Female })}
    >
      {name}
    </Link>
  );
};
