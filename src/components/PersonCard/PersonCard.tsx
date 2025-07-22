import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

type Props = {
  person: Person;
  currentSlug: string | undefined;
};

function findParent(parentName: string | null, persons: Person[] | null) {
  return !parentName || !persons
    ? null
    : [...persons].filter(person => person.name === parentName)[0];
}

export const PersonCard: React.FC<Props> = ({ person, currentSlug }) => {
  const { people } = useContext(AppContext);
  const { name, sex, born, died, motherName, fatherName, slug } = person;
  const { search } = useLocation();
  const mommy = findParent(motherName, people);
  const daddy = findParent(fatherName, people);

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': currentSlug === slug })}
    >
      <td>
        <Link
          className={classNames({ 'has-text-danger': sex === 'f' })}
          to={`/people/${slug}${search}`}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {!mommy ? (
          motherName ? (
            motherName
          ) : (
            '-'
          )
        ) : (
          <Link
            className={'has-text-danger'}
            to={`/people/${mommy.slug}${search}`}
          >
            {mommy.name}
          </Link>
        )}
      </td>
      <td>
        {!daddy ? (
          fatherName ? (
            fatherName
          ) : (
            '-'
          )
        ) : (
          <Link to={`/people/${daddy.slug}${search}`}>{daddy.name}</Link>
        )}
      </td>
    </tr>
  );
};
