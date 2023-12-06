import classNames from 'classnames';
import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';
import { GlobalContext } from './GeneralContext';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { sortedPeople, searchParams } = useContext(GlobalContext);
  const { user } = useParams();
  const selectedUser = user;

  const mother = sortedPeople.find(human => human.name === person.motherName);
  const father = sortedPeople.find(human => human.name === person.fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === selectedUser,
      })}
    >
      <td>
        <Link
          to={{
            pathname: `/people/${person.slug}`,
            search: searchParams.toString(),
          }}
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
              to={{
                pathname: `/people/${mother.slug}`,
                search: searchParams.toString(),
              }}
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
              to={{
                pathname: `/people/${father.slug}`,
                search: searchParams.toString(),
              }}
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
