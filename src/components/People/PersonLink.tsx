import { useContext } from 'react';
import { Person } from '../../types';
import { PeopleContext } from '../../store/PeopleContext';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

function peopleFinder(people: Person[], name: string | null) {
  return people.find(p => p.name === name);
}

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person: { name, sex } }) => {
  const { people } = useContext(PeopleContext);

  return (
    <Link
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
      to={`/people/${peopleFinder(people, name)?.slug ?? ''}`}
    >
      {name}
    </Link>
  );
};
