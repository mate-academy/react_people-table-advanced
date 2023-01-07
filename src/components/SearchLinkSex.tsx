import classNames from 'classnames';
import React from 'react';
import { SexType } from '../types/Sex';
import { SearchLink } from './SearchLink';

type Props = {
  sexType: SexType;
  sex: string;
  title: string;
};

export const SearchLinkSex: React.FC<Props> = React.memo(
  ({
    sexType,
    sex,
    title,
  }) => (
    <SearchLink
      params={{ sex: sexType }}
      className={classNames({ 'is-active': sex === sexType })}
    >
      {title}
    </SearchLink>
  ),
);
