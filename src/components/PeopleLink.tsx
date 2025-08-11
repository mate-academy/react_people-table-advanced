import { FC } from 'react';
import { Person } from '../types';
import { Parents, PersonSex } from '../types/Filter';
import classNames from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';

type Props = {
  person: Person;
};

const NO_PARENT = '-';

const PeopleLink: FC<Props> = ({ person }) => {
  const { sex, born, died } = person;
  const [searchParams] = useSearchParams();
  const { slug } = useParams();
  const isActivePerson = slug === person.slug;

  const renderParentLink = (parent: 'mother' | 'father') => {
    if (!person[parent] && !person[`${parent}Name`]) {
      return NO_PARENT;
    }

    return person[parent] ? (
      <Link
        to={{
          pathname: `/people/${person[parent].slug}`,
          search: searchParams.toString(),
        }}
        className={classNames({
          'has-text-danger': parent === 'mother',
        })}
      >
        {person[parent].name}
      </Link>
    ) : (
      person[`${parent}Name`]
    );
  };

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': isActivePerson,
      })}
    >
      <td>
        <Link
          to={{
            pathname: `/people/${person.slug}`,
            search: searchParams.toString(),
          }}
          className={classNames({
            'has-text-danger': person.sex === PersonSex.Female,
          })}
        >
          {person.name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{renderParentLink(Parents.Mother)}</td>
      <td>{renderParentLink(Parents.Father)}</td>
    </tr>
  );
};

export default PeopleLink;
