import { Link, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../../types';

type Props = {
  person: Person,
  getParentSlug: (parentName: string | null) => string | JSX.Element;
};

export const OnePerson = ({
  person,
  getParentSlug,
}: Props) => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const cleaningHandler = (url: string) => {
    navigate(url, { replace: true });
  };

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <Link
          className={person.sex === 'f' ? 'has-text-danger' : ''}
          to={`/people/${person.slug}`}
          onClick={() => cleaningHandler(`/people/${person.slug}`)}
        >
          {person.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{getParentSlug(person.motherName)}</td>
      <td>{getParentSlug(person.fatherName)}</td>
    </tr>
  );
};
