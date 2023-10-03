import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';
import { Gender } from '../../types/Gender';

type Props = {
  person: Person
};

export const PersonLink: React.FC<Props> = ({ person }) => (
  <Link
    to={`${person.slug}`}
    replace
    className={classNames({
      'has-text-danger': person.sex === Gender.Female,
      'has-text-link': person.sex === Gender.Male,
    })}
  >
    {person.name}
  </Link>
);
