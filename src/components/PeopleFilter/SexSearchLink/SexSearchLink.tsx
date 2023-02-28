import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Sex } from '../../../types';
import { SearchLink } from '../../SearchLink';

type Props = {
  sex: Sex | null,
  children?: React.ReactNode
};

export const SexSearchLink: React.FC<Props> = ({
  sex,
  children,
}) => {
  const [searchParams] = useSearchParams();
  const selectedSex = searchParams.get('sex');

  return (
    <SearchLink
      className={classNames({
        'is-active': selectedSex === sex,
      })}
      params={{ sex }}
    >
      {children}
    </SearchLink>
  );
};
