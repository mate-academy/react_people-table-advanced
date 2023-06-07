import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from './types/Person';

type Props = {
  person: Person | undefined,
  name: string,
  sex: string | undefined,
  setActivePerson(person: Person): void,
};

export const PersonLink: React.FC<Props> = ({
  person,
  name,
  sex,
  setActivePerson,
}) => (
  <Link
    className={classNames('', { 'has-text-danger': sex === 'f' })}
    to={`/people/${person?.slug}`}
    onClick={() => {
      if (person) {
        setActivePerson(person);
      }
    }}
  >
    {name}
  </Link>
);
