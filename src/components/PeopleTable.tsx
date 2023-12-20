/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

interface PersonLinkType {
  person: Person;
  people: Person[];
}

export const PersonLink: React.FC<PersonLinkType> = ({ person, people }) => {
  const { slug } = useParams();
  const {
    sex,
    name,
    born,
    died,
    fatherName,
    motherName,
  } = person;

  const selectedFather = people.find(pers => pers.name === person.fatherName);
  const selectedMother = people.find(pers => pers.name === person.motherName);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        {sex === 'm'
          ? (
            <Link to={`/people/${person.slug}`}>
              {name}
            </Link>
          ) : (
            <Link
              className="has-text-danger"
              to={`/people/${person.slug}`}
            >
              {name}
            </Link>
          )}
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {selectedMother
          ? (
            <Link
              className="has-text-danger"
              to={`/people/${selectedMother.slug}`}
            >
              {selectedMother.name}
            </Link>
          ) : motherName || '-'}
      </td>
      <td>
        {selectedFather
          ? (
            <Link
              to={`/people/${selectedFather.slug}`}
            >
              {selectedFather.name}
            </Link>
          ) : fatherName || '-'}
      </td>
    </tr>
  );
};
