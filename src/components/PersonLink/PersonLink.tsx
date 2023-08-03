import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  people: Person[];
  name: string;
};

export const PersonLink: React.FC<Props> = ({ name, people }) => {
  const person = people.find(pers => pers.name === name);

  return (
    <>
      {person ? (
        <Link
          to={`../${person.slug}`}
          className={classNames({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </Link>
      ) : (
        name
      )}
    </>
  );
};
