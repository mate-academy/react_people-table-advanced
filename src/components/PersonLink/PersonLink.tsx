import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { Sex } from '../../types/Sex';

interface Props {
  person: Person;
}
export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={`../${person.slug}?${searchParams.toString()}`}
      className={classNames(
        { 'has-text-danger': person.sex === Sex.Female },
      )}
    >
      {person.name}
    </Link>
  );
};
