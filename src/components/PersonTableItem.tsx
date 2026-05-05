import React, { useMemo } from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';

import Person from '../types/Person';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
};

const PersonTableItemBase: React.FC<Props> = ({ person }) => {
  const { sex, born, died, motherName, fatherName, slug, mother, father } =
    person;
  const { slug: paramSlug } = useParams();

  const motherInfoTd = useMemo(() => {
    if (!motherName && !mother) {
      return <>-</>;
    }

    if (!!motherName && !!mother) {
      return <PersonLink person={mother} />;
    }

    if (!!motherName) {
      return <>{motherName}</>;
    }

    return <>-</>;
  }, [motherName, mother]);

  const fatherInfoTd = useMemo(() => {
    if (!fatherName && !father) {
      return <>-</>;
    }

    if (!!fatherName && !!father) {
      return <PersonLink person={father} />;
    }

    if (!!fatherName) {
      return <>{fatherName}</>;
    }

    return <>-</>;
  }, [fatherName, father]);

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': paramSlug === slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{motherInfoTd}</td>
      <td>{fatherInfoTd}</td>
    </tr>
  );
};

export const PersonTableItem = React.memo(PersonTableItemBase);
