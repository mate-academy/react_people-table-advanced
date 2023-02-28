import cn from 'classnames';
import React from 'react';
import { SearchLink } from '../SearchLink';

type Props = {
  sex: string | null,
  text: string,
  currentSex: string | null,
};

export const SexSearchLink: React.FC<Props> = React.memo(({
  sex,
  text,
  currentSex,
}) => (
  <SearchLink
    params={{ sex }}
    className={cn({ 'is-active': currentSex === sex })}
  >
    {text}
  </SearchLink>
));
