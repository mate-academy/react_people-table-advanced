import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { PersonType } from '../../types';

const FEMALE = 'f';

type Props = {
  person: PersonType;
};
export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, sex, slug } = person;
  const nameClass = classNames({
    'has-text-danger': sex === FEMALE,
  });

  return (
    <Link to={`/people/${slug}`} className={nameClass}>
      {name}
    </Link>
  );
};
