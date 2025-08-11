import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { Person } from '../types';
import { useParams } from 'react-router-dom';
import React from 'react';

type Props = {
  person: Person;
  renderPersonLink: (name: string | null) => React.ReactNode;
};

export const PersonComponent = (props: Props) => {
  const { person, renderPersonLink } = props;
  const { slug, sex, born, died, fatherName, motherName } = person;
  const { personID } = useParams();

  return (
    <tr
      data-cy="person"
      key={slug}
      className={classNames({
        'has-background-warning': personID === slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{renderPersonLink(motherName)}</td>
      <td>{renderPersonLink(fatherName)}</td>
    </tr>
  );
};
