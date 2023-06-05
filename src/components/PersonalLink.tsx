import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { FC } from 'react';
import { Person } from '../types';

interface PropsPersonalLink {
  person: Person;
}

export const PersonalLink: FC<PropsPersonalLink> = ({ person }) => {
  const { selectedSlug } = useParams<{ selectedSlug: string }>();
  const {
    name, sex, born, died, mother, father, slug, motherName, fatherName,
  } = person;

  const isWoman = sex === 'f';
  const isSelected = slug === selectedSlug;

  const motherFragment
    = mother !== undefined
      ? (
        <Link
          to={mother.slug}
          className="has-text-danger"
        >
          {motherName || '-'}
        </Link>
      )
      : (
        <p>
          {' '}
          {motherName || '-'}
        </p>
      );

  const fatherFragment = father !== undefined
    ? (
      <Link
        to={father.slug}
      >
        {fatherName || '-'}
      </Link>
    )
    : (
      <p>
        {' '}
        {fatherName || '-'}
      </p>
    );

  return (
    <tr
      data-cy="person"
      key={slug}
      // eslint-disable-next-line max-len
      className={classNames({ 'has-background-warning': isSelected })}
    >
      <td>
        <Link
          to={slug}
          className={classNames({ 'has-text-danger': isWoman })}
        >
          {name}

        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherFragment}
      </td>
      <td>
        {fatherFragment}
      </td>
    </tr>
  );
};
