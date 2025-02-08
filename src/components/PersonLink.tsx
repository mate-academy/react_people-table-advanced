import classNames from 'classnames';
import { Person } from '../types';
import { Link } from 'react-router-dom';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug, name, sex } = person;

  return (
    <Link to={slug} className={classNames({ 'has-text-danger': sex === 'f' })}>
      {name}
    </Link>
  );
};
