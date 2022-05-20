import { Link, useParams, useSearchParams } from 'react-router-dom';
import './PersonRow.scss';

type Props = {
  person: Person;
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const classNamePerson = `personSex--${person.sex === 'f' ? 'female' : 'male'}`;
  const highlighted = person.slug === slug;

  return (
    <tr className={highlighted ? 'isActive' : ''}>
      <td>
        <Link to={`${person.slug}?${searchParams}`} className={classNamePerson}>
          {person.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      {person.fatherName ? (
        <td>
          <Link to={`${person.father?.slug}?${searchParams}` || ''} className="personSex--male">
            {person.fatherName}
          </Link>
        </td>
      )
        : <td>No info</td>}
      {person.motherName ? (
        <td>
          <Link to={`${person.mother?.slug}?${searchParams}` || ''} className="personSex--female">
            {person.motherName}
          </Link>
        </td>
      )
        : <td className="noInfo">No info</td>}
    </tr>
  );
};
