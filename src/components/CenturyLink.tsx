import cn from 'classnames';
import { FC } from 'react';
import { SearchLink } from './SearchLink';

interface Props {
  century: string
  selectedCenturies: string[]
}

export const CenturyLink: FC<Props> = ({
  century, selectedCenturies,
}) => {
  const isActive = selectedCenturies.includes(century);

  return (
    <SearchLink
      data-cy="century"
      className={cn('button', 'mr-1', { 'is-info': isActive })}
      params={{
        centuries: isActive
          ? selectedCenturies.filter(cen => cen !== century)
          : [...selectedCenturies, century],
      }}
    >
      {century}
    </SearchLink>
  );
};
