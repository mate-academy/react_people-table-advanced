import { Link, useLocation, useParams } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

type Props = {
  person: Person;
  people: Person[];
};

const PeopleInfo = ({ person, people }: Props) => {
  const { name, sex, born, died, motherName, fatherName, slug } = person;
  const { search } = useLocation();
  const { slug: identity } = useParams();

  const motherInlist = people.find(el => el.name === person.motherName);
  const fatherInlist = people.find(el => el.name === person.fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': identity === slug,
      })}
    >
      <td>
        <Link
          to={`${slug}` + `${search}`}
          className={person.sex === 'f' ? 'has-text-danger' : ''}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherInlist ? (
          <Link
            className={`${motherInlist.sex === 'f' && 'has-text-danger'}`}
            to={`/people/${motherInlist.slug}`}
          >
            {motherInlist.name}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {fatherInlist ? (
          <Link
            className={`${fatherInlist.sex === 'f' && 'has-text-danger'}`}
            to={`/people/${fatherInlist.slug}`}
          >
            {fatherInlist.name}
          </Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};

export default PeopleInfo;
