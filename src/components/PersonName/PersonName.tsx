import React from 'react';
import classNames from 'classnames';

import './PersonName.scss';
import { useSearchParams } from 'react-router-dom';

type Props = {
  name: string,
  slug: string,
  sex: string,
};

export const PersonName: React.FC<Props> = ({ name, slug, sex }) => {
  const [searchParams] = useSearchParams();

  return (
    <a
      href={`#/people/${slug}?${searchParams}`}
      className={classNames(
        'PersonName',
        { PersonName__male: sex === 'm' },
        { PersonName__female: sex === 'f' },
      )}
    >
      {name}
    </a>
  );
};
