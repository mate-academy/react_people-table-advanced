import { FC } from 'react';
import classNames from 'classnames';
import {Person} from "../types";
import {PersonLink} from "./PersonLink";
import {ParentLink} from "./ParentLink";

interface Props {
  person: Person,
  // people: Person[],
  selectedPersonSlug: string,
}

export const PersonInfo: FC<Props> = ({
  person, selectedPersonSlug,
}) => {
  const {
    sex,
    born,
    died,
    slug,
    fatherName,
    motherName,
    father,
    mother,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': selectedPersonSlug === slug,
      })}
    >
      <td>
        <PersonLink
          person={person}
        />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        <ParentLink
          parentName={motherName}
          parent={mother}
        />
      </td>
      <td>
        <ParentLink
          parentName={fatherName}
          parent={father}
        />
      </td>
    </tr>
  );
};
