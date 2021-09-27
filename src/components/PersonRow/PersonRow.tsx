import React from 'react';
import cn from 'classnames';

import { PersonName } from '../PersonName/PersonName';

import './PersonRow.scss';

interface Props {
  person: PersonWithParents,
  personSlug: string | undefined,
  searchParams: any,
}

export const PersonRow: React.FC<Props> = ({ person, personSlug, searchParams }) => {
  const {
    name,
    sex,
    born,
    died,
    father,
    mother,
    slug,
  } = person;

  return (
    <tr className={cn(
      'Person',
      { activeRow: slug === personSlug },
    )}
    >
      <td className="cell">
        {father || mother ? (
          <PersonName
            name={name}
            slug={slug}
            sex={sex}
            searchParams={searchParams}
          />
        ) : (
          <span className="no-parents">{name}</span>
        )}
      </td>
      <td className="cell center">{sex}</td>
      <td className="cell center">{born}</td>
      <td className="cell center">{died}</td>
      <td className="cell">
        <PersonName
          name={mother?.name}
          slug={mother?.slug}
          sex={mother?.sex}
          searchParams={searchParams}
        />
      </td>
      <td className="cell">
        <PersonName
          name={father?.name}
          slug={father?.slug}
          sex={father?.sex}
          searchParams={searchParams}
        />
      </td>
    </tr>
  );
};
