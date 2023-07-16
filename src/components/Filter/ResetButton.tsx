import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from '../SearchLink';

export const ResetButton: FC = () => {
  const [searchParams] = useSearchParams();

  const resetButtonClassNames = classNames('button is-fullwidth', {
    'is-link': searchParams.toString(),
    'is-outlined': searchParams.toString(),
  });

  return (
    <div className="panel-block">
      <SearchLink
        title="Reset all filters"
        params={{ centuries: null, sex: null, query: null }}
        className={resetButtonClassNames}
      />
    </div>
  );
};
