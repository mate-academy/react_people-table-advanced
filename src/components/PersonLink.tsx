import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import cn from 'classnames';
import { Person } from '../types';
import { PeopleContex } from '../store/PeopleContex';

interface Prop {
  person: Person;
}
export const PersonLink: React.FC<Prop> = ({ person }) => {
  const { slug } = useParams();
  const selectedPerson = slug;
  const [searchParams] = useSearchParams();

  const { people } = useContext(PeopleContex);

  const women = person.sex === 'f';
  const mother = person.motherName || '-';
  const father = person.fatherName || '-';
  const samePersonMother = people?.find(el => el.name === person.motherName);

  const samePersonFather = people?.find(el => el.name === person.fatherName);

  return (
    <tr
      data-cy="person"
      className={cn('', {
        'has-background-warning': selectedPerson === person.slug,
      })}
    >
      <td>
        <Link
          to={{
            pathname: `/people/${person.slug}`,
            search: searchParams.toString(),
          }}
          className={cn('', { 'has-text-danger': women })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {samePersonMother ? (
          <Link
            to={`/people/${samePersonMother.slug}`}
            className="has-text-danger"
          >
            {mother}
          </Link>
        ) : (
          mother
        )}
      </td>
      <td>
        {samePersonFather ? (
          <Link to={`/people/${samePersonFather.slug}`}>{father}</Link>
        ) : (
          father
        )}
      </td>
    </tr>
  );
};
