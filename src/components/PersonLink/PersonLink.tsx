import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { PersonType } from '../../types';

type Props = {
  person: PersonType;
};
export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, sex, slug } = person;
  const nameClass = classNames({
    'has-text-danger': sex === 'f',
  });

  return (
    <Link to={`/people/${slug}`} className={nameClass}>
      {name}
    </Link>
  );
};
