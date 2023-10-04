import {
  Link, useNavigate, useParams, useSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';
import { usePerson } from './usePerson';
import { Person } from '../../../../types';
import { usePeoplePageContext } from '../../../../context/PeoplePageContext';

type Props = {
  person: Person,
};

export const OnePerson = ({
  person,
}: Props) => {
  const { people } = usePeoplePageContext();
  const { getParentSlug } = usePerson();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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
          to={`/people/${person.slug}?${searchParams.toString()}`}
          onClick={() => cleaningHandler(`/people/${person.slug}?${searchParams.toString()}`)}
        >
          {person.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{getParentSlug(people, person.motherName)}</td>
      <td>{getParentSlug(people, person.fatherName)}</td>
    </tr>
  );
};
