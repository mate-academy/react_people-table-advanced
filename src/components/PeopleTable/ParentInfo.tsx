import { FC } from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { SearchLink } from '../SearchLink';

type Props = {
  parent: Person | null | undefined;
  name: string | null;
};

export const ParentInfo: FC<Props> = ({ parent, name }) => {
  const isMale = parent?.sex === 'm';
  const isFemale = parent?.sex === 'f';

  const parentInfoClassNames = classNames('', {
    'has-text-info': isMale,
    'has-text-danger': isFemale,
  });

  return (
    <>
      {parent ? (
        <SearchLink
          params={{ personSlug: parent.slug }}
          className={parentInfoClassNames}
          title={parent.name || '-'}
        />

      ) : (
        <p>{name || '-'}</p>
      )}
    </>
  );
};
