import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { Person } from '../types';
import { Gender } from '../utils/constants';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug, sex, name } = person;

  return (
    <Link
      to={`../${slug}`}
      className={classnames({
        'has-text-danger': sex === Gender.Female,
      })}
    >
      {name}
    </Link>
  );
};
