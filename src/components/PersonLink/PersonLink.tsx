import { Link, NavLink, useParams, useSearchParams } from 'react-router-dom';

import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();
  const selectedPerson = slug;
  const [searchParams] = useSearchParams();

  const getRelativeLink = (whoseName: 'fatherName' | 'motherName') => {
    const who: 'mother' | 'father' = whoseName.slice(0, -4) as
      | 'mother'
      | 'father';

    if (person[whoseName]) {
      if (person[who]) {
        return (
          <Link
            to={{
              pathname: `/people/${person[who].slug}`,
              search: searchParams.toString(),
            }}
            className={classNames('', {
              'has-text-danger': person[who].sex === 'f',
            })}
          >
            {person[who].name}
          </Link>
        );
      } else {
        return person[whoseName];
      }
    } else {
      return '-';
    }
  };

  return (
    <tr
      data-cy="person"
      className={classNames('', {
        'has-background-warning': selectedPerson === person.slug,
      })}
    >
      <td>
        <NavLink
          to={`/people/${person.slug}`}
          className={classNames('', {
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </NavLink>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{getRelativeLink('motherName')}</td>

      <td>{getRelativeLink('fatherName')}</td>
    </tr>
  );
};
