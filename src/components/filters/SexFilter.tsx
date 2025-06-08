import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from '../';

enum Sex {
  All = '',
  Male = 'm',
  Female = 'f',
}

export const SexFilter: FC = () => {
  const [searchParams] = useSearchParams();
  const currentSex = searchParams.get('sex') || '';

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      {Object.entries(Sex).map(([sexKey, sexValue]) => {
        return (
          <SearchLink
            key={sexKey}
            className={cn({ 'is-active': currentSex === sexValue })}
            params={{ sex: sexValue === '' ? null : sexValue }}
          >
            {sexKey}
          </SearchLink>
        );
      })}
    </p>
  );
};
