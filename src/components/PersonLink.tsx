import classNames from 'classnames';
import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';
import { GlobalContext } from './GeneralContext';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { people } = useContext(GlobalContext);
  const { user } = useParams();
  const selectedUser = user;

  const mother = people.find(human => human.name === person.motherName);
  const father = people.find(human => human.name === person.fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === selectedUser,
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={classNames({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.motherName
          && mother
          ? (
            <Link
              to={`/people/${mother.slug}`}
              className={classNames({
                'has-text-danger': mother.sex === 'f',
              })}
            >
              {mother.name}
            </Link>
          )
          : person.motherName}

        {!person.motherName && '-'}
      </td>

      <td>
        {person.fatherName
          && father
          ? (
            <Link
              to={`/people/${father.slug}`}
            >
              {father.name}
            </Link>
          )
          : person.fatherName}

        {!person.fatherName && '-'}
      </td>
    </tr>
  );
};
