import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from '../SearchLink';

export const ResetButton: FC = () => {
  const [searchParams] = useSearchParams();

  return (
    <div className="panel-block">
      <SearchLink
        title="Reset all filters"
        params={{ centuries: null, sex: null, query: null }}
        className={classNames('button is-fullwidth', {
          'is-link': !searchParams.toString(),
          'is-outlined': !searchParams.toString(),
        })}
      />
    </div>
  );
};
