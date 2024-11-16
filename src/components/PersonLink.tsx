import classNames from 'classnames';
import { CompletePerson } from '../types';
import { Link, useLocation, useParams } from 'react-router-dom';

type Props = {
  person: CompletePerson;
};

enum Female {
  female = 'f',
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const location = useLocation();
  const { slug } = useParams();

  const toFunc = (selectedPersonSlug: string) => ({
    pathname: `/people/${selectedPersonSlug}`,
    search: location.search,
  });

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === slug,
      })}
    >
      <td>
        <Link
          to={toFunc(person.slug)}
          className={classNames({
            'has-text-danger': person.sex === Female.female,
          })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother ? (
          <Link
            to={toFunc(person.mother?.slug)}
            className={classNames({
              'has-text-danger': person.mother.sex === Female.female,
            })}
          >
            {person.mother.name}
          </Link>
        ) : person.motherName ? (
          person.motherName
        ) : (
          '-'
        )}
      </td>
      <td>
        {person.father ? (
          <Link to={toFunc(person.father?.slug)}>{person.father.name}</Link>
        ) : person.fatherName ? (
          person.fatherName
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
