import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  people: Person[];
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const personMother = people.find(
    personFromList => person.motherName === personFromList.name,
  );

  const personFather = people.find(
    personFromList => person.fatherName === personFromList.name,
  );

  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <Link
          className={classNames({
            'has-text-danger': person.sex === 'f',
          })}
          to={`../${person.slug}`}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {personMother ? (
          <Link
            className={classNames({
              'has-text-danger': personMother.sex === 'f',
            })}
            to={`../${personMother.slug}`}
          >
            {person.motherName || '-'}
          </Link>
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {personFather ? (
          <Link to={`../${personFather.slug}`}>{person.fatherName || '-'}</Link>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
