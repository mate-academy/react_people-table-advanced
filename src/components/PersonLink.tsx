import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  selectedPerson: string;
};

export const PersonLink: FC<Props> = ({
  person, selectedPerson,
}) => {
  const {
    name, sex, born, died, fatherName, motherName, slug, mother, father,
  } = person;

  const isSelected = (value: string) => value === selectedPerson;

  const checkParent = (
    parentName: string | null,
    parent?: Person,
  ) => {
    return (
      parent ? (
        <Link to={`../${parent.slug}` || ''} className={classNames({ 'has-text-danger': parent.sex === 'f' })}>
          {parent.name}
        </Link>
      ) : (
        <>
          {parentName || '-'}
        </>
      )
    );
  };

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': isSelected(slug) })}
    >
      <td>
        <Link
          to={`../${slug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {checkParent(motherName, mother)}
      </td>
      <td>
        {checkParent(fatherName, father)}
      </td>
    </tr>
  );
};
