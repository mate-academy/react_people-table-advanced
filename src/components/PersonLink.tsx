import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { PeopleLink } from '../types/PeopleLink';

export const PersonLink: React.FC<PeopleLink> = ({
  name, slugCurrent, sex,
}) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{ pathname: `../${slugCurrent}`, search: searchParams.toString() }}
      className={
        classNames(
          { 'has-text-danger': sex === 'f' },
        )
      }
    >
      {name}
    </Link>
  );
};
