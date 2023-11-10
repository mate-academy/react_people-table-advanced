import classNames from 'classnames';
import { useParams, Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person,
  people: Person[]
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { slugId } = useParams();
  const findMother = people.find(
    mother => person.motherName === mother.name,
  );

  const findFather = people.find(
    father => person.fatherName === father.name,
  );

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === slugId,
      })}
    >
      <td>
        <Link
          className={classNames(({ 'has-text-danger': person.sex === 'f' }))}
          to={`/people/${person.slug}`}
        >
          {person.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {findMother
          ? (
            <Link
              to={`/people/${findMother.slug}`}
              className="has-text-danger"
            >
              {person.motherName}
            </Link>
          ) : (
            person.motherName || '-'
          )}
      </td>
      <td>
        {findFather
          ? (
            <Link
              to={`/people/${findFather.slug}`}
            >
              {person.fatherName}
            </Link>
          ) : (
            person.fatherName || '-'
          )}
      </td>
    </tr>
  );
};
