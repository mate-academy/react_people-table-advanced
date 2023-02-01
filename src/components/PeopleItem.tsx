import { FC } from 'react';
import cn from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { ParentItem } from './ParentItem';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  person: Person;
};

export const PeopleItem: FC<Props> = ({ person }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}/?${getSearchWith(searchParams, {})}`}
          className={cn({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <ParentItem parent={person.mother} />
      <ParentItem parent={person.father} />
    </tr>
  );
};
