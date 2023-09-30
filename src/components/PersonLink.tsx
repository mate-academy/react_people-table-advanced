import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { Person } from '../types';
import { FEMALE_SEX } from '../utils/constants';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug, sex, name } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={classnames({
        'has-text-danger': sex === FEMALE_SEX,
      })}
    >
      {name}
    </Link>
  );
};
