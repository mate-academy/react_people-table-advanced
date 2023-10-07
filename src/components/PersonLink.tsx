import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { FEMALE_SEX } from '../utils/constants';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { sex, name, slug } = person;
  const [searchParams] = useSearchParams();

  return (
    <td>
      <Link
        to={`../${slug}?${searchParams.toString()}`}
        state={{ personSlug: slug }}
        className={classNames({
          'has-text-danger': sex === FEMALE_SEX,
        })}
      >
        {name}
      </Link>
    </td>
  );
};
